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
    const { push } = useHistory();

    if (user)
        push(`/room/${id}`);

    useEffect(() => {
        loadRoom();
        console.log("rendering JoinContext");
        return () => console.log("disposing JoinContext");
    }, [])

    const submitName = useCallback(async (name: string) => {
        dispatch({ type: "loading_on" });
        const response = await server.join(name);
        dispatch({ type: "loading_off" })
        if (!response)
            dispatch({ type: "login_error", payload: "check your name" })
        else {
            login(response)
            push(`/room/${id}`)
        }
    }, [server, dispatch]);

    const loadRoom = async () => {
        dispatch({ type: "loading_on" })
        const response = await server.loadRoomInfo(id);

        if (response)
            dispatch({ type: "load_room", payload: response })
        else
            return push(`/`);


    }

    useEffect(() => {
        if (!state.loading && !state.title)
            push("/");
    }, [state.loading, state.title])

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
