import React, { createContext, useRef } from "react";

import P2P from "../connections/p2p";
import P2P_Node_API from "../types/P2P_node_API";


interface IProviderValues {
    p2p: P2P_Node_API
}
export const P2PContext = createContext<IProviderValues>(null);

const P2PProvider: React.FC = ({ children }) => {
    const p2p = useRef(new P2P());

    return (
        <P2PContext.Provider value={{ p2p: p2p.current }}>
            {children}
        </P2PContext.Provider>
    )
}



export default P2PProvider;