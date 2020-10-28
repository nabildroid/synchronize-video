import React, { createContext, useContext, useEffect, useReducer } from "react"
import videoAction from "../actions/videoAction"
import { IvideoProvider, VideoStateInit } from "../models/video_model"
import { DataFlowTypes } from "../types/P2P_node_API"
import { Duration } from "../types/video_type"
import { P2PContext } from "./p2pContext"
import { RoomContext } from "./roomContext"



export const VideoContext = createContext<IvideoProvider>(null)

const VideoProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(videoAction, VideoStateInit);
    const {p2p} = useContext(P2PContext);
    const { authorUser } = useContext(RoomContext);

    useEffect(() => {
        if (authorUser)
            askAuthorForVideo();
    }, [authorUser])

    useEffect(() => {
        if (state.data)
            p2p.listenTo(DataFlowTypes.USER_POSITION, ({ sender, payload }) => {
                dispatch({
                    type: "user_position", payload: {
                        position: payload as Duration,
                        user: sender
                    }
                })
            })
    }, [state.data])

    const askAuthorForVideo = async () => {
        dispatch({ type: "loading_on" })
        const video = await authorUser.getVideo();
        dispatch({ type: "load_video", payload: video });
    }

    const values = {
        ...state,

    }
    return (
        <VideoContext.Provider value={values}>
            {children}
        </VideoContext.Provider>
    )
}

export default VideoProvider