import React, { useContext, useEffect, useState } from "react"
import Button from "../components/button"
import Loading from "../components/loading"
import ProgressBar from "../components/progressBar"
import Shade from "../components/shade"
import Svg from "../components/svg"
import VideoStateButton from "../components/VideoStateButton"
import VideoTime from "../components/videoTime"
import { RoomContext } from "../contexts/roomContext"
import { VideoContext } from "../contexts/videoContext"
import { TWColors } from "../types/colors"
import { Duration, VideoState } from "../types/video_type"

type Props = {
    fullscreen: boolean,
    enterFullscreen()
    exitFullscreen()
}


const VideoController: React.FC<Props> = ({ enterFullscreen, exitFullscreen, fullscreen }) => {
    const { state, controller, toggleController, pause, play, playToProgress, position, length } = useContext(VideoContext);
    const { authorGuest } = useContext(RoomContext);

    useEffect(() => {
        // TODO use debounce because any action should reset the counter
        if (controller && length && state == VideoState.PLAYIED) {
            const timer = setTimeout(toggleController, 5000);
            return () => clearTimeout(timer);
        }
    }, [controller, length])

    const HandleVideoStateChange = (state: VideoState) => {
        if (state == VideoState.PUASED)
            pause();
        else if (state == VideoState.PLAYIED)
            play();
    }

    const ToggleFullScreen = () => {
        if (fullscreen) exitFullscreen();
        else enterFullscreen()

    }


    const calcProgress = (length: Duration, played: Duration) => {
        return played.toTimestemp() / length.toTimestemp();
    }

    const visibility = !controller ? "hidden" : "";
    return (
        <div className={`absolute inset-0 z-10 ${visibility}`}>
            <Shade color={TWColors.BLACK} opacity={25} />
            {!!length &&
                <div className="relative z-10 flex flex-col w-full h-full">
                    <div className="flex items-center justify-center flex-1" onClick={toggleController}>
                        <VideoStateButton author={authorGuest} state={state} change={HandleVideoStateChange} />
                    </div>
                    <div className="flex flex-col">

                        <div className="flex items-center justify-between px-4 leading-relaxed">
                            <VideoTime time={position} isBold={true} />
                            <div className="flex items-center space-x-2">
                                <VideoTime time={length} />
                                <button onClick={ToggleFullScreen}>
                                    <Svg type="Fullscreen" color={TWColors.WHITE} size={4} />
                                </button>
                            </div>
                        </div>
                        <ProgressBar progress={calcProgress(length, position)} playTo={playToProgress} />
                    </div>
                </div>}

            {!length && <Loading center={true} primaryColor={TWColors.WHITE} />}
        </div>
    )
}

export default VideoController