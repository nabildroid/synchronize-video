import React, { createContext } from "react"
import { IRoomProvider } from "../models/room_model"



const RoomContext = createContext<IRoomProvider>(null)

const RoomProvider: React.FC = ({ children }) => {

    return (
        <RoomContext.Provider value={null}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomProvider