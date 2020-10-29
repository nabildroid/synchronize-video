import React, { useContext, useState } from "react"
import VideoWrapper from "../layouts/videoWrapper"
import VideoTitle from "../components/videoTitle"
import ShareLink from "../components/shareLink"
import { WithLabel } from "../layouts/messages/writeMessage"
import EmojisBlock from "../layouts/emojisBlock"
import UseMediaQuery from "../hooks/useMediaQuery"
import Watchers from "../layouts/wacthers"
import Messages from "../layouts/messages"
import MessagesProvider from "../contexts/messagesContext"
import { RoomContext } from "../contexts/roomContext"
import Video from "../layouts/video"
import Loading from "../components/loading"
import VideoController from "../layouts/videoController"

type Props = {

}

const RoomView: React.FC<Props> = ({ }) => {
    const { loading, title, watchersUsers, link } = useContext(RoomContext)

    const [showVideoController, setShowVideoController] = useState(true);
    const bearkPoint = UseMediaQuery()
    const isLg = bearkPoint == "lg";
    const isNotSm = bearkPoint != "sm";


    if (loading)
        return <Loading />
    return (
        <MessagesProvider>
            <div className="md:flex-row md:justify-center flex flex-col w-full min-h-screen">
                <div className="md:flex-none md:h-screen md:w-2/3 md:max-w-none lg:max-w-4xl flex flex-col">

                    <VideoWrapper>
                        <Video showController={() => setShowVideoController(true)} />
                        <VideoController show={showVideoController} hide={() => setShowVideoController(false)} />
                    </VideoWrapper>
                    <div className="info pd-2 sm:pb-4 flex items-start justify-between p-2 border-b-2 border-indigo-100">
                        <VideoTitle title={title} />
                        {
                            isNotSm &&
                            <ShareLink url={link} />
                        }
                    </div>
                    <div className="md:flex-col flex flex-row-reverse justify-between">
                        <div className="lg:pb-0 lg:justify-end md:w-full flex items-end justify-between w-1/6 p-2 space-x-2">
                            {isLg && (
                                <div className="w-5/6">
                                    <WithLabel text="hello" setText={() => { }} />
                                </div>
                            )}
                            <EmojisBlock click={() => { }} />
                        </div>
                        <div className="lg:-mt-4 md:w-full w-5/6">
                            <Watchers guests={watchersUsers} />
                        </div>
                    </div>
                </div>
                <div className="md:max-w-xl md:mt-0 w-5/6 max-h-screen -mt-20 overflow-hidden">
                    <Messages />
                </div>
            </div>
        </MessagesProvider>

    )
}

export default RoomView