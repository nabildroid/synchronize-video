import React, { createContext, useContext, useEffect, useRef } from "react";

import P2P from "../connections/p2p";
import P2P_Node_API, { DataFlowTypes } from "../types/P2P_node_API";
import { VideoState } from "../types/video_type";
import { AppContext } from "./appContext";


interface IProviderValues {
    p2p: P2P_Node_API
}
export const P2PContext = createContext<IProviderValues>(null);

const P2PProvider: React.FC = ({ children }) => {
    const p2p = useRef(new P2P());

    useEffect(() => {
        setTimeout(() => {
            p2p.current.listen(
                {
                    type: DataFlowTypes.VIDEO_STATE,
                    payload: VideoState.PLAYIED,
                    sender: {
                        id: 8577,
                        isAuthor: true,
                        name: "eizeffe"
                    }
                }
            );
        }, 10000);

        setTimeout(() => {
            p2p.current.listen(
                {
                    type: DataFlowTypes.NEW_WATCHERS,
                    payload: [
                        {
                            id: 58787,
                            name: "new user from P2P",
                            isAuthor: false
                        }
                    ],
                    sender: {
                        id: 8577,
                        isAuthor: true,
                        name: "eizeffe"
                    }
                }
            );
        }, 5000)
    }, [])
    return (
        <P2PContext.Provider value={{ p2p: p2p.current }}>
            {children}
        </P2PContext.Provider>
    )
}



export default P2PProvider;