import React from "react"
import UseMediaQuery from "../hooks/useMediaQuery";
import { AuthorGuest } from "../models/room_model";
import { TWColors } from "../types/colors";
import { VideoState } from "../types/video_type";
import Svg from "./svg";

type Props = {
    state: VideoState,
    author: AuthorGuest
    change: (state: VideoState) => void
}

const VideoStateButton: React.FC<Props> = ({ state, author, change }) => {
    const isSm = UseMediaQuery() == "sm";
    // TODO add wait state
    const svgType = state == VideoState.PUASED ? "Play" : "Pause";
    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        change(state == VideoState.PUASED ? VideoState.PLAYIED : VideoState.PUASED)
    }

    function createVideoInfo(msg: string) {
        return (<p className="md:text-lg px-2 py-1 text-xs font-semibold tracking-widest text-white border rounded-md">
            {msg}
        </p>)
    }

    if (state == VideoState.WAITING)
        return createVideoInfo(
            author == "currentUser" ?
                "Waiting for watchers" :
                `Waiting ${author.name} to start the video`
        )
    else if (state == VideoState.PUASED && author != "currentUser")
        return createVideoInfo(`${author.name} pauses the video`)
    else return (
        <button onClick={handleButtonClick}>
            <Svg type={svgType} size={isSm ? 24 : 40} color={TWColors.WHITE} weight={!isSm ? 1 : 2} />
        </button>
    )
}


export default VideoStateButton;