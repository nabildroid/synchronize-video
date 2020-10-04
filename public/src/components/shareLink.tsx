import React from "react"
import Svg from "./svg";
import { TWColors } from "../types/colors";

type Props = {
    url: string
}


function cleanURL(urlstring: string) {
    const url = new URL(urlstring);
    return `${url.hostname}${url.pathname}`
}
const ShareLink: React.FC<Props> = ({ url }) => {
    return (
        <div className="flex items-stretch justify-around pl-2 pr-1 mx-auto space-x-1 bg-white rounded-lg shadow-md">
            <div className="flex items-center text-sm">
                <span className="text-gray-500">Link:</span>
                <a className="px-1 font-mono font-semibold leading-loose text-indigo-700" href={url}>
                    {cleanURL(url)}
                </a>
            </div>
            <button className="px-1">
                <Svg type="Link" color={TWColors.INDIGO} />
            </button>
        </div>
    )
}
export default ShareLink;