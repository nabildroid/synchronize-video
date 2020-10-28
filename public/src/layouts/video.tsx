import React, { useContext } from "react";
import Loading from "../components/loading";
import { VideoContext } from "../contexts/videoContext";
import { VideoType } from "../types/video_type";


type Props = {
}

const Video: React.FC<Props> = ({ }) => {
    const { data } = useContext(VideoContext);
    console.log("video",data);
    
    if (!data)
        return <Loading />
    else if (data.type == VideoType.DOWNLOAD)
        return <video className="w-full h-full">
            <source src={data.link.toString()} />
        </video>
    else return <p>Video Not Supported</p>
            

};

export default Video;