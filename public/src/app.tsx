import React, { useContext } from "react"
import AppProvider, { AppContext } from "./contexts/appContext"
import ServerProvider from "./contexts/serverContext"
import JoinView from "./views/join_view"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import P2PProvider from "./contexts/p2pContext";
import RoomView from "./views/room_view";
import JoinProvider from "./contexts/joinContext";
import RoomProvider from "./contexts/roomContext";



const App = () => {
    const { loading } = useContext(AppContext)
    if (loading)
        return <h2>loading</h2>

    return (
        <div>
            <Router>
                <Switch>

                    <Route path="/join/:id" exact >
                        <JoinProvider>
                            <JoinView />
                        </JoinProvider>
                    </Route>

                    <Route path="/room/:id" exact >
                        <P2PProvider>
                            <RoomProvider>
                                <RoomView />
                            </RoomProvider>
                        </P2PProvider>
                    </Route>

                    <Redirect to="/" />
                </Switch>
            </Router>

        </div >
    )
}




export default (
    <ServerProvider>
        <AppProvider>
            <App />
        </AppProvider>
    </ServerProvider>
)