import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useHistory } from "react-router-dom"
import videoAction from "../actions/videoAction"
import { IvideoProvider, VideoStateInit } from "../models/video_model"
import { DataFlowTypes } from "../types/P2P_node_API"
import { Duration, VideoType } from "../types/video_type"
import { AppContext } from "./appContext"
import { P2PContext } from "./p2pContext"
import { RoomContext } from "./roomContext"



export const VideoContext = createContext<IvideoProvider>(null)

const VideoProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(videoAction, VideoStateInit);
    const { p2p } = useContext(P2PContext);
    const { authorUser } = useContext(RoomContext);
    const { newRoom } = useContext(AppContext)
    const { push } = useHistory();

    useEffect(() => {
        if (authorUser && !state.data)
            askAuthorForVideo();
    }, [authorUser])


    useEffect(() => {
        p2p.listenTo(DataFlowTypes.USER_POSITION, ({ sender, payload }) => {
            dispatch({
                type: "user_position", payload: {
                    position: payload as Duration,
                    user: sender
                }
            })
        })
    }, [])

    const askAuthorForVideo = async () => {
        dispatch({ type: "loading_on" })
        console.log(authorUser);
        // get the video either from the p2p or AppContext
        if (typeof authorUser == "object") {
            const video = await authorUser.getVideo();
            dispatch({ type: "load_video", payload: video });
        } else if (authorUser == "currentUser" && newRoom) {
            dispatch({ type: "load_video", payload: newRoom.video });
        } else push("/")

    }

    const toggleController = () => {
        if (state.controller)
            dispatch({ type: "controller_off" })
        else dispatch({ type: "controller_on" })
    }

    const setLength = (length: Duration) => {
        dispatch({ type: "set_length", payload: length })
    }

    const playTo = (time: Duration) => {
        console.log(time);
        dispatch({ type: "update_position", payload: time })
    }

    const values = {
        ...state,
        toggleController,
        setLength,
        playTo
    }

    return (
        <VideoContext.Provider value={values}>
            {children}
        </VideoContext.Provider>
    )
}

export default VideoProvider