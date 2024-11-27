import React from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

export default function PieChartComp() {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart width={"100%"} height={"100%"}>
            <Pie 
                dataKey={"uv"}
                fill='#8833FF'
                stroke='#8833FF'
                fillOpacity={0.2}
                nameKey={"name"}
                cx="50%" cy="50%" outerRadius={50}
            />

            <Pie 
                dataKey={"pv"}
                fill='#E62E7B'
                stroke='#E62E7B'
                fillOpacity={0.2}
                nameKey={"name"}
                cx="50%" cy="50%" innerRadius={60} outerRadius={80}
            />
        </PieChart>
    </ResponsiveContainer>
  )
}
