import React, { useContext } from "react"
import AppProvider, { AppContext } from "./contexts/appContext"
import ServerProvider from "./contexts/serverContext"
import JoinView from "./views/join_view"
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import P2PProvider from "./contexts/p2pContext";
import RoomView from "./views/room_view";
import JoinProvider from "./contexts/joinContext";
import RoomProvider from "./contexts/roomContext";



const App = () => {
    // const {} = useContext(AppContext)
    return (
        <div>
            <Router>
                <Route path="/join">
                    <JoinProvider>
                        <JoinView />
                    </JoinProvider>
                </Route>
                <Route path="/room">
                    <P2PProvider>
                        <RoomProvider>
                            <RoomView />
                        </RoomProvider>
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