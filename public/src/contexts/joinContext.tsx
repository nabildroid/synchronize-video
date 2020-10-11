import React, { createContext } from "react"
import { IJoinRoomProvider } from "../models/join_room_model"



const JoinContext = createContext<IJoinRoomProvider>(null)

const JoinProvider: React.FC = ({ children }) => {

    return (
        <JoinContext.Provider value={null}>
            {children}
        </JoinContext.Provider>
    )
}

export default JoinProvider