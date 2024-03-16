import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartData {
    labels: string[];
    values: number[];
}

interface BarChartProps {
    data: BarChartData;
}

const Linechart: React.FC<BarChartProps> = ({ data }) => {
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
            type: 'line',
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
                }
            }
        });

        return () => {
            chart.destroy();
        };
    }, [data]);

    return <canvas ref={chartContainer}></canvas>;
};

export default Linechart;