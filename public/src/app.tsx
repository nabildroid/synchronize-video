import React from "react"
import Button from "./components/button";

const App = () => {

    const [num, setNum] = React.useState<number>(0);

    const increment = () => {
        setNum(num + 1);
    }
    return (
        <div>
            <h2 className="text-lg text-green-500">{num.toString()}</h2>
            <Button text="Hello world" fullwith={!!(num % 5)} textSize="xs" click={increment} />
        </div>
    )

}


export default App