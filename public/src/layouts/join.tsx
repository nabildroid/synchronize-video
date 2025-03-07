import React, { useContext, useEffect, useState } from 'react'
import JoinTitle from '../components/joinTitle'
import NameInput from '../components/nameInput'
import Button from '../components/button'
import cl, { cls } from '../utils/cls'
import Shade from '../components/shade'
import { TWColors } from '../types/colors'
import { JoinContext } from '../contexts/joinContext'
import { AppContext } from '../contexts/appContext'

type Props = {
    showForPhone?: boolean;
    author: string
    hidePhoneLogin()
}

const Join: React.FC<Props> = ({ author, showForPhone = false, hidePhoneLogin }) => {
    const [name, setName] = useState("");
    const styleShowForPhone = cl({ "hidden": !showForPhone })
    const styleDefault = cl("md:relative md:block fixed inset-0 z-10 flex items-end")
    const { submitName, loading_submit, error, watchers } = useContext(JoinContext)
    const { user } = useContext(AppContext);

    useEffect(() => {
        if (!name && user)
            setName(user.name);
    }, [user])
    
    const onSubmit = e => {
        e.preventDefault();
        submitName(name)
    };

    return (
        <div {...cls(styleShowForPhone, styleDefault)}>
            <Shade
                color={TWColors.GRAY}
                className="md:hidden z-0"
                click={hidePhoneLogin}
            />
            <form
                onSubmit={onSubmit}
                className="md:py-0 md:pb-0 sm:mb-0 sm:pb-12 md:bg-transparent info md:max-w-sm lg:max-w-md md:-mb-0 z-10 w-full max-h-full px-2 py-8 pb-16 mx-auto -mb-5 space-y-4 overflow-y-auto bg-white rounded-t-lg"
            >
                <JoinTitle name={author} />
                <div className="space-y-3">
                    <NameInput
                        name={name}
                        setName={setName}
                        isError={!!error}
                        excludeRandomNames={watchers.map(e => e.name)}
                    />
                    {
                        loading_submit ?
                            <Button type="button" icon="Loading" iconSize={5} text="" fullwith={true} textSize="sm" className="py-2" />
                            :
                            <Button type="submit" text="Join" fullwith={true} textSize="lg" />
                    }
                </div>
            </form>
        </div>
    )
}


export default Join;