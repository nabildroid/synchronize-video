import React, { useEffect, useState } from "react"

const useLocalStorage = function <T>(key: string) {

    const [state, setState] = useState<T>(
        JSON.parse(localStorage.getItem(key)) as T
    )

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state])

    return [state, setState] as [T, React.Dispatch<React.SetStateAction<T>>]
}
export default useLocalStorage;