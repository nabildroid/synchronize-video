import React, { useState } from "react"
import { useDebounce, useDebouncedCallback } from "use-debounce/lib"
import { TWColors } from "../types/colors"
import { Duration } from "../types/video_type"
import applyColor from "../utils/applyColor"
import cl from "../utils/cls"

type Props = {
    progress: number,
    playTo: (progress: number) => void
}


const ProgressBar: React.FC<Props> = ({ progress, playTo }) => {

    // TODO crop the progress value to be between 0 and 100
    const floatProgress = 100 * (progress > 1 ? 1 / progress : progress);

    const backgroundColor = applyColor(TWColors.INDIGO, "bg", 3);
    const progressColor = applyColor(TWColors.INDIGO, "bg", 7);

    // TODO start with the current progress
    const [hoverPosition, setHoverPosition] = useState<number>(0);
    const [debouncedHoverPosition] = useDebounce(hoverPosition, 350);
    const [isHoverActive, setIsHoverActiver] = useState(false);

    const handleMouseMovement = (event: React.MouseEvent) => {
        if (isHoverActive) {
            const parent = (event.target as HTMLDivElement).getBoundingClientRect()
            const offsetLeft = parent.x;
            // TODO use debouncer
            const x = event.pageX - offsetLeft;
            if (x > 1 && x < floatProgress / 100 * parent.width)
                setHoverPosition(x / parent.width);
        }
    };

    const handleMouseLeave = () => {
        setIsHoverActiver(false);
    }

    const handlePlayToButton = () => {
        playTo(debouncedHoverPosition);
    }

    return (
        <div className="w-full pt-3"
            onMouseEnter={() => setIsHoverActiver(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMovement}
        >
            <div className={`w-full ${backgroundColor} relative`}>
                {isHoverActive &&
                    <button
                        className={`absolute p-2 rounded-full bg-red-800 opacity-75`}
                        style={{ top: "-8px", left: `${debouncedHoverPosition * 100}%` }}
                        onClick={handlePlayToButton}
                    />
                }

                <div className={`w-1/3 h-1 ${progressColor} transition duration-300 ease-out`}
                    style={{ width: `${floatProgress}%` }}
                >
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;