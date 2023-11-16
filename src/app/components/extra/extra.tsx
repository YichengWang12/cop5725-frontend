import React from 'react';
import Button from "@mui/material/Button";
import {totalTuples} from "@/api/api";
import {Alert} from "@mui/material";
export default function Extra(){
    const [total, setTotal] = React.useState(0);
    const [alertVisible, setAlertVisible] = React.useState(false);
    function queryTotalTuples(){
        totalTuples().then((res)=>{
            setTotal(res.data.totalTuples[0]);
            setAlertVisible(true);
        }).catch((err)=>{
            console.log(err);
        });
    }
    return(
        <div>
            <Button variant="contained" color="primary" onClick={queryTotalTuples}>Get the total number of tuples in the database</Button>
            {alertVisible && <Alert severity="success">The total number of tuples in the database is {total}</Alert>}
        </div>
    )
}