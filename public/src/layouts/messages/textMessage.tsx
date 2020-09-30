import React from "react";
import UserLabel from "../../components/userLabel";
import { TWColors } from "../../types/colors";
import MessageText from "../../components/messageText";

type Props = {
    user: string;
    content: string;
}


const TextMessage: React.FC<Props> = ({ user, content }) => {
    return (
        <div className="text-left">
            <h3 className="inline-flex">
                <UserLabel color={TWColors.RED} text={user} isSmall={true} />
            </h3>
            <MessageText content={content} />
        </div>
    )
}
export default TextMessage;