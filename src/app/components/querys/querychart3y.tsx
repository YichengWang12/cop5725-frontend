import {Line} from "react-chartjs-2";
import React, {useEffect} from "react";
import {stateColors,stateColorsRGBA} from "@/app/components/commonTools";
import 'moment';
import 'chartjs-adapter-moment';

export default function Querychart3y(props: any) {

    //动态创建dataset
    const datasets:any[] = [];
    let counter = 0;
    const items = Object.entries(props.data).map(([key, value]) => {
        let stringTag = key;
        let data:any = value;
        let axisID = () => {
            if(counter == 0){
                return 'y-axis-1';
            }else if (counter == 1){
                return 'y-axis-2';
            }else{
                return 'y-axis-3';
            }
        }
        let lineType = () => {
            if(counter == 0){
                return [];
            }else if (counter == 1){
                return [5, 5];
            }else{
                return [1,8];
            }
        }

        let pointType = () => {
            if(counter == 0){
                return 'circle';
            }else if (counter == 1){
                return 'triangle';
            }else{
                return 'rect';
            }
        }

        let lineWidth = () => {
            if(counter == 0){
                return 2;
            }else if (counter == 1){
                return 3;
            }else{
                return 4;
            }
        }

        const datasetraw = Object.entries(data).map(([key,value]) =>{
            let datasetObj = {
                type: 'line',
                label: stringTag + ' in ' + key,
                data: value,
                fill: false,
                backgroundColor: stateColors[key],
                borderColor: stateColorsRGBA[key],
                yAxisID: axisID(),
                xAxisID: 'x-axis-1',
                borderDash: lineType(),
                pointStyle: pointType(),
                borderWidth: lineWidth(),
            };
            datasets.push(datasetObj);
        })
        counter++;
    })
    console.log(datasets);
    const data = {
        labels: props.labels,
        datasets: datasets,
    };
    console.log(data);
    const options:any = {
        scales: {
            'y-axis-1': {
                type: 'linear',
                position: 'left',
            },
            'y-axis-2': {
                type: 'linear',
                position: 'right',
            },
            'y-axis-3': {
                type: 'linear',
                position: 'right',
            },

            'x-axis-1': {
                type: 'time',
                position: 'bottom',
                time: {
                    unit: 'day', // 选择合适的时间单位
                    tooltipFormat: 'll',
                    displayFormats: {
                        day: 'YYYY-MM-DD' // 选择你想要的日期格式
                    }
                }
            },
        }
    };

    // @ts-ignore
    return (
        <Line  data={data} options={options}/>
    );
}