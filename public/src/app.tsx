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
    const { user, loading } = useContext(AppContext)
    if (loading)
        return <h2>loading</h2>

    return (
        <div>
            <Router>
                <Switch>

                    <Route path="/join/:id" exact component={params => {
                        return !user ?
                            (
                                <JoinProvider>
                                    <JoinView />
                                </JoinProvider>
                            ) : <Redirect to={"/room/" + params.match.params.id} />
                    }} />

                    <Route path="/room/:id" exact component={params => {
                        return user ?
                            (
                                <P2PProvider>
                                    <RoomProvider>
                                        <RoomView />
                                    </RoomProvider>
                                </P2PProvider>
                            ) : <Redirect to={"/join/" + params.match.params.id} />
                    }} />

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