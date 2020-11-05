import React from "react"
import { TWColors } from "../types/colors";
import applyColor from "../utils/applyColor";

type Props = {
    type?: "text" | "circle" | "progress"
    primaryColor?: TWColors,
    secondaryColor?: TWColors,
    progress?: number,
    topFixed?: boolean,
    center?: boolean,
    isRelative?: boolean,
    heightScreen?: boolean,
}

const Loading: React.FC<Props> = ({ type = "text", topFixed = false, heightScreen = false, isRelative = false, center = false, primaryColor = TWColors.INDIGO, secondaryColor = TWColors.WHITE, progress = 0 }) => {
    switch (type) {
        case "text":
            return <div className={`${isRelative ? "relative" : ""} flex ${center ? "justify-center items-center w-full " + (heightScreen ? "h-screen" : "h-full") : ""}`}>
                <p
                    className={`${applyColor(primaryColor, "text", 6)} text-sm font-bold tracking-wide leading-loose px-2`}
                >Loading</p>
            </div>
        case "progress":
            return <div className={`${topFixed ? "z-20 fixed top-0 left-0" : ""} w-full  ${applyColor(secondaryColor, "bg", 1)}`}>
                <div
                    className={` ${isRelative ? "relative" : ""} rounded-br-md rounded-tr-md h-1 shadow-sm ${applyColor(primaryColor, "bg", 6)}`}
                    style={{ width: `${progress * 100}%` }}
                />
            </div>
    }
}


export default Loading;