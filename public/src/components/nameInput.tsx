import React, { useEffect, useState } from "react";
import RandomName from "../utils/randomName";
import Label from "./label";
import Svg from "./svg";
import { TWColors } from "../types/colors";
import cl from "../utils/cls";

type Props = {
    name: string,
    setName(val: string),
    isError: boolean
}

const NameInput: React.FC<Props> = ({ name, setName, isError }) => {

    const [error, setError] = useState(false);

    useEffect(() => {
        if (isError && !error) {
            setError(true);
            const timer = setTimeout(() => setError(false), 2000);
            // TODO clearTimeout timer
        }
    }, [isError]);

    const insertRandomName = () => {
        setName(RandomName());
    }
    const textStyle = cl({
        "text-indigo-700": !error,
        "text-red-700": error,
    })

    return (<div className="space-y-1">
        <Label name="name" htmlFor="input-name" />
        <div className="flex items-stretch justify-between bg-indigo-100 rounded-md">
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                className={`${textStyle.toString()} text-md flex-1 h-10 px-2 font-medium tracking-wider  bg-transparent outline-none`} placeholder="enter your name" type="text" id="input-name"
            />
            <button
                onClick={insertRandomName}
                className="rounded-r-md hover:bg-indigo-100 flex items-center px-3 bg-indigo-200"
                type="button"
            >
                <Svg type="Random" size={6} color={TWColors.INDIGO} />
            </button>
        </div>
    </div>
    )
}

export default NameInput;