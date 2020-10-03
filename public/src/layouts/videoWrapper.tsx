import React, { useLayoutEffect, useEffect } from "react"
import Shade from "../components/shade"
import { TWColors } from "../types/colors"

type Props = {

}

const VideoWrapper: React.FC<Props> = ({ children }) => {

    const wrapper = React.useRef<HTMLDivElement>(null)
    const [height, setHeight] = React.useState(0);

    const ReactToResizing = React.useCallback(() => {
        if (wrapper.current)
            setHeight((wrapper.current.offsetWidth * 9) / 16)
    }, []);


    useLayoutEffect(() => {
        ReactToResizing();
        window.addEventListener("resize", ReactToResizing)
        return () => window.removeEventListener("resize", ReactToResizing)
    }, []);

    return (
        <div className="video relative p-2 pb-0">
            <Shade color={TWColors.BLACK} opacity={100} className="inset-x-0 h-40" />
            <div
                style={{ "height": height }}
                ref={wrapper}
                className=" sm:max-w-lg md:max-w-none sm:bg-indigo-600 relative z-10 w-full h-64 max-w-md mx-auto bg-yellow-500"
            >
                {children}
            </div>
        </div >
    )

}


export default VideoWrapper