import React from 'react'
import { MessageReactions } from '../types/message_type'
import EmojiButton from '../components/emojiButton';
import enumKeys from '../utils/enumKeys';


type Props = {
    click(emojiType: MessageReactions)
}



const EmojisBlock: React.FC<Props> = ({ click }) => {


    let allEmojis = enumKeys(MessageReactions)
    return (
        <div className="lg:space-y-5 lg:space-x-3 lg:flex-row relative z-20 flex flex-col items-center self-end justify-center flex-shrink-0 p-1 space-y-3">
            {
                allEmojis.map((key) => (
                    <EmojiButton key={key}
                        type={MessageReactions[key]}
                        name={key}
                        click={() => click(MessageReactions[key])}
                    />
                ))
            }

        </div>
    )
}

export default EmojisBlock;