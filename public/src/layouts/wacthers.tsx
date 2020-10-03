import React from "react"
import Label from "../components/label"
import UserLabel from "../components/userLabel"
import { TWColors } from "../types/colors"

type Props = {
    names: string[]
}

const Watchers: React.FC<Props> = ({ names }) => {
    return (
        <div className="md:max-w-sm lg:max-w-md px-2 mx-auto space-y-1">
            <Label name="watchers" htmlFor="watchers" />
            <ul id="watchers" className="flex items-center pb-2 space-x-2 overflow-x-scroll">
                {names.map(name => (
                    <li>
                        <UserLabel text={name} color={TWColors.INDIGO} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Watchers;