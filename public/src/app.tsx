import React from "react"

const App = ()=> {

    const [num, setNum] = React.useState<number>(0);

    return (
        <div>
            <h2 className="text-lg text-green-500">{num.toString()}</h2>
            <button 
                className="px-4 py-1 text-sm font-bold text-white bg-indigo-500 rounded-full"
                onClick={()=>setNum(num + 1)}
            >
                +1
            </button>
        </div>
    )

}


export default App