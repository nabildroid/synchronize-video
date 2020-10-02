import React from "react"
import { BreakPoints } from "../types/general";

const UseMediaQuery = (): BreakPoints => {
    const [width, setWidth] = React.useState(window.innerWidth);

    const ReactToWindowSizing = React.useCallback((e: UIEvent) => {
        const target = e.target as Window;
        // console.log("hello",e);
        setWidth(target.innerWidth);
    }, []);

    React.useEffect(() => {
        window.addEventListener("resize", ReactToWindowSizing);
        return () => window.removeEventListener("resize", ReactToWindowSizing);
    }, [])

    if (width <= 640)
        return "sm";
    else if (width <= 768)
        return "md"
    else if (width <= 1024)
        return "lg"
    else
        return "xl"
}

export default UseMediaQuery;