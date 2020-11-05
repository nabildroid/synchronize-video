import React, { useContext, useEffect } from "react"
import VideoWrapper from "../components/videoWrapper"
import { VideoContext } from "../contexts/videoContext"
import VideoController from "./videoController"
import VideoElement from "./videoElement"
import { FullScreen, useFullScreenHandle } from "react-full-screen";

type Props = {

}


const Video: React.FC<Props> = ({ }) => {
    const handleFullscreen = useFullScreenHandle();
    const { data } = useContext(VideoContext);
    return (
        <FullScreen handle={handleFullscreen}>
            <VideoWrapper>
                {!!data && <VideoElement />}
                <VideoController
                    enterFullscreen={handleFullscreen.enter}
                    exitFullscreen={handleFullscreen.exit}
                    fullscreen={handleFullscreen.active}
                />
            </VideoWrapper>
        </FullScreen>
    )
}

export default Video;