import React, {FC} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';

const data = [
  {
    name: 'Some', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'very', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'wow', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'data', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'points', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'here', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'right?', uv: 3490, pv: 4300, amt: 2100,
  },
];
const Chart:FC = () => {

  return (

    <ResponsiveContainer width={450}
                         height={280} >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>

  );
}

export default Chart;
