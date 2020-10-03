import React, { useState } from 'react'
import JoinTitle from '../components/joinTitle'
import NameInput from '../components/nameInput'
import Button from '../components/button'
import cl, { cls } from '../utils/cls'
import Shade from '../components/shade'
import { TWColors } from '../types/colors'

type Props = {
    showForPhone?: boolean;
    submit: (name: string) => void;
    hidePhoneLogin()
}

const Join: React.FC<Props> = ({ showForPhone = false, submit,hidePhoneLogin }) => {
    const [name, setName] = useState("Nabil");
    const styleShowForPhone = cl({ "hidden": !showForPhone })
    const styleDefault = cl("md:pb-8 md:relative md:block fixed inset-0 z-10 flex items-end px-1")

    const onSubmit = e => { e.preventDefault(); submit(name) };
    return (
        <div {...cls(styleShowForPhone, styleDefault)}>
            <Shade 
                color={TWColors.GRAY}
                className="md:hidden z-0" 
                click={hidePhoneLogin}
            />
            <form
                onSubmit={onSubmit}
                className="md:pb-0 md:bg-transparent info md:max-w-sm lg:max-w-md z-10 w-full px-2 pb-12 mx-auto space-y-4 bg-white rounded-t-lg"
            >
                <JoinTitle name={name} />
                <div className="space-y-3">
                    <NameInput name={name} setName={setName} />
                    <Button type="submit" text="Join" fullwith={true} textSize="lg" />
                </div>
            </form>
        </div>
    )
}


export default Join;