import React, { FormEvent, SyntheticEvent } from "react"

type Props = {
    className: string,
    submit(vals: Object)
}


const Form: React.FC<Props> = ({ className, submit, children }) => {

    const onSubmit: (e: SyntheticEvent) => void = e => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data: Object = {};
        formData.forEach((val, key) => {
            data[key] = val;
        })
        submit(data);
    }

    return (
        <form className={className} onSubmit={onSubmit}>
            {children}
        </form>
    )
}

export default Form;





