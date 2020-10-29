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
        <div className={`w-full ${backgroundColor} `}>
            <div className={`w-1/3 h-1 ${progressColor} transition duration-300 ease-out`}
                style={{ width: `${floatProgress}%` }}
            >
            </div>
        </div>
    )
}

export default ProgressBar;