import React from "react"
import cl, { cls } from "../utils/cls";

type Props = {
    fullwith?: boolean,
    textSize?: "lg" | "sm" | "xs" | "md",
    click?: () => void,
    text: string
}


const Button: React.FC<Props> = ({ text, textSize = "md", fullwith = false, click }) => {
    const sfullwidth = cl({ "w-full": fullwith });
    const stextSize = `text-${textSize}`
    const style = cls(sfullwidth, stextSize, "font-semibold", "leading-loose", "text-white", "bg-indigo-500", "rounded-lg")

    return (
        <button
            {...style}
            onClick={click}
        >
            {text}
        </button>
    )
}

export default Button;

