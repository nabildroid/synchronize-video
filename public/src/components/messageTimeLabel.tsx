import React, { useEffect, useRef } from "react";
import { TimelineMessage } from "../types/message_type";
import { Duration } from "../types/video_type";
import TwoDigits from "../utils/twoDigitsNumber";


type Props = {
    time: Duration,
    siblings: React.MutableRefObject<{
        elm: HTMLDivElement,
        time: Duration
    }[]>
}

const MessageTimeLabel: React.FC<Props> = ({ time, siblings }) => {
    const elm = useRef<HTMLDivElement>()

    useEffect(() => {
        if (elm.current && siblings.current) {
            siblings.current.push({ elm: elm.current, time });
            return () => siblings.current = siblings.current.filter(e => e.elm != elm.current)
        }
    }, [elm, siblings]);
    
    return (
        <div ref={elm} className="font-meduim flex items-center w-12 px-1 mx-auto space-x-1 text-xs text-indigo-400 bg-indigo-200 rounded-full">
            <span className="w-2 h-2 bg-indigo-300 rounded-full"></span>
            <time >{TwoDigits(time.minute)}:{TwoDigits(time.secoud)}</time>
        </div>
    )
}

export default MessageTimeLabel;