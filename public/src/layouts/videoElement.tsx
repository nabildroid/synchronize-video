import React, { useContext, useEffect, useRef } from "react";
import Loading from "../components/loading";
import { VideoContext } from "../contexts/videoContext";
import { VideoState, VideoType } from "../types/video_type";
import ReactPlayer from "react-player";

type Props = {

}

const VideoElement: React.FC<Props> = ({ }) => {
    const { data, toggleController, setLength, playToTime, state, onProgressSeekTo } = useContext(VideoContext);
    const player = useRef<ReactPlayer>();

    useEffect(() => onProgressSeekTo(player.current.seekTo), [player]);

    // TODO `HandleVideoDuration` should only works when the VideoType.DOWNLOAD
    const HandleVideoDuration = (length: number) => {
        setLength({
            minute: Math.floor(length / 60),
            secoud: Math.floor(length % 60),
            toTimestemp: () => length * 1000
        })
    }
    const HandleVideoProgress = (time: number) => {
        playToTime({
            minute: Math.floor(time / 60),
            secoud: Math.floor(time % 60),
            toTimestemp: () => time * 1000
        })
    }


    return <div onClick={toggleController} className="w-full h-full">
        <div className="w-full h-full pointer-events-none">
            {data.type == VideoType.DOWNLOAD ?
                <ReactPlayer
                    url={data.link.toString()}
                    onProgress={({ playedSeconds }) => HandleVideoProgress(playedSeconds)}
                    playing={state == VideoState.PLAYIED}
                    onDuration={HandleVideoDuration}
                    width="100%" height="100%"
                    ref={player}
                />
                : <p>VideoType not supported</p>
            }
        </div>
    </div>
};



export default VideoElement;