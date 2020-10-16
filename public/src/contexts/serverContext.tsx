import React, { createContext, useRef } from "react";

import Server from "../connections/server";
import { JoinRoomActions } from "../models/join_room_model";
import { IPAdressType } from "../types/P2P_node_API";
import { IServerAPI } from "../types/server_API";


interface IProviderValues {
    server: IServerAPI
}
export const ServerContext = createContext<IProviderValues>(null);

const ServerProvider: React.FC = ({ children }) => {
    const server = useRef(new Server());



    return (
        <ServerContext.Provider value={{ server: server.current }}>
            {children}
        </ServerContext.Provider>
    )
}


export default ServerProvider;