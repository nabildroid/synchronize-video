import React, { createContext } from "react"
import { IAppProvider } from "../models/app_model"



export const AppContext = createContext<IAppProvider>({})

const AppProvider: React.FC = ({ children }) => {

    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider