import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import TextField from '@mui/material/TextField';


type PropsType = {
    title: string,
    callBack: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

const Input:React.FC<PropsType> = ({
    title,
    callBack,
    onKeyDown

                                   }) => {


    return (
<>

        <TextField value={title} onKeyDown={onKeyDown} onChange={callBack} id="outlined-basic" label="please enter value" variant="standard" />

</>
    );
};

export default Input;