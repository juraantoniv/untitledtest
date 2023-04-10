import React, {ChangeEvent, useState} from "react";
import Checkbox from '@mui/material/Checkbox';

type PropsType={
    checked: boolean
    onChange: (e:ChangeEvent<HTMLInputElement>)=>void
}

export function Checkboxed (props:PropsType) {
    return (
        <div>


        {/*<input type="checkbox" checked={props.checked} onChange={props.onChange} />*/}
    <Checkbox
        checked={props.checked}
        onChange={props.onChange}
        inputProps={{ 'aria-label': 'controlled' }}
    />

        </div>
    );
}
