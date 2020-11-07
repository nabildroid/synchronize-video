import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useHistory, useParams } from "react-router-dom";
import RoomAction from "../actions/roomAction";
import { IRoomInfo, RoomStateInit } from "../models/room_model";
import { IRoomProvider } from "../models/room_model"
import { DataFlowTypes } from "../types/P2P_node_API";
import { IUser } from "../types/user_type";
import firstResolvedPromise from "../utils/firstResolvedPromise";
import { AppContext } from "./appContext";
import { P2PContext } from "./p2pContext";
import { ServerContext } from "./serverContext";



export const RoomContext = createContext<IRoomProvider>(null)


const RoomProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(RoomAction, RoomStateInit)
    const { server } = useContext(ServerContext);
    const { p2p } = useContext(P2PContext);
    const { user, newRoom } = useContext(AppContext);
    const { replace, push } = useHistory();
    const { id } = useParams<{ id: string }>();

    if (!user)
        replace(`/join/${id}`);

    useEffect(() => {
        console.log("prev room", newRoom);

        loadRoom();
        initListeners();
    }, [])

    // selecting the auhtor must be a event driven because, later we might implement a multi author, which means each time the watchers changes we have to select the authors all again
    useEffect(selectAuthorUserFromWatchersUsers, [state.watchersUsers])


    async function loadRoom() {
        dispatch({ type: "loading_on" })
        const response = await firstResolvedPromise<false | IRoomInfo>([
            LoadRoomFromApp(),
            LoadRoomFromServer()
        ]);

        if (response) {
            dispatch({ type: "load_room", payload: response })
            // broadcast the current userIp happen only one time
            broadcastMyIp()
        }
        else return push(`/`);
    }

    const LoadRoomFromServer = () => server.loadRoomInfo(id);
    const LoadRoomFromApp = (): Promise<IRoomInfo> => {
        if (newRoom && newRoom.id == id)
            return Promise.resolve({
                ...newRoom,
                watchers: []
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
            const users = await p2p.join(ips, id == "11")
            dispatch({ type: "guests_to_Users", payload: users });
        } else {
            // TODO write better error message
            dispatch({ type: "error", payload: "error" })
        }
    }

    function initListeners() {
        p2p.listenTo(DataFlowTypes.NEW_USER, ({ sender, payload }) => {
            dispatch({ type: "guests_to_Users", payload: payload as IUser[] })
        });
    }

    function selectAuthorUserFromWatchersUsers() {
        if (state.watchersUsers.length) {
            dispatch({ type: "loading_on" })
            const userAuthors = state.watchersUsers.filter(
                user => user.isAuthor
            );
            // TODO allow multi authors
            const userAuthor = userAuthors.length ? userAuthors[0] : "currentUser";
            console.log("the room's author", userAuthor);
            dispatch({ type: "guest_author_to_user", payload: userAuthor });
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