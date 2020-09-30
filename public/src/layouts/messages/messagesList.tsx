import React from "react"
import { MessageType } from "../../types/message_type";
import Dot from "../../components/messageDot";
import TextMessage from "./textMessage";
import EmojiMessage from "./emojiMessage";
import MessageTimeLabel from "../../components/messageTimeLabel";
import { TimelineMessages } from "../../models/message_model";



type Props = {
    content: TimelineMessages
}


const MessagesList: React.FC<Props> = ({ content }) => {
    return (
        <div className="md:pb-2 md:space-y-2 flex-1 pb-24 space-y-1 overflow-y-scroll text-center">
            {
                content.map(elm => {
                    switch (elm.type) {
                        case "dot":
                            return <Dot />
                        case "time":
                            return <MessageTimeLabel time={elm.payload} />
                        case "message":
                            return elm.payload.body.type == MessageType.TEXT ?
                                <TextMessage content={elm.payload.body.content} user={elm.payload.user.name} /> :
                                <EmojiMessage emoji={elm.payload.body.content} user={elm.payload.user.name} />
                    }
                })
            }
        </div>
    )
};

export default MessagesList;