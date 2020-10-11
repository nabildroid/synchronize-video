import React from "react"
import AppProvider from "./contexts/appContext"
import ServerProvider from "./contexts/serverContext"
import JoinView from "./views/join_view"
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import P2PProvider from "./contexts/p2pContext";
import RoomView from "./views/room_view";



const App = () => {
    return (
        <div>
            <Router>
                <Route path="/join">
                    <JoinView />
                </Route>
                <Route path="/room">
                    <P2PProvider>
                        <RoomView />
                    </P2PProvider>
                </Route>

                <Redirect from="*" to="/join" />
            </Router>

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