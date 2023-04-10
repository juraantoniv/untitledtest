import React, {ChangeEvent, useState} from 'react';


type SpanTYpe={
    title:string
    callback:(st:string)=>void
}

const EditableSpan:React.FC<SpanTYpe> = ({
    title,
    ...rest
                                         }) => {


    const [flag,setFlag]=useState<boolean>(false)
    const [newTitle,setTitle]=useState<string>(title)



    function onDoubleClickSpan() {
        setFlag(true)
    }

    function onblurHandler() {
        rest.callback(newTitle)
        setFlag(false)
    }

    function onchangeHandler(e:ChangeEvent<HTMLInputElement>) {
            setTitle(e.currentTarget.value)
    }

    return (


        flag
         ? <input value={newTitle} onChange={onchangeHandler} onBlur={onblurHandler} autoFocus={true}/>
        :<span onDoubleClick={onDoubleClickSpan} >{newTitle}</span>

    );
};

export default EditableSpan;