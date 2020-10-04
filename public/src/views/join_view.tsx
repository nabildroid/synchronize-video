import React, { useState } from "react"
import JoinBackground from "../layouts/joinBackground"
import ShareLink from "../components/shareLink"
import Join from "../layouts/join"
import Watchers from "../layouts/wacthers"
import Button from "../components/button"


type Props = {

}
const JoinView: React.FC<Props> = ({ }) => {
    const [phoneShowLogin, setPhoneShowLogin] = useState(true)

    return (
        <div className="md:flex-row flex flex-col w-full min-h-screen">
            <div className="md:h-screen md:w-1/2 md:max-w-none lg:max-w-xl relative flex items-center justify-center h-56 bg-green-500">
                <JoinBackground image="http://localhost/image.jpg" title="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut" />
            </div>

            <div className=" z-10 flex-auto bg-white">
                <div className="md:hidden flex">
                    <div className="mx-auto -mt-4">
                        <ShareLink url="http://localhost/vsync-join.html" />
                    </div>
                </div>
                <div className="flex flex-col min-h-full">
                    <div className="md:py-8">
                        <Join showForPhone={phoneShowLogin} submit={() => { }} hidePhoneLogin={() => setPhoneShowLogin(false)} />
                    </div>
                    <div className="md:bg-indigo-100 flex-1">
                        <div className="md:mt-4 md:max-w-sm lg:max-w-md mx-auto mt-4">
                            <Watchers names={["nabil", "test", "hello world"]}>
                                <Button
                                    className="md:hidden shadow"
                                    icon="Join"
                                    text="join"
                                    textSize="md"
                                    click={() => setPhoneShowLogin(true)}
                                />
                            </Watchers>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default JoinView