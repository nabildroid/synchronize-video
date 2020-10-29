import React from "react"
import { cls } from "../utils/cls";
type Props = {
    name: string
    htmlFor?: string
}

const Label: React.FC<Props> = ({ name, htmlFor }) => {

    const defaultStyle = "block text-sm text-gray-600 font-sans";

    return (
        <label {...cls(defaultStyle)} htmlFor={htmlFor}>
            {name}
        </label>
    )
}
export default Label