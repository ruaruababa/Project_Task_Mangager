import {Cell, Legend, Pie, PieChart} from 'recharts';
interface IChart {
    dataChart: any;
    dataKey: string;
}
const PiChart = (props: IChart) => {
    const {dataChart, dataKey} = props;
    const COLORS = dataChart.map((item: any) => item?.color);
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <PieChart width={800} height={300}>
                <Pie
                    data={dataChart}
                    label={renderCustomizedLabel}
                    labelLine={false}
                    color="#000000"
                    dataKey={dataKey}
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                >
                    {dataChart.map((entry: any, index: any) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
        </>
    );
};
export default PiChart;
