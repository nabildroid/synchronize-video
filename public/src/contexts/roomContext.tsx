import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom";
import RoomAction from "../actions/roomAction";
import { IRoomInfo, RoomStateInit } from "../models/room_model";
import { IRoomProvider } from "../models/room_model"
import { DataFlowTypes } from "../types/P2P_node_API";
import { Guest } from "../types/user_type";
import firstResolvedPromise from "../utils/firstResolvedPromise";
import { AppContext } from "./appContext";
import { P2PContext } from "./p2pContext";
import { ServerContext } from "./serverContext";



export const RoomContext = createContext<IRoomProvider>(null)


const RoomProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(RoomAction, RoomStateInit)
    const { server } = useContext(ServerContext);
    const { p2p } = useContext(P2PContext);
    const { user, newRoom, login } = useContext(AppContext);
    const { replace, push } = useHistory();
    const { id } = useParams<{ id: string }>();
    const { state: roomInfoFromJoinPage } = useLocation<IRoomInfo | null>();



    if (!user)
        replace(`/join/${id}`);

    useEffect(() => {
        console.log("prev room", newRoom);

        user && p2p.init(user)
        loadRoom();
        const unsubscribe = initListeners();
        return unsubscribe;
    }, [])

    // selecting the auhtor must be a event driven because, later we might implement a multi author, which means each time the watchers changes we have to select the authors all again
    useEffect(selectAuthorGuestFromWatchers, [state.watchers])


    async function loadRoom() {
        dispatch({ type: "loading_on" })
        const response = roomInfoFromJoinPage || await firstResolvedPromise<false | IRoomInfo>([
            LoadRoomFromApp(),
            LoadRoomFromServer()
        ]);

        if (response) {
            console.log("room has been loaded",response);
            if (checkIfCurrentUserIsAlreadyAWatcher(response.watchers)) {
                login({ ...response.watchers.find(w => w.id == user.id) });
                dispatch({ type: "load_room", payload: response })

                broadcastMyIp()
            } else replace(`/join/${id}`, response);
        }
        else return push(`/`);
    }

    function checkIfCurrentUserIsAlreadyAWatcher(watchers: Guest[]) {
        return user && watchers.some(w => w.id == user.id);
    }

    const LoadRoomFromServer = () => server.loadRoomInfo(id, true);
    const LoadRoomFromApp = (): Promise<IRoomInfo> => {
        if (newRoom && newRoom.id == id)
            return Promise.resolve({
                ...newRoom,
                watchers: [{ ...user, isAuthor: true }]
            })
        else return Promise.reject();
    }

    const broadcastMyIp = async () => {
        dispatch({ type: "loading_on" })
        const myIp = await p2p.getMyIp();
        // myIp is not included in ips
        // TODO the server only determine whose author
        const ips = await server.boardcastIp(id, myIp)
        if (ips) {
            const watchers = await p2p.join(ips, id == "11")
            dispatch({ type: "add_watchers", payload: watchers });
        } else {
            // TODO write better error message
            dispatch({ type: "error", payload: "error" })
        }
    }

    function initListeners() {
        const unsubscribe = [
            p2p.listenTo(DataFlowTypes.NEW_WATCHERS, ({ sender, payload }) => {
                dispatch({ type: "add_watchers", payload: payload as Guest[] })
            })
        ];

        return () => unsubscribe.forEach(f => f());
    }

    function selectAuthorGuestFromWatchers() {
        if (state.watchers.length) {
            dispatch({ type: "loading_on" })
            let guestAuthor = null;

            if (user && user.isAuthor)
                guestAuthor = "currentUser"
            else {
                // TODO is not secure to select authors when the new guests cames from P2P not from the server
                const guestAuthors = state.watchers.filter(
                    user => user.isAuthor
                );
                // TODO allow multi authors
                guestAuthor = guestAuthors.length ? guestAuthors[0] : null;
            }
            console.log("selelcting the author", guestAuthor);
            if (guestAuthor) {
                console.log("the room's author", guestAuthor);
                dispatch({ type: "guest_to_author", payload: guestAuthor });
            } else dispatch({ type: "error", payload: "error" });
        }
    }




    const values = {
        ...state,
        link: window.location.origin + "/join/" + id
    }

    return (
        <RoomContext.Provider value={values}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomProvider