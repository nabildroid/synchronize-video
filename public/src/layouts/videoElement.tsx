import React, { useContext } from "react";
import Loading from "../components/loading";
import { VideoContext } from "../contexts/videoContext";
import { VideoState, VideoType } from "../types/video_type";
import ReactPlayer from "react-player";

type Props = {

}

const VideoElement: React.FC<Props> = ({ }) => {
    const { data, toggleController, setLength, playTo,state } = useContext(VideoContext);

    // TODO `HandleVideoDuration` should only works when the VideoType.DOWNLOAD
    const HandleVideoDuration = (length: number) => {
        setLength({
            minute: Math.floor(length / 60),
            secoud: Math.floor(length % 60),
            toTimestemp: () => length
        })
    }
    const HandleVideoProgress = (time: number) => {
        playTo({
            minute: Math.floor(time / 60),
            secoud: Math.floor(time % 60),
            toTimestemp: () => time
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
                />
                : <p>VideoType not supported</p>
            }
        </div>
    </div>
};



export default VideoElement;