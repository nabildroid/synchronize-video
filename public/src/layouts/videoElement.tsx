import React, { useContext } from "react";
import Loading from "../components/loading";
import { VideoContext } from "../contexts/videoContext";
import { VideoType } from "../types/video_type";
import ReactPlayer from "react-player";

type Props = {

}

const VideoElement: React.FC<Props> = ({ }) => {
    const { data, toggleController } = useContext(VideoContext);
    console.log("video", data);

    if (!data)
        return <Loading />
    else if (data.type == VideoType.DOWNLOAD)
        return <div onClick={toggleController} className="w-full h-full">
            <div className="w-full h-full pointer-events-none">
                <ReactPlayer
                    url={data.link.toString()}
                    onProgress={console.log}
                    playing={true}

                    width="100%" height="100%"
                />
            </div>
        </div>
    else return <p>Video Not Supported</p>
};



export default VideoElement;