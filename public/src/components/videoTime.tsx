import React from "react"
import { Duration } from "../types/video_type";
import cl, { cls } from "../utils/cls";


type Props = {
    time: Duration
    isBold?: boolean
}


const VideoTime: React.FC<Props> = ({ time, isBold = false }) => {
    const date = new Date(time.toTimestemp());
    const isBoldStyle = cl({ "font-bold": isBold });
    const defaultStyle = cls(isBoldStyle,"text-sm","text-white","font-mono")
    return (
        <div {...defaultStyle}>
            <time dateTime={date.toString()}>
                {time.minute}:{time.secoud}
            </time>
        </div>
    )
}


export default VideoTime;