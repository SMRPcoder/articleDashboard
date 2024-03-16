import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export interface ChartData {
    labels: string[];
    values: number[];
}

interface BarChartProps {
    data: ChartData;
}

const Donut: React.FC<BarChartProps> = ({ data }) => {
    const chartContainer = useRef<HTMLCanvasElement>(null);

    const getRandomColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor}`;
    };

    useEffect(() => {
        if (!chartContainer.current || !data) return;

        const ctx = chartContainer.current.getContext('2d');
        if (!ctx) return;

        const colors:string[]=data.values.map(val=>getRandomColor());

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Data',
                    data: data.values,
                    backgroundColor:colors ,
                    borderColor: colors.map((col:string)=>`${col}77`),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                // plugins:{
                //     title:{
                //         display:true,
                //         text:"My Title",
                //         padding: {
                //             top: 0,
                //             bottom: 0
                //         }
                //     }
                // }
            },
           
        });

        return () => {
            chart.destroy();
        };
    }, [data]);

    return <canvas ref={chartContainer}></canvas>;
};

export default Donut;