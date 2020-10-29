import React, { useEffect, useState } from "react"
import ProgressBar from "../components/progressBar"
import Shade from "../components/shade"
import { TWColors } from "../types/colors"

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
            setProgress(p=>p + Math.random() / 100);
        }, 120);
        return () => clearInterval(timer);
    }, [])

    return (
        <div className="absolute inset-0">
            {show &&
                <>
                    <Shade color={TWColors.BLACK} click={() => setShow(false)} opacity={25} />
                    <div className="z-10 flex flex-col w-full h-full">
                        <div className="flex-1">
                            a
                        </div>
                        <div>
                            <ProgressBar progress={progress} />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default VideoController