import React from "react";
import { Duration } from "../types/video_type";


type Props = {
    time: Duration
}

const MessageTimeLabel: React.FC<Props> = ({ time }) => {
    return (
        <div className="font-meduim flex items-center w-12 px-1 mx-auto space-x-1 text-xs text-indigo-400 bg-indigo-200 rounded-full">
            <span className="w-2 h-2 bg-indigo-300 rounded-full"></span>
            <time >{time.minute}:{time.secoud}</time>
        </div>
    )
}

export default MessageTimeLabel;