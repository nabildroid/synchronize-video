import React from "react";
import Button from "../../components/button";
import Label from "../../components/label";
import Form from "../../components/form";


type Props = {
    text: string,
    setText(val: string)
}

export const WithLabel: React.FC<Props> = ({ text, setText }) => {

    return (
        <Form submit={() => { }} className="space-y-1">
            <Label name="Write message" htmlFor="write-message-input" />
            <textarea id="write-message-input"
                value={text}
                onChange={e => setText(e.target.value.trimLeft())}
                placeholder="write your  message" rows={3} className="font-meduim w-full p-2 text-lg leading-tight text-indigo-900 bg-indigo-100 rounded-md outline-none"
            ></textarea>
            <div className="flex justify-end">
                <Button text="send" type="submit" />
            </div>
        </Form>
    )
}
export const WithoutLabel: React.FC<Props> = ({ text, setText }) => {

    return (
        <Form submit={() => { }} className="lg:bg-white flex items-end justify-between px-2 py-2 space-x-2 bg-indigo-100 rounded-lg shadow-lg">
            <textarea
                value={text}
                onChange={e => setText(e.target.value.trimLeft())}
                rows={3} className="md:block lg:text-md hidden w-full p-2 text-sm leading-tight bg-transparent outline-none" placeholder="enter your message"
            ></textarea>
            <input
                value={text}
                onChange={e => setText(e.target.value.trimLeft())}
                placeholder="enter your message" className="md:hidden inline-block w-full p-2 text-sm leading-tight bg-transparent outline-none" type="text"
            />
            <Button text="send" type="submit" />
        </Form>

    )
}

