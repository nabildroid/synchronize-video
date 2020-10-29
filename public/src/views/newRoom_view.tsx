import React, { useContext, useState } from "react"
import Button from "../components/button";
import Label from "../components/label";
import { AppContext } from "../contexts/appContext";

type Props = {

}

const NewRoomView: React.FC<Props> = ({ }) => {
    const UserName = user && user.name;

    const [name, setName] = useState<string>("");
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const [background, setBackground] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFormSubmition = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.length && video.length && background.length && (UserName || name.length)) {
            setLoading(true);
            setLoading(false);
        }
    }
    return (
        <div >
            <h1 className="text-2xl">
                Create new room
            </h1>
            {
                UserName &&
                <p className="text-lg">
                    Hello <span className="font-semibold text-indigo-700">
                        {UserName}
                    </span>
                </p>
            }
            <form onSubmit={handleFormSubmition}>
                {
                    !UserName &&
                    <div>
                        <Label name="Name" />
                        <input type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                }

                <div>
                    <Label name="Title" />
                    <input type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <Label name="Video" />
                    <input type="text"
                        value={video}
                        onChange={e => setVideo(e.target.value)}
                    />
                </div>
                <div>
                    <Label name="Background" />
                    <input type="text"
                        value={background}
                        onChange={e => setBackground(e.target.value)}
                    />
                </div>


                <Button
                    text={loading ? "loading" : "create"}
                    type={loading ? "button" : "submit"}
                />
            </form>

        </div>
    )
}
export default NewRoomView
