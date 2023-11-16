
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useEffect} from "react";
import "./query1.css"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {crimeQuery, login} from "@/api/api";
import {Line} from "react-chartjs-2";
import 'chart.js/auto'
import {months, isLeapYear, checkDate} from "@/app/components/commonTools";

export function Query1Chart(props: any) {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Covid-19 death rate in LA',//图标名称：covid-19 death rate compared to crime rate in LA
                data: props.data.deathRate,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'y-axis-1',
            },
            {
                label: 'Crime rate in LA',
                data: props.data.crimeRate,
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                yAxisID: 'y-axis-2',
            }
        ],
    };

    const options:any = {
        scales: {
            'y-axis-1': {
                type: 'linear',
                position: 'left',
            },
            'y-axis-2': {
                type: 'linear',
                position: 'right',
            }
        }
    };

    // @ts-ignore
    return (
        <Line data={data} options={options}/>
    );
}

export default function Query1(){
    const [startYear, setStartYear] = React.useState('2020');
    const [startMonth, setStartMonth] = React.useState('1');
    const [startDay, setStartDay] = React.useState('1');
    const [endYear, setEndYear] = React.useState('2022');
    const [endMonth, setEndMonth] = React.useState('12');
    const [endDay, setEndDay] = React.useState('31');
    const [dateTags, setDateTags] = React.useState<any[]>([]);
    const [deathRate, setDeathRate] = React.useState<any[]>([]);
    const [crimeRate, setCrimeRate] = React.useState<any[]>([]);

    useEffect(() => {
        let day = checkDate(startYear,startMonth, startDay);
        setStartDay(day);
    }, [startMonth, startYear,startDay]);

    useEffect(() => {
        let day = checkDate(endYear,endMonth, endDay);
        setEndDay(day);
    }, [endYear,endMonth, endYear]);

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
        console.log({
            startDate: param.get('startDate'),
            endDate: param.get('endDate'),
        });

        crimeQuery(param).then((res) => {
            if(res.status == 200){
                let dateTags = [];
                let deathRate = [];
                let crimeRate = [];
                for(let item of res.data.deathRateRows){
                    dateTags.push(item[0].split('T')[0]);
                    deathRate.push(parseFloat(item[1]));
                }
                for(let item of res.data.crimeRateRows){

                    crimeRate.push(parseFloat(item[1]));
                }
                setDateTags(dateTags);
                setDeathRate(deathRate);
                setCrimeRate(crimeRate);

            }
        }   ).catch((err) => {
            console.log(err);
        });

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

    const changeYear = (month: string, year: string,flag: number) => {

        // 如果年份不是闰年，但是月份是2月并且日期是29号，那么日期应该是28号，在每次选择年份的时候调用
        if(year != '2020' && month === '2' && startDay === '29'){
            setStartDay('28');
        }
    }

    const startDaysArray = getDaysArray(startMonth,startYear);
    const endDaysArray = getDaysArray(endMonth,endYear);

    return(
        <div>
            <Box component="form" className="searchBar" noValidate onSubmit={handleSubmit}>
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
                <div className="searchBar">
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Search
                </Button>
            </Box>
            <div className="chart">
                <Query1Chart labels={dateTags} data={{deathRate:deathRate,crimeRate:crimeRate}}/>
            </div>
        </div>



    )
}