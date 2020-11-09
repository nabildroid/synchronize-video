import React, { createContext, useContext, useEffect, useReducer } from "react"
import MessagesAction from "../actions/messagesAction"
import { IMessagesProvider, MessagesStateInit } from "../models/message_model"
import { Message, MessageBody, MessageReactions, MessageType } from "../types/message_type"
import { DataFlowTypes, SendDataType } from "../types/P2P_node_API"
import { AppContext } from "./appContext"
import { P2PContext } from "./p2pContext"



export const MessagesContext = createContext<IMessagesProvider>(null)

const MessagesProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(MessagesAction, MessagesStateInit)
    const { p2p } = useContext(P2PContext);
    const { user } = useContext(AppContext);

    useEffect(initListeners, []);
    useEffect(processRowMessages, [state.row_messages]);

    function processRowMessages() {

    }

    function initListeners() {
        const unsubscribe = [
            p2p.listenTo(DataFlowTypes.MESSAGE, ({ sender, payload }) => {
                console.log("<<<<===== P2P new Message")
                dispatch({ type: "add_new_messages", payload: payload as Message[] })
            })
        ];

        return () => unsubscribe.forEach(f => f());
    }


    function send() {
        const message = createMessage({ type: MessageType.TEXT, content: state.draft });
        p2p.send(message).then(() => setDraft(""));
    }

    function sendReaction(reaction: MessageReactions) {
        const message = createMessage({ type: MessageType.REACTION, content: reaction });
        p2p.send(message)
    }

    function createMessage(msg: MessageBody) {
        return {
            target: "all",
            type: DataFlowTypes.MESSAGE,
            payload: [{
                user,
                duration: {
                    minute: 1,
                    secoud: 12,
                    toTimestemp: () => 12
                },
                body: msg
            }]
        } as SendDataType
    }

    const setDraft = (val: string) => {
        dispatch({ type: "set_draft", payload: val });
    }



    const values = {
        ...state,
        setDraft,
        send,
        sendReaction
    }
    return (
        <MessagesContext.Provider value={values}>
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesProvider