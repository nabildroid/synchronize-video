import React, { createContext, useContext, useEffect, useReducer } from "react"
import AppAction from "../actions/appAction"
import useLocalStorage from "../hooks/useLocalStorage"
import { AppStateInit, IAppProvider } from "../models/app_model"
import { NewRoomData } from "../types/room_type"
import { AuthKey } from "../types/server_API"
import { Guest } from "../types/user_type"
import { ServerContext } from "./serverContext"



export const AppContext = createContext<IAppProvider>(null)


const AppProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(AppAction, AppStateInit);
    const { server } = useContext(ServerContext)
    const [auth, setAuth] = useLocalStorage<AuthKey>("auth");

    useEffect(ValidateCurrentAuthIfItExists, []);

    function ValidateCurrentAuthIfItExists() {
        if (auth) {
            server.signMeIn(auth).then(response => {
                response && login(response);
            }).finally(() =>
                dispatch({ type: "loading_off" })
            )
        } else {
            setAuth(null);
            dispatch({ type: "loading_off" });
        }
    }

    function login(user: Guest) {
        setAuth(server.auth);
        dispatch({ type: "login", payload: user })
    }

    function addNewRoom(roomData: NewRoomData, user: Guest) {
        if (user) login(user);
        dispatch({ type: "load_new_room", payload: roomData });
    }

    const values = {
        ...state,
        login,
        addNewRoom
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider