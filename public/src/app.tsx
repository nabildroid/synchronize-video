import React, { useContext } from "react"
import AppProvider, { AppContext } from "./contexts/appContext"
import ServerProvider from "./contexts/serverContext"
import JoinView from "./views/join_view"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import P2PProvider from "./contexts/p2pContext";
import RoomView from "./views/room_view";
import JoinProvider from "./contexts/joinContext";
import RoomProvider from "./contexts/roomContext";
import Loading from "./components/loading";
import NewRoomView from "./views/newRoom_view";


const App = () => {
    const { loading } = useContext(AppContext)

    if (loading)
        return <Loading center={true} heightScreen={true} />

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <NewRoomView />
                </Route>

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
    )
}




export default (
    <ServerProvider>
        <AppProvider>
            <App />
        </AppProvider>
    </ServerProvider>
)