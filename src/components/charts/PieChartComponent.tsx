// src/components/charts/PieChartComponent.tsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type PieChartComponentProps = {
  data: { name: string; value: number }[];
};

const COLORS = ['#0088FE', '#FF8042'];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300} style={{backgroundColor:'#aae699',padding:'2rem 0rem',borderRadius:'15px',marginBottom:'1rem'}}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
