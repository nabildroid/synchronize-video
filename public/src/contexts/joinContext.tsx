import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import { Redirect, useHistory, useParams } from "react-router-dom"
import JoinRoomAction from "../actions/joinRoomAction"
import { IJoinRoomProvider, JoinRoomStateInit } from "../models/join_room_model"
import { AppContext } from "./appContext"
import { ServerContext } from "./serverContext"



export const JoinContext = createContext<IJoinRoomProvider>(null)

const JoinProvider: React.FC = ({ children }) => {
    const { login, user } = useContext(AppContext)
    const [state, dispatch] = useReducer(JoinRoomAction, JoinRoomStateInit)

    const { server } = useContext(ServerContext)
    const { id } = useParams<{ id: string }>();
    const { push, replace } = useHistory();


    useEffect(() => {
        loadRoom();
    }, [])

    const loadRoom = async () => {
        dispatch({ type: "loading_on" })
        const response = await server.loadRoomInfo(id);

        if (response) {
            const currentUserIsAlreadyAWatcher = user && response.watchers.some(w => w.id == user.id);
            if (currentUserIsAlreadyAWatcher) {
                replace(`/room/${id}`);
            }
            else dispatch({ type: "load_room_info", payload: response })

        } else return push(`/`);
    }

    async function submitName(name: string) {
        dispatch({ type: "loading_submit_on" });
        const response = await server.join(name);

        if (response) {
            dispatch({ type: "loading_submit_off" })
            login(response)
            setTimeout(() => push(`/room/${id}`), 350)
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
