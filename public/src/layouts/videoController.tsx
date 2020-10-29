import React, { useEffect, useState } from "react"
import Shade from "../components/shade"
import { TWColors } from "../types/colors"

type Props = {

}


const VideoController: React.FC<Props> = ({ }) => {
    const [show, setShow] = useState(true);


    useEffect(() => {
        // TODO use debounce because any action should reset the counter
        if (show) {
            const timer = setTimeout(() => setShow(false), 50000);
            return () => clearTimeout(timer);
        }
    }, [show])


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
                            <span>Progress bar</span>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default VideoController