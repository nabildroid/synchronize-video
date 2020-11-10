import React, { useRef } from "react"
import { MessageType, TimelineMessage, TimelineMessages } from "../../types/message_type";
import Dot from "../../components/messageDot";
import TextMessage from "./textMessage";
import EmojiMessage from "./emojiMessage";
import MessageTimeLabel from "../../components/messageTimeLabel";
import { Duration } from "../../types/video_type";



type Props = {
    content: TimelineMessages,
}


const MessagesList: React.FC<Props> = ({ content }) => {

    const childs = useRef<{
        elm: HTMLDivElement,
        time: Duration
    }[]>([]);

    const handleScroll = (event: React.UIEvent) => {
        const parent = event.target as HTMLDivElement;
        const viewportStart = parent.scrollTop;
        const viewportEnd = viewportStart + parent.offsetHeight;

        childs.current.forEach(e => {
            e.elm.classList.remove("bg-red-200")
            e.elm.classList.add("bg-indigo-200")
        });
        for (const { elm, time } of Array.from(childs.current).reverse()) {
            const { offsetHeight: height, offsetTop: top } = elm;
            if (top >= viewportStart && top + height / 2 <= viewportEnd) {
                // console.log(elm);
                elm.classList.remove("bg-indigo-200")

                elm.classList.add("bg-red-200");
                break;
            }
        }

    }

    return (
        <div
            className="md:pb-2 md:space-y-2 flex-1 max-h-screen pb-24 space-y-1 overflow-y-scroll text-center"
            onScroll={handleScroll}
        >
            {
                content.map(elm => {
                    switch (elm.type) {
                        case "dot":
                            return <Dot key={elm.id} />
                        case "time":
                            return <MessageTimeLabel siblings={childs} time={elm.payload} key={elm.id} />
                        case "message":
                            return elm.payload.body.type == MessageType.TEXT ?
                                <TextMessage content={elm.payload.body.content} user={elm.payload.user.name} key={elm.id} /> :
                                <EmojiMessage emoji={elm.payload.body.content} user={elm.payload.user.name} key={elm.id} />
                    }
                })
            }
        </div>
    )
};

export default MessagesList;