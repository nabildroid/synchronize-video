import React, { createContext } from "react"
import { IMessagesProvider } from "../models/message_model"



const MessagesContext = createContext<IMessagesProvider>(null)

const MessagesProvider: React.FC = ({ children }) => {

    return (
        <MessagesContext.Provider value={null}>
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesProvider