import React from "react"
import ImageBackground from "../components/imageBackground";
import Shade from "../components/shade";
import { TWColors } from "../types/colors";

type Props = {
    title: string
}

const JoinBackground: React.FC<Props> = ({ title }) => {

    return (
        <div>
            <ImageBackground src="./image.jpg" />
            <Shade color={TWColors.BLACK} opacity={50} />
            <div className="md:max-w-lg lg:max-w-xl relative flex flex-col items-center justify-start max-w-xs -mt-3">
                <p className="text-md md:text-2xl lg:text-3xl font-medium text-gray-400">Watch with your friends</p>
                <h1 className="md:text-4xl lg:text-5xl md:leading-tight pt-2 text-2xl font-medium leading-tight text-center text-indigo-100">
                    {title}
                </h1>
            </div></div>
    )
}

export default JoinBackground;