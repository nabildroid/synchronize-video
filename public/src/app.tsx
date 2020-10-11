import React from "react"
import AppProvider from "./contexts/appContext"
import ServerProvider from "./contexts/serverContext"
import JoinView from "./views/join_view"
const App = () => {
    return (
        <div>
            <JoinView />

        </div>
    )
}




export default (
    <ServerProvider>
        <AppProvider>
            <App />
        </AppProvider>
    </ServerProvider>
)