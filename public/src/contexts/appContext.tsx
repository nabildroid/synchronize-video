import React, { createContext, useReducer } from "react"
import AppAction from "../actions/appAction"
import { AppStateInit, IAppProvider } from "../models/app_model"



export const AppContext = createContext<IAppProvider>(null)


const AppProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(AppAction, AppStateInit);

    const values = {
        ...state
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider