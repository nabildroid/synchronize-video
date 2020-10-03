import React, { useEffect, useRef, useState } from "react"
import Watchers from "./layouts/wacthers"
import TextMessage from "./layouts/messages/textMessage";
import EmojiMessage from "./layouts/messages/emojiMessage";
import { MessageReactions, MessageType } from "./types/message_type";
import { TimelineMessages } from "./models/message_model";
import Dot from "./components/messageDot";
import MessagesList from "./layouts/messages/messagesList";
import UseMediaQuery from "./hooks/useMediaQuery";
import * as WriteMessage from "./layouts/messages/writeMessage";
import Messages from "./layouts/messages";
import EmojisBlock from "./layouts/emojisBlock";
import Join from "./layouts/join";
import JoinBackground from "./layouts/joinBackground";
import VideoWrapper from "./layouts/videoWrapper";
const App = () => {
    const bearkPoint = UseMediaQuery()



    return (
        <div>
            <JoinBackground title="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut" />
            <Join />
            <VideoWrapper>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima obcaecati tenetur sequi impedit exercitationem voluptas? Expedita minima explicabo fuga necessitatibus facere suscipit similique enim mollitia, at libero, soluta totam. Aliquam?
            </VideoWrapper>
            <EmojisBlock click={type => console.log(type)} />
            <Watchers names={["nabil", "droid", "test", "hello world"]} />
            <TextMessage
                content="suscipit laboriosam totam magni, excepturi cum dolorem dignissimos nobis! Facilis provident nemo fugiat repudiandae doloremque."
                user="Nabil"
            />
            <Dot />
            <EmojiMessage user="hello world" emoji={MessageReactions.SAD} />

            <br />
            <br />
            <br />
            <Messages />


        </div>
    )
}




export default App