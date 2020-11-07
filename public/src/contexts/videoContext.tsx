import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useHistory } from "react-router-dom"
import videoAction from "../actions/videoAction"
import P2P from "../connections/p2p"
import { IvideoProvider, VideoStateInit } from "../models/video_model"
import { DataFlowTypes } from "../types/P2P_node_API"
import { Duration, VideoData, VideoState, VideoType } from "../types/video_type"
import { AppContext } from "./appContext"
import { P2PContext } from "./p2pContext"
import { RoomContext } from "./roomContext"



export const VideoContext = createContext<IvideoProvider>(null)

const VideoProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(videoAction, VideoStateInit);
    const { p2p } = useContext(P2PContext);
    const { authorUser, watchersUsers } = useContext(RoomContext);
    const { newRoom } = useContext(AppContext)
    const { push } = useHistory();

    useEffect(initListeners, []);

    useEffect(askAuthorForVideoWhenItUnavailable, [authorUser]);

    useEffect(startTheVideoWhenWatchersCome, [watchersUsers, authorUser]);


    function startTheVideoWhenWatchersCome() {
        const authorWaitingForWatchers = authorUser == "currentUser" && state.state == VideoState.WAITING;

        if (authorWaitingForWatchers && watchersUsers.length) {
            console.log("watchers users", watchersUsers);
            // the video state now is on waiting whitch means unresponsive.
            // after the watchers come, we should give the author the option to play it whenever he want
            // when video state is paused, the video becomes responsive to play action
            pause();
        }
    }


    function initListeners() {
        const unsubscribe = [
            p2p.listenTo(DataFlowTypes.USER_POSITION, ({ sender, payload }) => {
                dispatch({
                    type: "user_position", payload: {
                        position: payload as Duration,
                        user: sender
                    }
                })
                console.log("<<<<===== P2P UserPosition")

            }),

            p2p.listenTo(DataFlowTypes.VIDEO_STATE, ({ sender, payload }) => {
                if (sender.isAuthor)
                    dispatch({ type: "set_state", payload: payload as VideoState });
                console.log("<<<<===== P2P videoState")
            }),

            p2p.listenTo(DataFlowTypes.VIDEO_DATA, ({ sender, payload }) => {
                if (sender.isAuthor)
                    dispatch({ type: "load_video", payload: payload as VideoData });
                console.log("<<<<===== P2P videoData")
            }),

            p2p.listenTo(DataFlowTypes.VIDEO_LENGTH, ({ sender, payload }) => {
                if (sender.isAuthor)
                    dispatch({ type: "set_length", payload: payload as Duration });
                console.log("<<<<===== P2P videoLength")
            })
        ];

        return () => unsubscribe.forEach(f => f());
    }

    function askAuthorForVideoWhenItUnavailable() {
        if (authorUser && !state.data) {
            dispatch({ type: "loading_on" })
            // get the video either from the p2p or AppContext
            if (typeof authorUser == "object") {
                console.log("getting the video from the Author")
                authorUser.getVideo().then(video =>
                    dispatch({ type: "load_video", payload: video })
                );
            } else if (authorUser == "currentUser" && newRoom) {
                console.log("getting the video from the App Context")

                dispatch({ type: "load_video", payload: newRoom.video });
            } else push("/")
        }
    }

    const toggleController = () => {
        if (state.controller)
            dispatch({ type: "controller_off" })
        else dispatch({ type: "controller_on" })
    }

    const setLength = (length: Duration) => {
        dispatch({ type: "set_length", payload: length })
    }

    const playTo = (time: Duration) => {
        p2p.send({
            target: "all",
            type: DataFlowTypes.USER_POSITION,
            payload: time
        }).then(() =>
            dispatch({ type: "update_position", payload: time })
        );
    }

    const pause = () => {
        console.log("video paused");

        p2p.send({
            target: "all",
            type: DataFlowTypes.VIDEO_STATE,
            payload: VideoState.PUASED
        }).then(() =>
            dispatch({ type: "set_state", payload: VideoState.PUASED })
        );
    }

    const play = () => {
        p2p.send({
            target: "all",
            type: DataFlowTypes.VIDEO_STATE,
            payload: VideoState.PLAYIED
        }).then(() =>
            dispatch({ type: "set_state", payload: VideoState.PLAYIED })
        );
    }

    const values = {
        ...state,
        toggleController,
        setLength,
        playTo,
        play,
        pause
    }

    return (
        <VideoContext.Provider value={values}>
            {children}
        </VideoContext.Provider>
    )
}

export default VideoProvider