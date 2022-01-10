import React, {useState} from 'react'
import {Login, Signup} from './TextBoxandSettings'
import Button from '@material-ui/core/Button';


export default function ToggleLoginOrSignup() {
    const [login, setLogin] = useState(false);
    const [state, setState] = useState('Login')
    const flipLoginOrSignup=()=>{
        setLogin(!login);
        login ? setState('Login'): setState('Signup');
    }
    return (
        <>
        <div className="ToggleLoginOrSignup">
            <h5>Hello Guest</h5>
            <Button onClick={flipLoginOrSignup} variant="outlined" color="primary">{state}</Button>
        </div>
        <div className="ToggleLoginOrSignup">
            {login ? <Login/>: <Signup />}
        </div>
        </>
    )
}
