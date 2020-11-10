import React, { useContext, useEffect, useRef, useState } from "react"
import { MessageType, TimelineMessage, TimelineMessages } from "../../types/message_type";
import Dot from "../../components/messageDot";
import TextMessage from "./textMessage";
import EmojiMessage from "./emojiMessage";
import MessageTimeLabel from "../../components/messageTimeLabel";
import { Duration } from "../../types/video_type";
import { MessagesContext } from "../../contexts/messagesContext";
import { VideoContext } from "../../contexts/videoContext";



type Props = {
}


const MessagesList: React.FC<Props> = ({ }) => {
    const { timeline_messages } = useContext(MessagesContext);
    const { isSynced, playBack, position } = useContext(VideoContext);
    const [allowMessagesToVideoProgress, setAllowMessagesToVideoProgress] = useState(true);
    const childs = useRef<{
        elm: HTMLDivElement,
        time: Duration
    }[]>([]);

    useEffect(() => {
        const target = childs.current.find(e => {
            const diff = Math.abs(e.time.toTimestemp() - position.toTimestemp())
            return diff < 1000;
        });

        if (target && !isSynced) {
            setAllowMessagesToVideoProgress(false);
            target.elm.scrollIntoView();
            setTimeout(() => setAllowMessagesToVideoProgress(true), 200);
        }
    }, [position])


    const handleScroll = (event: React.UIEvent) => {
        if (allowMessagesToVideoProgress) {
            console.log(event.nativeEvent);
            const parent = event.target as HTMLDivElement;
            const viewportStart = parent.scrollTop;
            const viewportEnd = viewportStart + parent.offsetHeight;

            childs.current.forEach(e => {
                e.elm.classList.remove("bg-red-200")
                e.elm.classList.add("bg-indigo-200")
            });

            const reversed = Array.from(childs.current).reverse();
            for (let i = 0; i < reversed.length; i++) {
                const { elm, time } = reversed[i];

                const { offsetHeight: height, offsetTop: top } = elm;
                if (i != 0 && top >= viewportStart && top + height / 2 <= viewportEnd) {
                    playBack(time);
                    // console.log(elm);
                    elm.classList.remove("bg-indigo-200")

                    elm.classList.add("bg-red-200");
                    break;
                }
            }
        }

    }

    return (
        <div
            className="md:pb-2 md:space-y-2 flex-1 max-h-screen pb-24 space-y-1 overflow-y-scroll text-center"
            onScroll={handleScroll}
        >
            {
                timeline_messages.map(elm => {
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