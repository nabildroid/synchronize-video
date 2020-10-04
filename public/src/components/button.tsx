import React from "react"
import cl, { cls } from "../utils/cls";
import Svg, { SvgList } from "./svg";
import { TWColors } from "../types/colors";

type Props = {
    fullwith?: boolean,
    textSize?: "lg" | "sm" | "xs" | "md",
    click?: () => void,
    text: string,
    type?: "submit" | "button";
    icon?: SvgList;
    className?: string
}


const Button: React.FC<Props> = ({ text, icon = null, className = "", textSize = "md", fullwith = false, click = null, type = "button" }) => {
    const sfullwidth = cl({ "w-full": fullwith });
    const stextSize = `text-${textSize}`
    const actionStyle = "hover:bg-indigo-400 active:bg-indigo-700"
    const defaultStyle = "outline-none flex space-x-2 items-center justify-center outline-none px-4 font-semibold leading-loose text-white bg-indigo-500 rounded-md"

    const style = cls(actionStyle, sfullwidth, stextSize, defaultStyle, className)

    return (
        <button
            {...style}
            {...(click && { onClick: click })}
            type={type}
        >
            {icon && <Svg type={icon} color={TWColors.WHITE} />}
            <span>{text}</span>
        </button>
    )
}

export default Button;

