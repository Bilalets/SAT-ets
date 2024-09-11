"use client";
import React, { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import axios from "axios";
import useAppContext from "@/app/store/user";
interface record{
  catname: string
  subjectname: string
  totalOccurrences: number
}


const Bargraph = () => {
  const {getData}=useAppContext()
  const [getrecord,setrecord]=useState<record[]>([])

useEffect(()=>{
  const fetchassessment=async()=>{
    try {
     const res= await axios.post('/api/Userbestassessment',{
        userId:getData?.id
       })
       setrecord(res.data)
    } catch (error) {
      console.log(error)
    }
   
    
  }
fetchassessment()
},[getData?.id])


    const options = {
        tooltip: {
          
          trigger: 'axis', 
          formatter: '{b}: {c}', 
          axisPointer: {
            type: 'shadow', 
          },
        },
        toolbox: {
          
        },
        xAxis: {
          type: 'category',
          data: getrecord?.map((item)=>`${item.catname}-${item.subjectname}`),
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
        },
        series: [
          {
            data: getrecord?.map((record) => record.totalOccurrences),
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
            barWidth: 25,
            itemStyle: {
              color: 'rgba(0, 0, 0, 1)', // each bar color Dark gray
              barBorderRadius: [5, 5, 0, 0], // Top-left and top-right corners rounded
              label: {
                show: true,
                position: 'top',
                formatter: '{c}%',
              },
            },
          },
        ],
      };



  return (
    <div>

<ReactECharts option={options}  />

    </div>
  )
}

export default Bargraph;
export const dynamic = 'force-dynamic'
