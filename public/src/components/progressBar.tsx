import React from "react"
import { TWColors } from "../types/colors"
import applyColor from "../utils/applyColor"
import cl from "../utils/cls"

type Props = {
    progress: number
}


const ProgressBar: React.FC<Props> = ({ progress }) => {

    // TODO crop the progress value to be between 0 and 100
    const floatProgress = 100 * (progress > 1 ? 1 / progress : progress);

    const backgroundColor = applyColor(TWColors.INDIGO, "bg", 3);
    const progressColor = applyColor(TWColors.INDIGO, "bg", 7);

    return (
        <div className={`w-full py-1 ${backgroundColor} `}>
            <div className={`w-1/3 h-3 text-right ${progressColor}`}
                style={{width:`${floatProgress}%`}}
            >
                <span className={`inline-block p-3 rounded-full -mr-2 -mt-2 ${progressColor}`}>

                </span>
            </div>
        </div>
    )
}

export default ProgressBar;