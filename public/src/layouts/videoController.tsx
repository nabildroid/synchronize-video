import React, { useContext, useEffect, useState } from "react"
import Button from "../components/button"
import ProgressBar from "../components/progressBar"
import Shade from "../components/shade"
import Svg from "../components/svg"
import VideoStateButton from "../components/VideoStateButton"
import VideoTime from "../components/videoTime"
import { VideoContext } from "../contexts/videoContext"
import { TWColors } from "../types/colors"
import { Duration, VideoState } from "../types/video_type"

type Props = {
    fullscreen: boolean,
    enterFullscreen()
    exitFullscreen()
}


const VideoController: React.FC<Props> = ({ enterFullscreen, exitFullscreen, fullscreen }) => {
    const { state, controller, toggleController, pause, play, start, position, data } = useContext(VideoContext);

    useEffect(() => {
        // TODO use debounce because any action should reset the counter
        if (controller) {
            const timer = setTimeout(toggleController, 5000);
            return () => clearTimeout(timer);
        }
    }, [controller])

    const HandleVideoStateChange = (state: VideoState) => {
        if (state == VideoState.PUASED)
            pause();
        else if (state == VideoState.PLAYIED)
            play();
        else if (state == VideoState.WAITE)
            start();
    }

    const ToggleFullScreen = () => {
        if (fullscreen) exitFullscreen();
        else enterFullscreen()

    }

    if (!data)
        return null;
    const { length } = data;

    const progress = position.toTimestemp() / length.toTimestemp();
    return controller && (
        <div className="absolute inset-0 z-10">
            <Shade color={TWColors.BLACK} opacity={25} />
            <div className="relative z-10 flex flex-col w-full h-full">
                <div className="flex items-center justify-center flex-1" onClick={toggleController}>
                    <VideoStateButton state={state} change={HandleVideoStateChange} />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between px-4 leading-loose">
                        <VideoTime time={position} isBold={true} />
                        <div className="flex items-center space-x-2">
                            <VideoTime time={length} />
                            <button onClick={ToggleFullScreen}>
                                <Svg type="Fullscreen" color={TWColors.WHITE} size={4} />
                            </button>
                        </div>
                    </div>
                    <ProgressBar progress={progress} />
                </div>
            </div>
        </div>
    )
}

export default VideoController