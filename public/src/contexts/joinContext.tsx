import React, { createContext, useContext, useEffect, useReducer } from "react"
import JoinRoomAction from "../actions/joinRoomAction"
import { IJoinRoomProvider, JoinRoomStateInit } from "../models/join_room_model"



export const JoinContext = createContext<IJoinRoomProvider>(null)

const JoinProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(JoinRoomAction, JoinRoomStateInit)

    const values = {
        ...state
    }

    return (
        <JoinContext.Provider value={values}>
            {children}
        </JoinContext.Provider>
    )
}

export default JoinProvider