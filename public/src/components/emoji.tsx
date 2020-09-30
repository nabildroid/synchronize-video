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
        default: return (
            <h2>{":("}</h2>
        )

    }
}
export default Emoji;