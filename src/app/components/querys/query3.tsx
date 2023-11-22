import {Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, {useEffect} from "react";
import {checkDate, isLeapYear, months, stateColors, stateColorsRGBA, statesInUS} from "@/app/components/commonTools";
import "./query3.css"
import {lossWorkQuery} from "@/api/api";
import QueryChart from "@/app/components/querys/querychart";


export default function Query3(){
    const [startYear, setStartYear] = React.useState('2020');
    const [startMonth, setStartMonth] = React.useState('1');
    const [startDay, setStartDay] = React.useState('1');
    const [endYear, setEndYear] = React.useState('2022');
    const [endMonth, setEndMonth] = React.useState('12');
    const [endDay, setEndDay] = React.useState('31');
    const [deathDateTags, setDeathDateTags] = React.useState<any[]>([]);
    const [hospitalDateTags, setHospitalDeathDateTags] = React.useState<any[]>([]);
    const [states, setStates] = React.useState<any[]>([]);
    //返回数据的对象数组 {'state':[]}
    const [deathRate, setDeathRate] = React.useState<any>({});
    const [hospitalRate, setHospitalRate] = React.useState<any>({});
    //控制渲染图表
    const [key, setKey] = React.useState(0);
    //const [inputData, setInputData] = React.useState<any[]>([]);

    useEffect(() => {
        let day = checkDate(startYear,startMonth, startDay);
        setStartDay(day);
    }, [startMonth, startYear,startDay]);

    useEffect(() => {
        let day = checkDate(endYear,endMonth, endDay);
        setEndDay(day);
    }, [endYear,endMonth, endYear]);

    const handleStateChange = (event:any) => {
        const {
            target: { value },
        } = event;
        setStates(
            // 使用Array.isArray检查value是否是一个数组
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let startYear = Number(data.get('startYear'));
        let startMonth = Number(data.get('startMonth'));
        let startDay = Number(data.get('startDay'));
        let endYear = Number(data.get('endYear'));
        let endMonth = Number(data.get('endMonth'));
        let endDay = Number(data.get('endDay'));

        // 检查年份和日期，并做适当的调整
        if (startYear !== 2020 && startMonth === 2 && startDay === 29) {
            startDay = 28;
        }

        // 创建开始日期和结束日期对象
        const startDate = new Date(startYear, startMonth - 1, startDay); // JavaScript中月份是从0开始的
        const endDate = new Date(endYear, endMonth - 1, endDay);

        // 检查结束日期是否不早于开始日期
        if (endDate < startDate) {
            console.error("The end date cannot be earlier than the start date.");
            return;
        }

        // 将数据打包为FormData对象
        const param = new FormData();

        param.append('startDate', startDate.toISOString().split('T')[0]);
        param.append('endDate', endDate.toISOString().split('T')[0]);
        param.append('states', states.join(','));

        lossWorkQuery(param).then((res)=>{
            if(res.status == 200){
                console.log(res.data);
            }
        }).catch((err)=>{
            console.log(err)
        })

        // hospitalQuery(param).then((res)=>{
        //     if(res.status == 200){
        //         let deathDateTags = new Set();
        //         let hospitalDateTags = new Set();
        //         let deathRate:any = {};
        //         let hospitalRate:any = {};
        //         let flag = false;
        //         for(let item of res.data.deathRateRows){
        //
        //             deathDateTags.add(item[0].split('T')[0]);
        //
        //             let stateName = item[2];
        //             if(deathRate[stateName] == undefined){
        //                 deathRate[stateName] = [];
        //             }
        //             deathRate[stateName].push({x:item[0].split('T')[0],y:item[1]});
        //             console.log(deathDateTags);
        //             flag = true;
        //         }
        //
        //         for(let item of res.data.hospitalRateRows){
        //
        //             hospitalDateTags.add(item[0].split('T')[0]);
        //
        //             let stateName = item[2];
        //             if(hospitalRate[stateName] == undefined){
        //                 hospitalRate[stateName] = [];
        //             }
        //             hospitalRate[stateName].push({x:item[0].split('T')[0],y:item[1]});
        //             flag = true;
        //         }
        //
        //         setDeathDateTags(Array.from(deathDateTags));
        //         setHospitalDeathDateTags(Array.from(hospitalDateTags));
        //         setDeathRate(deathRate);
        //         setHospitalRate(hospitalRate);
        //         setKey(key+1);
        //     }
        // }).catch((err)=>{
        //     console.log(err);
        // })



    }

    const getDaysArray = (monthIndex: string, yearIndex: string) => {
        let month = monthIndex == '' ? 1 : Number(monthIndex);
        const year = yearIndex == '' ? 2020 : Number(yearIndex);
        let daysInMonth = months[month-1].days;
        // 如果是二月，确定是否为闰年来决定天数
        if (month=== 2 && isLeapYear(year)) {
            daysInMonth = 29;
        }

        const daysArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }
        return daysArray;

    }

    const startDaysArray = getDaysArray(startMonth,startYear);
    const endDaysArray = getDaysArray(endMonth,endYear);
    return(
        <div>
            <Box component="form" className="form-component" noValidate onSubmit={handleSubmit}>
                <div className="searchBar ">
                    <FormControl className="states-select ">
                        <InputLabel id="demo-multiple-chip-label">States</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={states}
                            onChange={handleStateChange}
                            name="states"
                            input={<OutlinedInput id="select-multiple-chip" label="States" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}

                        >
                            {statesInUS.map((state) => (
                                <MenuItem key={state.code} value={state.name}>
                                    {state.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="searchBar">
                    <div className="startDate">
                        <FormControl className="selectBar">
                            <InputLabel id="demo-simple-select-label">Start Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={startYear}
                                label="Start Year"
                                onChange={(event) => {setStartYear(event.target.value as string)}}
                                name="startYear"
                            >
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                            </Select>

                        </FormControl>
                        <FormControl className="selectBar">
                            <InputLabel id="demo-simple-select-label">Start Month</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={startMonth}
                                label="Start Month"
                                onChange={(event) => {setStartMonth(event.target.value as string)}}
                                name="startMonth"
                            >
                                {months.map((month) => (
                                        <MenuItem key={month.index} value={month.index}>{month.label}</MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                        <FormControl className="selectBar">
                            <InputLabel id="demo-simple-select-label">Start Day</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={startDay}
                                label="Start Day"
                                onChange={(event) => {setStartDay(event.target.value as string)}}
                                name="startDay"
                            >
                                {startDaysArray.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="gap"> - </div>
                    <div className="endDate">
                        <FormControl className="selectBar">
                            <InputLabel id="demo-simple-select-label">End Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={endYear}
                                label="End Year"
                                onChange={(event) => {setEndYear(event.target.value as string)}}
                                name="endYear"
                            >
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                            </Select>

                        </FormControl>
                        <FormControl className="selectBar">
                            <InputLabel id="demo-simple-select-label">End Month</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={endMonth}
                                label="End Month"
                                onChange={(event) => {setEndMonth(event.target.value as string)}}
                                name="endMonth"
                            >
                                {months.map((month) => (
                                        <MenuItem key={month.index} value={month.index}>{month.label}</MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                        <FormControl className="selectBar">
                            <InputLabel id="demo-simple-select-label">End Day</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={endDay}
                                label="End Day"
                                onChange={(event) => {setEndDay(event.target.value as string)}}
                                name="endDay"
                            >
                                {endDaysArray.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Search
                </Button>
            </Box>
            <div className="chart">
                <QueryChart key={key} labels={deathDateTags} data={{deathrate :deathRate,hospitalrate :hospitalRate}} />
            </div>
        </div>



    )
}