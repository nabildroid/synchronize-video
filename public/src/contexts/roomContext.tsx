import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useHistory, useParams } from "react-router-dom";
import RoomAction from "../actions/roomAction";
import { IRoomInfo, RoomStateInit } from "../models/room_model";
import { IRoomProvider } from "../models/room_model"
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
    const { push } = useHistory();
    const { id } = useParams<{ id: string }>();
    console.log(newRoom);

    if (!user)
        push(`/join/${id}`);

    useEffect(() => {
        loadRoom();
    }, [])

    useEffect(() => {
        if (!!state.title) {
            broadcastMyIp()
        }
    }, [state.title])

    useEffect(() => {
        if (!!state.watchersUsers.length) {
            selectAuthorUser();
        }
    }, [state.watchersUsers])

    const broadcastMyIp = async () => {
        dispatch({ type: "loading_on" })
        const myIp = await p2p.getMyIp();
        // myIp is not included in ips
        const ips = await server.boardcastIp(id, myIp)
        if (ips) {
            const users = await p2p.join(ips)
            dispatch({ type: "guests_to_Users", payload: users });
        } else {
            // TODO write better error message
            dispatch({ type: "error", payload: "error" })
        }
    }


    const loadRoom = async () => {
        dispatch({ type: "loading_on" })
        const response = await firstResolvedPromise<false | IRoomInfo>([
            LoadRoomFromApp(),
            LoadRoomFromServer()
        ]);

        if (response)
            dispatch({ type: "load_room", payload: response })
        else
            return push(`/`);
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
    

    const selectAuthorUser = () => {
        dispatch({ type: "loading_on" })
        const userAuthors = state.watchersUsers.filter(
            user => user.isAuthor
        );
        console.log(userAuthors);
        // TODO allow multi authors
        const userAuthor = userAuthors.length ? userAuthors[0] : "currentUser";
        dispatch({ type: "guest_author_to_user", payload: userAuthor });
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