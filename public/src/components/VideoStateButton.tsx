import React from "react"
import UseMediaQuery from "../hooks/useMediaQuery";
import { TWColors } from "../types/colors";
import { VideoState } from "../types/video_type";
import Svg from "./svg";

type Props = {
    state: VideoState,
    change: (state: VideoState) => void
}

const VideoStateButton: React.FC<Props> = ({ state, change }) => {
    const isSm = UseMediaQuery() == "sm";
    // TODO add wait state
    const svgType = state == VideoState.PUASED ? "Play" : "Pause";
    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        change(state == VideoState.PUASED ? VideoState.PLAYIED : VideoState.PUASED)
    }

    return (
        <button onClick={handleButtonClick}>
            <Svg type={svgType} size={isSm ? 24 : 40} color={TWColors.WHITE} weight={!isSm ? 1 : 2} />
        </button>
    )
}


export default VideoStateButton;