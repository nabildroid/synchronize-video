import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import JoinRoomAction from "../actions/joinRoomAction"
import { IJoinRoomProvider, JoinRoomStateInit } from "../models/join_room_model"
import { AppContext } from "./appContext"
import { ServerContext } from "./serverContext"



export const JoinContext = createContext<IJoinRoomProvider>(null)

const JoinProvider: React.FC = ({ children }) => {
    const { login } = useContext(AppContext)
    const [state, dispatch] = useReducer(JoinRoomAction, JoinRoomStateInit)

    const { loadRoom } = useContext(ServerContext)

    useEffect(() => {
        loadRoom("10", dispatch)
    }, [])

    const submitName = useCallback(async (name: string) => {
        dispatch({ type: "loading_on" });
        const response = await server.join(name);
        dispatch({ type: "loading_off" })
        if (!response)
            dispatch({ type: "login_error", payload: "check your name" })
        else return login(response)
    }, [server, dispatch]);


    const values = useMemo(() => ({
        ...state,
        submitName
    }), [state]);

    return (
        <JoinContext.Provider value={values}>
            {children}
        </JoinContext.Provider>
    )
}

export default JoinProvider