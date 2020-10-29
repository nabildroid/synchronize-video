import React, { useEffect, useState } from "react"
import Button from "../components/button"
import ProgressBar from "../components/progressBar"
import Shade from "../components/shade"
import Svg from "../components/svg"
import VideoTime from "../components/videoTime"
import { TWColors } from "../types/colors"
import { Duration } from "../types/video_type"

type Props = {

}


const VideoController: React.FC<Props> = ({ }) => {
    const [show, setShow] = useState(true);
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        // TODO use debounce because any action should reset the counter
        if (show) {
            const timer = setTimeout(() => setShow(false), 50000);
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
    return (
        <div className="absolute inset-0 z-10">
            {show &&
                <>
                    <Shade color={TWColors.BLACK} click={() => setShow(false)} opacity={25} />
                    <div className="z-10 flex flex-col w-full h-full">
                        <div className="flex items-center justify-center flex-1">
                            <button className="border-4 border-white rounded-full">
                                <Svg type="Random" size={40} color={TWColors.WHITE} />
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between px-4">
                                <VideoTime time={currentTime} isBold={true} />
                                <div className="flex items-center space-x-2">
                                    <VideoTime time={endTime} />
                                    <button>
                                        <Svg type="Fullscreen" color={TWColors.WHITE} size={5} />
                                    </button>
                                </div>
                            </div>
                            <ProgressBar progress={progress} />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default VideoController