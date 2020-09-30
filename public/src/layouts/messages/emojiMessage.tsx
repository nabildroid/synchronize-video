import React from "react";
import UserLabel from "../../components/userLabel";
import { TWColors } from "../../types/colors";
import { MessageReactions } from "../../types/message_type";
import Emoji from "../../components/emoji";

type Props = {
    user: string;
    emoji: MessageReactions;
}


const EmojiMessage: React.FC<Props> = ({ user, emoji }) => {
    return (
        <div className="flex space-x-2 text-left">

            <div>
                <h3 className="inline-flex">
                    <UserLabel color={TWColors.RED} text={user} isSmall={true} />
                </h3>
            </div>
            <div >
                <Emoji type={emoji} height={6} width={6} />
            </div>
        </div>
    )
}
export default EmojiMessage;