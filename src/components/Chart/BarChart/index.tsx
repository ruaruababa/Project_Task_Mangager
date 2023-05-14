import React from 'react';
import {
    Tooltip,
    Legend,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Bar,
} from 'recharts';
interface IChart {
    dataChart: any;
}
const StatusChart = (props: IChart) => {
    const {dataChart} = props;

    return (
        <>
            <BarChart
                width={950}
                height={300}
                data={dataChart}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="clientId" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="live" fill="#25b408" />
                <Bar dataKey="die" fill="#ec0e0e" />
            </BarChart>
        </>
    );
};
export default StatusChart;
