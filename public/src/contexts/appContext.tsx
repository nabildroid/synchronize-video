import React, { createContext, useContext, useEffect, useReducer } from "react"
import AppAction from "../actions/appAction"
import useLocalStorage from "../hooks/useLocalStorage"
import { AppStateInit, IAppProvider } from "../models/app_model"
import { AuthKey } from "../types/server_API"
import { ServerContext } from "./serverContext"



export const AppContext = createContext<IAppProvider>(null)


const AppProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(AppAction, AppStateInit);
    const { server } = useContext(ServerContext)
    const [auth, setAuth] = useLocalStorage<AuthKey>("auth");


    useEffect(() => {
        if (auth) {
            dispatch({ type: "loading_on" })
            server.signMeIn(auth).then(response => {
                response && login(response);
            });
        }
    }, [])

    const login: IAppProvider["login"] = (user) => {
        setAuth(server.auth);
        dispatch({ type: "login", payload: user })
    }

    const values = {
        ...state,
        login
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider