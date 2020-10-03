import React from "react"
import cl, { cls } from "../utils/cls";

type Props = {
    fullwith?: boolean,
    textSize?: "lg" | "sm" | "xs" | "md",
    click?: () => void,
    text: string,
    type?: "submit" | "button";
}


const Button: React.FC<Props> = ({ text, textSize = "md", fullwith = false, click = null, type = "button" }) => {
    const sfullwidth = cl({ "w-full": fullwith });
    const stextSize = `text-${textSize}`
    const actionStyle = "hover:bg-indigo-400 active:bg-indigo-700"
    const defaultStyle = "outline-none px-4 font-semibold leading-loose text-white bg-indigo-500 rounded-md"

    const style = cls(actionStyle, sfullwidth, stextSize, defaultStyle)

    return (
        <button
            {...style}
            {...(click && { onClick: click })}
            type={type}
        >
            {text}
        </button>
    )
}

export default Button;

