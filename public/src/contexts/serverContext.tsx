import React, { createContext, useRef } from "react";

import Server from "../connections/server";
import { IPAdressType } from "../types/P2P_node_API";


interface IProviderValues {
    join: (name: string, dispatch: any) => Promise<void>
    boardcastMyIp: (ip: IPAdressType, dispatch: any) => Promise<void>
}
export const ServerContext = createContext<IProviderValues>(null);

const ServerProvider: React.FC = ({ children }) => {
    const server = useRef(new Server());

    const join: IProviderValues["join"] = async (name, dispatch) => {
        dispatch({ type: "loading", payload: true });
        const response = await server.current.join(name);
        dispatch({ type: "loading", payload: false })
        if (!response)
            dispatch({ type: "login_error" })
        else
            dispatch({ type: "login_success", payload: response })
    }

    const boardcastMyIp: IProviderValues["boardcastMyIp"] = async (ip, dispatch) => {
        dispatch({ type: "broadcasting", payload: true })
        const response = await server.current.boardcastIp(ip);
        dispatch({ type: "broadcasting", payload: false })
        if (!response)
            dispatch({ type: "error" })
        else dispatch({ type: "add", payload: response })
    }

    return (
        <ServerContext.Provider value={{ join, boardcastMyIp }}>
            {children}
        </ServerContext.Provider>
    )
}


export default ServerProvider;