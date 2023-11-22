import {Line} from "react-chartjs-2";
import React, {useEffect} from "react";
import {stateColors,stateColorsRGBA} from "@/app/components/commonTools";
import 'moment';
import 'chartjs-adapter-moment';

export default function QueryChart(props: any) {

    //动态创建dataset
    const datasets:any[] = [];
    let counter = 0;
    const items = Object.entries(props.data).map(([key, value]) => {
        let stringTag = key;
        let data:any = value;

        const datasetraw = Object.entries(data).map(([key,value]) =>{
            let datasetObj = {
                type: 'line',
                label: stringTag + ' in ' + key,
                data: value,
                fill: false,
                backgroundColor: stateColors[key],
                borderColor: stateColorsRGBA[key],
                yAxisID: counter == 0 ? 'y-axis-1' : 'y-axis-2',
                xAxisID: 'x-axis-1',
                borderDash: counter == 0 ? [] : [5, 5],
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