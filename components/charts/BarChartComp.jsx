import React from 'react'
import { Bar, BarChart, CartesianAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, ZAxis } from 'recharts'

export default function BarChartComp() {
  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
        <BarChart height={"100%"} width={"100%"}>
            <Tooltip />
            <ZAxis dataKey={"name"} />
            <Legend />
            <Bar 
                dataKey={"uv"} 
                fill='#FF6633'  
                fillOpacity={0.2}
                stroke='#FF6633'
            />
            <Bar 
                dataKey={"pv"} 
                fill='#29CC39'
                fillOpacity={0.2}
                stroke='#29CC39'
            />
            
        </BarChart>
    </ResponsiveContainer>
  )
}
