import React, { createContext, useRef } from "react";

import Server from "../connections/server";
import { JoinRoomActions } from "../models/join_room_model";
import { IPAdressType } from "../types/P2P_node_API";
import { IServerAPI } from "../types/server_API";


interface IProviderValues {
    boardcastMyIp(ip: IPAdressType, dispatch: any): Promise<void>
    server: IServerAPI
}
export const ServerContext = createContext<IProviderValues>(null);

const ServerProvider: React.FC = ({ children }) => {
    const server = useRef(new Server());
    const boardcastMyIp: IProviderValues["boardcastMyIp"] = async (ip, dispatch) => {
        dispatch({ type: "broadcasting", payload: true })
        const response = await server.current.boardcastIp(ip);
        dispatch({ type: "broadcasting", payload: false })
        if (!response)
            dispatch({ type: "error" })
        else dispatch({ type: "add", payload: response })
    }

  

    return (
        <ServerContext.Provider value={{ boardcastMyIp, server: server.current }}>
            {children}
        </ServerContext.Provider>
    )
}


export default ServerProvider;