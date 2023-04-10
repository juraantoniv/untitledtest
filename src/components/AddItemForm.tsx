import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import Input from "./Input";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


type PropsType = {
    callback: (title: string) => void
}

const AddItemForm:React.FC<PropsType> = ({
    callback
                              }) => {

    const [item,setItem]= useState<string>('')
    const [error, setError] = useState<boolean | string>(false)


    function onChangeHandler(e:ChangeEvent<HTMLInputElement>) {
        setItem(e.currentTarget.value)
        setError(false)
    }

   const onKeyDownHandler=(e: KeyboardEvent<HTMLInputElement>)=> {
        if (e.key==='Enter' && item.trim()!==''){
            callback(item)
            setItem('')
        }

    }


    const onClickHandler = () => {
        if (item.trim() !== '') {
            callback(item.trim())
        } else {
            setError('Title is required!')
        }
        setItem('')
    }

    return (

        <div>
            <div>

            <Input
                title={item}
                   callBack={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button
                variant="contained"
                onClick={onClickHandler}
                   >+
            </Button>

                {error && <Alert severity="error">{error}</Alert>}
            </div>
        </div>

    );
};

export default AddItemForm;