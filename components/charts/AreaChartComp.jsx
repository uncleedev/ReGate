"use client"

import { datas, requests } from '@/sample/data'
import React from 'react'
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip } from 'recharts'

export default function AreaChartComp() {

  

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <AreaChart height={"100%"} width={"100%"} data={datas}>
        <Tooltip />
        <Legend />
        <Area 
          type={"monotone"} 
          dataKey={"uv"}
          stroke='#2EE6CA'
          fill='#2EE6CA'
          fillOpacity={0.2} 
        />

        <Area 
          type={"monotone"} 
          dataKey={"pv"}
          stroke='#33BFFF'
          fill='#33BFFF'
          fillOpacity={0.2} 
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
