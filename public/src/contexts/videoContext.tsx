import React, { createContext } from "react"
import { IvideoProvider } from "../models/video_model"



const VideoContext = createContext<IvideoProvider>(null)

const VideoProvider: React.FC = ({ children }) => {

    return (
        <VideoContext.Provider value={null}>
            {children}
        </VideoContext.Provider>
    )
}

export default VideoProvider