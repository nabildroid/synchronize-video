import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useHistory, useParams } from "react-router-dom";
import RoomAction from "../actions/roomAction";
import { RoomStateInit } from "../models/room_model";
import { IRoomProvider } from "../models/room_model"
import { AppContext } from "./appContext";
import { P2PContext } from "./p2pContext";
import { ServerContext } from "./serverContext";



export const RoomContext = createContext<IRoomProvider>(null)


const RoomProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(RoomAction, RoomStateInit)
    const { server } = useContext(ServerContext);
    const { p2p } = useContext(P2PContext);
    const { user } = useContext(AppContext);
    const { push } = useHistory();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!user)
            return push(`/join/${id}`);
        loadRoom();
    }, [])

    useEffect(() => {
        if (!!state.title) {
            broadcastMyIp()
        }
    }, [state.title])

    useEffect(()=>{
        if(!!state.watchersUsers.length){
            selectAuthorUser();
        }
    },[state.watchersUsers])

    const broadcastMyIp = async () => {
        dispatch({ type: "loading_on" })
        const myIp = await p2p.getMyIp();
        const ips = await server.boardcastIp(id, myIp)
        if (ips) {
            const users = await p2p.join(ips)
            dispatch({ type: "guests_to_Users", payload: users });
        }else {
            // TODO write better error message
            dispatch({type:"error",payload:"error"})
        }
    }


    const loadRoom = async () => {
        dispatch({ type: "loading_on" })
        const response = await server.loadRoomInfo(id);

        if (response)
            dispatch({ type: "load_room", payload: response })
        else
            return push(`/`);
    }

    const selectAuthorUser = () => {
        dispatch({ type: "loading_on" })
        const userAuthor = state.watchersUsers.filter(
            user => user.isAuthor(state.author)
        );
        dispatch({ type: "guest_author_to_user", payload: userAuthor[0] });
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