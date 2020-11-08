import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom"
import JoinRoomAction from "../actions/joinRoomAction"
import { IJoinRoomProvider, JoinRoomStateInit } from "../models/join_room_model"
import { IRoomInfo } from "../models/room_model"
import { Guest } from "../types/user_type"
import { AppContext } from "./appContext"
import { ServerContext } from "./serverContext"



export const JoinContext = createContext<IJoinRoomProvider>(null)

const JoinProvider: React.FC = ({ children }) => {
    const { login, user } = useContext(AppContext)
    const [state, dispatch] = useReducer(JoinRoomAction, JoinRoomStateInit)

    const { server } = useContext(ServerContext)
    const { id } = useParams<{ id: string }>();
    const { push, replace } = useHistory();
    const { state: roomInfoFromRoomPage } = useLocation<IRoomInfo | null>();


    useEffect(() => {
        loadRoom();
    }, [])

    const loadRoom = async () => {
        dispatch({ type: "loading_on" })
        const response = roomInfoFromRoomPage || await server.loadRoomInfo(id);
        console.log(response);
        if (response) {
            if (checkIfCurrentUserIsAlreadyAWatcher(response.watchers)) {
                push(`/room/${id}`, response);
            }
            else dispatch({ type: "load_room_info", payload: response })

        } else return push(`/`);
    }

    function checkIfCurrentUserIsAlreadyAWatcher(watchers: Guest[]) {
        return user && watchers.some(w => w.id == user.id);
    }

    async function submitName(name: string) {
        dispatch({ type: "loading_submit_on" });
        const response = await server.join(name);

        if (response) {
            dispatch({ type: "loading_submit_off" })
            login(response)

            const currentRoomInfo: IRoomInfo = {
                background: state.background,
                title: state.title,
                watchers: state.watchers
            }

            setTimeout(() => push(`/room/${id}`, currentRoomInfo), 350)
        } else dispatch({ type: "login_error", payload: "check your name" })
    }


    const values = {
        ...state,
        submitName
    }

    return (
        <JoinContext.Provider value={values}>
            {children}
        </JoinContext.Provider>
    )
}

export default JoinProvider
