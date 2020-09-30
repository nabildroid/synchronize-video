import React from "react"
import Emoji from "./emoji"
import { MessageReactions } from "../types/message_type"

type Props = {
    name: string,
    type: MessageReactions,
    click: () => void,
}

const EmojiButton: React.FC<Props> = ({ name, type, click }) => {

    return (
        <button
            aria-label={name}
            className="rounded-full shadow-inner"
            onClick={click}
        >
            <Emoji type={type} width={8} height={8} />
        </button>
    )
}
export default EmojiButton