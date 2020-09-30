import React from "react"

type Props = {
    title: string
}

const VideoTitle: React.FC<Props> = ({ title }) => {

    return (
        <h1 className="sm:block md:text-lg max-w-lg font-bold leading-tight text-indigo-900">
            {title}
        </h1>
    )
}
export default VideoTitle