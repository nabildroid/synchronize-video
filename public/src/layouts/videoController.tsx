import React, { useEffect, useState } from "react"
import Button from "../components/button"
import ProgressBar from "../components/progressBar"
import Shade from "../components/shade"
import Svg from "../components/svg"
import VideoStateButton from "../components/VideoStateButton"
import VideoTime from "../components/videoTime"
import { TWColors } from "../types/colors"
import { Duration, VideoState } from "../types/video_type"

type Props = {
    show: boolean,
    hide()
}


const VideoController: React.FC<Props> = ({ show, hide }) => {
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        // TODO use debounce because any action should reset the counter
        if (show) {
            const timer = setTimeout(hide, 5000);
            return () => clearTimeout(timer);
        }
    }, [show])

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => p + Math.random() / 100);
        }, 120);
        return () => clearInterval(timer);
    }, [])


    const currentTime: Duration = {
        minute: 15,
        secoud: 16,
        toTimestemp: () => 89998
    }
    const endTime: Duration = {
        minute: 18,
        secoud: 1,
        toTimestemp: () => 89998
    }


    return show && (
        <div className="absolute inset-0 z-10">
            <Shade color={TWColors.BLACK} opacity={25} />
            <div className="relative z-10 flex flex-col w-full h-full">
                <div className="flex items-center justify-center flex-1" onClick={hide}>
                    <VideoStateButton  state={VideoState.PUASED} change={console.log} />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between px-4 leading-loose">
                        <VideoTime time={currentTime} isBold={true} />
                        <div className="flex items-center space-x-2">
                            <VideoTime time={endTime} />
                            <button>
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