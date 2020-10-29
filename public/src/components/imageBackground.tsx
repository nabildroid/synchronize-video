import React from "react"
import { cls } from "../utils/cls"

type Props = {
    src: string
}

const ImageBackground: React.FC<Props> = ({ src }) => {

    const style = cls("absolute bg-cover bg-top inset-0");
    const background = { "backgroundImage": `url('${src}')` };
    return (
        <div {...style} style={background}></div>
    )
}

export default ImageBackground;