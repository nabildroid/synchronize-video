import React from "react"
import Label from "../components/label"
import UserLabel from "../components/userLabel"
import { TWColors } from "../types/colors"

type Props = {
    names: string[],
}

const Watchers: React.FC<Props> = ({ names, children }) => {
    return (
        /* TODO the view should manage the max width and margin not this layout
        * layout should only mange their children
        */
        <div className="w-full px-2 space-y-1" >
            <Label name="watchers" htmlFor="watchers" />
            <ul id="watchers" className="flex items-center pb-2 space-x-2 overflow-x-scroll">
                {children}
                {names.map(name => (
                    // TODO use user id
                    <li key={name}>
                        <UserLabel text={name} color={TWColors.INDIGO} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Watchers;