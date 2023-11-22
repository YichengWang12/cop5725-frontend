import React from 'react';
import Button from "@mui/material/Button";
import {Alert} from "@mui/material";
import {useRouter} from "next/navigation";
export default function Logout(){
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('');
    const router = useRouter();

    function handleLogOut(){
        localStorage.removeItem('cop5725appToken');
        if(localStorage.getItem('cop5725appToken') == null){
            setAlertMessage('Log out successfully!');
            setAlertType('success')
            setAlertVisible(true);
        }else{
            setAlertMessage('Log out failed!');
            setAlertType('error')
            setAlertVisible(true);
        }
        setTimeout(() => {
            router.push('/login');
        },1500);
    }
    return(
        <div>
            <Button variant="contained" color="primary" onClick={handleLogOut}>Log out</Button>
            {(alertVisible && alertType=='success') && <Alert severity={alertType}>Log out successfully!</Alert>}
            {(alertVisible && alertType=='error') && <Alert severity={alertType}>Log out failed!</Alert>}
        </div>
    )
}