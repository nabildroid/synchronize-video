import React, { useState } from "react";
import Label from "../components/label";
import MessagesList from "./messages/messagesList";
import { MessageType, MessageReactions } from "../types/message_type";
import { TimelineMessages } from "../models/message_model";
import { WithoutLabel, WithLabel } from "./messages/writeMessage";
import UseMediaQuery from "../hooks/useMediaQuery";

type Props = {

}

const Messages: React.FC<Props> = ({ }) => {

    const user = {
        id: 17787,
        isAuthor: () => Promise.resolve(true),
        isSynced: () => Promise.resolve(true),
        position: () => Promise.resolve({
            minute: 15,
            secoud: 20,
            toTimestemp: () => 1520
        }),
        name: "Tino"

    };
    const messages: TimelineMessages = [
        {
            id: 1,
            type: "dot",
        },
        {
            id: 2,
            type: "dot",
        },
        {
            id: 3,
            type: "time",
            payload: {
                minute: 15,
                secoud: 20,
                toTimestemp: () => 1520
            }
        },
        {
            id: 4,
            type: "message",
            payload: {
                body: {
                    type: MessageType.REACTION,
                    content: MessageReactions.SAD
                },
                duration: {
                    minute: 15,
                    secoud: 20,
                    toTimestemp: () => 1520
                },
                user
            }
        },
        {
            id: 5,
            type: "message",
            payload: {
                body: {
                    type: MessageType.TEXT,
                    content: "hello  this rier  erfezr  thetrh  h eth er h ytjru u yhrtgkotkgzr t hr hrkh h hthorek vfg yjuipu^cdfcx;vlvkmz g brmbr"
                },
                duration: {
                    minute: 15,
                    secoud: 20,
                    toTimestemp: () => 1520
                },
                user
            }
        }, {
            id: 6,
            type: "dot",
        },
        {
            id: 7,
            type: "dot",
        },
        {
            id: 8,
            type: "time",
            payload: {
                minute: 15,
                secoud: 20,
                toTimestemp: () => 1520
            }
        },
        {
            id: 9,
            type: "message",
            payload: {
                body: {
                    type: MessageType.REACTION,
                    content: MessageReactions.SAD
                },
                duration: {
                    minute: 15,
                    secoud: 20,
                    toTimestemp: () => 1520
                },
                user
            }
        },
        {
            id: 10,
            type: "message",
            payload: {
                body: {
                    type: MessageType.TEXT,
                    content: "hello world this rier  erfezr  thetrh  h eth er h ytjru u yhrtgkotkgzr t hr hrkh h hthorek vfg yjuipu^cdfcx;vlvkmz g brmbr"
                },
                duration: {
                    minute: 15,
                    secoud: 20,
                    toTimestemp: () => 1520
                },
                user
            }
        }, {
            id: 11,
            type: "dot",
        },
        {
            id: 12,
            type: "dot",
        },
        {
            id: 13,
            type: "time",
            payload: {
                minute: 15,
                secoud: 20,
                toTimestemp: () => 1520
            }
        },
        {
            id: 14,
            type: "message",
            payload: {
                body: {
                    type: MessageType.REACTION,
                    content: MessageReactions.SAD
                },
                duration: {
                    minute: 15,
                    secoud: 20,
                    toTimestemp: () => 1520
                },
                user
            }
        },
        {
            id: 15,
            type: "message",
            payload: {
                body: {
                    type: MessageType.TEXT,
                    content: "hello world this rier  erfezr  thetrh  h eth er h ytjru u yhrtgkotkgzr t hr hrkh h hthorek vfg yjuipu^cdfcx;vlvkmz g brmbr"
                },
                duration: {
                    minute: 15,
                    secoud: 20,
                    toTimestemp: () => 1520
                },
                user
            }
        }
    ]


    const [text, setText] = useState("");
    const isNotLg = UseMediaQuery() != "lg";
    return (
        <div className="md:bg-gray-100 flex flex-col flex-auto w-full h-full px-2 pt-2 bg-white">
            <Label name="Messages" />
            <MessagesList content={messages} />
            <div className="md:relative fixed bottom-0 left-0 self-end w-full px-2 py-2">
                {isNotLg && <WithoutLabel text={text} setText={setText} />}
            </div>
        </div>
    )
}
export default Messages;