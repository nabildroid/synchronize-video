import React, { useState } from 'react'
import JoinTitle from '../components/joinTitle'
import NameInput from '../components/nameInput'
import Button from '../components/button'
import cl, { cls } from '../utils/cls'

type Props = {
    showForPhone: boolean;
}

const Join: React.FC<Props> = ({ showForPhone }) => {
    const [name, setName] = useState("Nabil");
    const styleShowForPhone = cl({ "hidden": !showForPhone })
    const styleDefault = cl("md:pb-8 md:relative md:block fixed inset-0 z-10 flex items-end px-1")
    return (
        <div {...cls(styleShowForPhone, styleDefault)}>
            <div className="md:hidden absolute inset-0 z-0 bg-gray-900 opacity-50" />
            <div className="md:pb-0 md:bg-transparent info md:max-w-sm lg:max-w-md z-10 w-full px-2 pb-12 mx-auto space-y-4 bg-white rounded-t-lg">
                <JoinTitle name={name} />
                <div className="space-y-3">
                    <NameInput name={name} setName={setName} />
                    <Button text="Join" fullwith={true} click={() => { }} textSize="lg" />
                </div>
            </div>
        </div>
    )
}


export default Join;