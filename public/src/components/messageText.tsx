import React from "react"

type Props = {
    content:string
}

const MessageText: React.FC<Props> = ({ content }) => {

    return (
        <p className="text-md pl-2 leading-tight text-gray-800">
            {content}
        </p>
    )
}
export default MessageText