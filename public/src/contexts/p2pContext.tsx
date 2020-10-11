import React, { createContext, useRef } from "react";

import P2P from "../connections/p2p";


interface IProviderValues  {

}
export const P2PContext = createContext<IProviderValues>({});

const P2PProvider: React.FC = ({ children }) => {
    const p2p = useRef(new P2P());

    return (
        <P2PContext.Provider value={{}}>
            {children}
        </P2PContext.Provider>
    )
}



export default P2PProvider;