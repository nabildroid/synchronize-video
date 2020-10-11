import React, { createContext, useRef } from "react";

import Server from "../connections/server";


interface IProviderValues  {

}
export const ServerContext = createContext<IProviderValues>({});

const ServerProvider: React.FC = ({ children }) => {
    const server = useRef(new Server());

    return (
        <ServerContext.Provider value={{}}>
            {children}
        </ServerContext.Provider>
    )
}


export default ServerProvider;