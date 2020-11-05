import React from "react"
import { TWColors } from "../types/colors"
import cl, { cls } from "../utils/cls"
import SVGS from "../assets/svgs/svgs";
import applyColor from "../utils/applyColor";



export type SvgList = keyof typeof SVGS;
type Props = {
    size?: number,
    color?: TWColors,
    weight?: number,
    className?: string,
    type?: SvgList
}

export type SvgFC = React.FC<Props>;


const Svg: SvgFC = ({ color = TWColors.BLACK, type = null, className = "", size = 4, weight = 2, children }) => {

    const sizeStyle = cl(`w-${size}`, `h-${size}`);
    const colorStyle = cl(applyColor(color, "text", 5))
    const animationStyle = cl({
        "animate-spin": type == "Loading"
    });
    const style = cls(colorStyle, sizeStyle, animationStyle, className);


    return (
        <svg {...style} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={type == "Loading" ? 1 : weight} strokeLinecap="round" strokeLinejoin="round">
            {
                children ? children : (() => {
                    if (type) {
                        const SelectedSvg = SVGS[type]
                        return <SelectedSvg />
                    }

                })()
            }
        </svg>
    )
}

export default Svg;