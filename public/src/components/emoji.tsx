import React from "react";
import { MessageReactions } from "../types/message_type";
import { cls } from "../utils/cls";


type Props = {
    type: MessageReactions,
    width?: number,
    height?: number,
}


const Emoji: React.FC<Props> = ({ type, height = 16, width = 16 }) => {
    const style = cls(`w-${width}`, `h-${height}`);

    switch (type) {
        case MessageReactions.SAD:
            return (
                <img {...style} src="http://localhost/hhh.png" alt="sad emoji" />
            )
        case MessageReactions.LANTH:
            return (
                <img {...style} src="http://localhost/hhh.png" alt="lanth emoji" />
            )
        case MessageReactions.ANGER:
            return (
                <img {...style} src="http://localhost/hhh.png" alt="anger emoji" />
            )
        case MessageReactions.HEART:
            return (
                <img {...style} src="http://localhost/hhh.png" alt="heart emoji" />
            )
        default: return null

    }
}
export default Emoji;