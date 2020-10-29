import React from "react"
import cl, { cls } from "../utils/cls";
import  { TWColors } from "../types/colors";
import applyColor from "../utils/applyColor";

type Props = {
    text: string,
    color: TWColors,
    isSmall?: boolean,
}



const UserLabel: React.FC<Props> = ({ text, color, isSmall = false }) => {
    // const actionStyle = "hover:bg-indigo-400 active:bg-indigo-700"
    const textColorStyle = applyColor(color, "text", 6)
    const bgColorStyle = applyColor(color, "bg", 2)
    const meduimStyle = "px-2 py-1 rounded font-bold"
    const smallStyle = "px-1 leading-relaxed rounded-sm"
    const defaultStyle = "inline-flex  text-xs  whitespace-no-wrap"

    const style = cls(defaultStyle, textColorStyle, bgColorStyle, isSmall ? smallStyle : meduimStyle)

    return (
        <span {...style}>
            {text}
        </span>
    )
}

export default UserLabel;

