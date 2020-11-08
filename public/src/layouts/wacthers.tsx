import React from "react"
import Label from "../components/label"
import UserLabel from "../components/userLabel"
import { TWColors } from "../types/colors"
import { Guest } from "../types/user_type"

type Props = {
    guests: Guest[],
}

const Watchers: React.FC<Props> = ({ guests, children }) => {
    return (
        /* TODO the view should manage the max width and margin not this layout
        * layout should only mange their children
        */
        <div className="w-full px-2 space-y-1" >
            <Label name="watchers" htmlFor="watchers" />
            <ul id="watchers" className="flex items-center pb-2 space-x-2 overflow-x-scroll">
                {children}
                {guests.sort(
                    (a, b) => (b.isAuthor ? 1 : 0) - (a.isAuthor ? 1 : 0)
                ).map(({ id, name, isAuthor }) => (
                    // TODO use user id
                    <li key={id}>
                        <UserLabel text={name} color={isAuthor ? TWColors.INDIGO : TWColors.GRAY} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Watchers;