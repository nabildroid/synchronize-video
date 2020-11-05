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
        console.log("rendering JoinContext");
        return () => console.log("disposing JoinContext");
    }, [])

    const loadRoom = async () => {
        dispatch({ type: "loading_on" })
        const response = await server.loadRoomInfo(id);

        if (response) {
            if (user && response.watchers.some(w => w.id == user.id)) {
                replace(`/room/${id}`);
            } else
            dispatch({ type: "load_room", payload: response })

        } else
            return push(`/`);
    }

    const submitName = useCallback(async (name: string) => {
        dispatch({ type: "loading_submit_on" });
        const response = await server.join(name);

        dispatch({ type: "loading_submit_off" })
        if (!response)
            dispatch({ type: "login_error", payload: "check your name" })
        else {
            // login(response)
            setTimeout(() => push(`/room/${id}`), 350)
    }
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
