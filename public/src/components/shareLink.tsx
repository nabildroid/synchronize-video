import React from "react"

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
                    <svg className=" w-4 h-4 text-indigo-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                </button>
            </div>
    )
}
export default ShareLink;