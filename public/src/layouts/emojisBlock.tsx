import React, { useContext } from 'react'
import { MessageReactions } from '../types/message_type'
import EmojiButton from '../components/emojiButton';
import enumKeys from '../utils/enumKeys';
import { MessagesContext } from '../contexts/messagesContext';


type Props = {
}



const EmojisBlock: React.FC<Props> = ({ }) => {
    const { sendReaction } = useContext(MessagesContext)

    let allEmojis = enumKeys(MessageReactions)
    return (
        <div className="lg:space-y-0 lg:space-x-3 lg:flex-row relative flex flex-col items-center self-end justify-center flex-shrink-0 p-1 space-y-3">
            {
                allEmojis.map((key) => (
                    <EmojiButton key={key}
                        type={MessageReactions[key]}
                        name={key}
                        click={() => sendReaction(MessageReactions[key])}
                    />
                ))
            }

        </div>
    )
}

export default EmojisBlock;