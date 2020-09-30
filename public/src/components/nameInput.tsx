import React from "react";
import RandomName from "../utils/randomName";
import Label from "./label";

type Props = {

}

const NameInput = ({ }: Props): [JSX.Element, string] => {

    const [name, setName] = React.useState("");
    const insertRandomName = () => {
        setName(RandomName());
    }

    return [
        (
            <div className="space-y-1">
                <Label name="name" htmlFor="input-name" />
                <div className="flex items-stretch justify-between bg-indigo-100 rounded-md">
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="text-md flex-1 h-10 px-2 font-medium tracking-wider text-indigo-700 bg-transparent outline-none" placeholder="enter your name" type="text" id="input-name"
                    />
                    <button
                        onClick={insertRandomName}
                        className="rounded-r-md hover:bg-indigo-100 flex items-center px-3 bg-indigo-200"
                    >
                        <svg className="w-6 h-6 text-indigo-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="5.5" cy="11.5" r="4.5"></circle>
                            <circle cx="18.5" cy="11.5" r="4.5"></circle>
                            <line x1="5.5" y1="16" x2="18.5" y2="16"></line>
                        </svg>
                    </button>
                </div>
            </div>
        ), name]
}

export default NameInput;