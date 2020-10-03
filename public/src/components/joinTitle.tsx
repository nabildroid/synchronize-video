import React from "react"


type Props = {
    name: string
}


function extractName(name: string) {
    return name;
    // https://www.notion.so/laknabil/object-chaining-parser-dc2da082dd3a4f56b3359cb47e48cc91
}

const JoinTitle: React.FC<Props> = ({ name }) => {
    const cleanName = extractName(name.trim());
    return (
        <h2 className="lg:items-center md:items-start md:text-4xl flex justify-center space-x-3 text-3xl tracking-wide text-gray-800">
            <span className="font-medium text-indigo-600">{cleanName}</span>
            <span>Asks you to join</span>
        </h2>
    )
};

export default JoinTitle;