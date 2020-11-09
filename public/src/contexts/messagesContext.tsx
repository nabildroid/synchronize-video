import React, { createContext, useContext, useEffect, useReducer } from "react"
import MessagesAction from "../actions/messagesAction"
import { IMessagesProvider, MessagesStateInit } from "../models/message_model"
import { Message, MessageBody, MessageReactions, MessageType, TimelineMessages } from "../types/message_type"
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
        const sorted_row_messages = Array.from(state.row_messages).sort((a, b) => a.duration.toTimestemp() - b.duration.toTimestemp())
        const blocks = [sorted_row_messages.splice(0, 1)];

        sorted_row_messages.forEach(m => {
            const lastIndex = blocks.length - 1;
            if (
                blocks[lastIndex] == null ||
                calcBlockLength(blocks[lastIndex]) > 2000 ||
                m.duration.toTimestemp() - Array.from(blocks[lastIndex]).pop().duration.toTimestemp() > 1000
            ) {
                blocks.push([m])
            } else blocks[lastIndex].push(m)
        })

        const timeLine: TimelineMessages = [];

        let i = 0;
        blocks.forEach((block, index) => {
            if (index != 0) {
                const lastMessageTime = block[block.length - 1].duration
                const prevBlockLastMessageTime = Array.from(blocks[index - 1]).pop().duration
                const distanceLengthFromPrevBlock = lastMessageTime.toTimestemp() - prevBlockLastMessageTime.toTimestemp();

                if (distanceLengthFromPrevBlock > 1000) {
                    if (distanceLengthFromPrevBlock < 3000)
                        timeLine.push({
                            id: i++,
                            type: "time",
                            payload: prevBlockLastMessageTime
                        })
                    else if (distanceLengthFromPrevBlock < 10000) {
                        timeLine.push({
                            id: i++,
                            type: "dot",
                        })
                        timeLine.push({
                            id: i++,
                            type: "time",
                            payload: prevBlockLastMessageTime
                        })
                    } else {
                        timeLine.push({
                            id: i++,
                            type: "dot",
                        })
                        timeLine.push({
                            id: i++,
                            type: "dot",
                        })
                        timeLine.push({
                            id: i++,
                            type: "time",
                            payload: prevBlockLastMessageTime
                        })
                    }
                }
                block.forEach(msg => timeLine.push({
                    id: i++,
                    payload: msg,
                    type: "message"
                }))
            }
        });

        dispatch({ type: "set_timeline_messages", payload: timeLine })

        function calcBlockLength(block: Message[]) {
            return block.reduce((acc, val, index) => {
                return index == 0 ? acc : val.duration.toTimestemp() - block[index - 1].duration.toTimestemp()
            }, 0);
        }

        console.log(blocks);
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
        const time = Date.now();
        return {
            target: "all",
            type: DataFlowTypes.MESSAGE,
            payload: [{
                user,
                duration: {
                    minute: Math.floor(time / 1000 / 60) % 60,
                    secoud: Math.floor(time / 1000) % 60,
                    toTimestemp: () => time
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