import React from "react"
import cl, { cls } from "../utils/cls"
import applyColor, { TWColors } from "../types/colors";

type Props = {
    color: TWColors
    className?: string,
    opacity?:25|50|75|100
}

const Shade: React.FC<Props> = ({ color,opacity = 75, className }) => {

    const bgStyle = cl(applyColor(color, "bg", 9));
    const shadeOpacity = cl(`opacity-${opacity}`);
    const defaultStyle = cl("absolute inset-0");
    const style = cls(bgStyle, shadeOpacity, defaultStyle, className || "");
    return (
        <div {...style}></div>
    )
}

export default Shade;