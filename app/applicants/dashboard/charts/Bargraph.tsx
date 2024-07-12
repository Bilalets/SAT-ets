"use client";
import React, { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import axios from "axios";
import useAppContext from "@/app/store/user";
interface record{
  Percentage: string
  Correctawn: string
  Wrongawn: string
  subjectname: string
}


const Bargraph = () => {
  const {getData}=useAppContext()
  const [getrecord,setrecord]=useState<record[]>()
  const [getgkRec,setgkRec]=useState<record[]>()
  const [getchemrec,setchemrec]=useState<record[]>()
  const [getbiorec,setbiorec]=useState<record[]>()
  const [getphyrec,setphyrec]=useState<record[]>()
  const [getmathsrec,setmathsrec]=useState<record[]>()
  const [getpakstudy,setpakstudyrec]=useState<record[]>()
  const [getislamicstudy,setislamicstudyrec]=useState<record[]>()


  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.post(
          "/api/Service/Getenglishrecord",
          { userId: getData?.id, subjectname: 'English' },
          { headers: { "Cache-Control": "no-store" } }
        );
        setrecord(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (getData?.id) {
      fetchResult();
    }
  }, [getData]);

  useEffect(() => {
    const fetchChemResult = async () => {
      try {
        const response = await axios.post(
          "/api/Subjectsrecords/Chemistryrec",
          { userId: getData?.id, subjectname: 'Chemistry' },
          { headers: { "Cache-Control": "no-store" } }
        );
        setchemrec(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (getData?.id) {
      fetchChemResult();
    }
  }, [getData]);

  useEffect(() => {
    const fetchBioResult = async () => {
      try {
        const response = await axios.post(
          "/api/Subjectsrecords/Biorec",
          { userId: getData?.id, subjectname: 'Biology' },
          { headers: { "Cache-Control": "no-store" } }
        );
        setbiorec(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (getData?.id) {
      fetchBioResult();
    }
  }, [getData]);

useEffect(()=>{
  const fetchgkresult=async()=>{
    try {
      const response = await axios.post("/api/Subjectsrecords/gkrec",{userId:getData?.id,subjectname:'General Knowledge'},{ headers: { "Cache-Control": "no-store" } });
      setgkRec(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchgkresult()
},[getData])



useEffect(()=>{
  const fetchphyresult=async()=>{
    try {
      const response = await axios.post("/api/Subjectsrecords/Physicsrec",{userId:getData?.id,subjectname:'Physics'},{ headers: { "Cache-Control": "no-store" } });
      setphyrec(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchphyresult()
},[getData])

useEffect(()=>{
  const fetchmathresult=async()=>{
    try {
      const response = await axios.post("/api/Subjectsrecords/Mathsrec",{userId:getData?.id,subjectname:'Maths'},{ headers: { "Cache-Control": "no-store" } });
      setmathsrec(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchmathresult()
},[getData])


useEffect(()=>{
  const fetchpakresult=async()=>{
    try {
      const response = await axios.post("/api/Subjectsrecords/Pakstudiesrec",{userId:getData?.id,subjectname:'Pakistan Studies'},{ headers: { "Cache-Control": "no-store" } });
      setpakstudyrec(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchpakresult()
},[getData])

useEffect(()=>{
  const fetchpakresult=async()=>{
    try {
      const response = await axios.post("/api/Subjectsrecords/Islamicstudiesrec",{userId:getData?.id,subjectname:'Islamic Studies'},{ headers: { "Cache-Control": "no-store" } });
      setislamicstudyrec(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchpakresult()
},[getData])

const totalPercentageisl=getislamicstudy?.reduce((total, item) => {
  return total + parseInt(item.Percentage);
}, 0) ?? 0;

const totalPercentagemath=getmathsrec?.reduce((total, item) => {
  return total + parseInt(item.Percentage);
}, 0) ?? 0;

const totalPercentagepk=getpakstudy?.reduce((total, item) => {
  return total + parseInt(item.Percentage);
}, 0) ?? 0;


const totalPercentagephy=getphyrec?.reduce((total, item) => {
  return total + parseInt(item.Percentage);
}, 0) ?? 0;

const totalPercentagebio=getbiorec?.reduce((total, item) => {
  return total + parseInt(item.Percentage);
}, 0) ?? 0;

const totalPercentagegk=getgkRec?.reduce((total, item) => {
  return total + parseInt(item.Percentage);
}, 0) ?? 0;

const totalPercentage = getrecord?.reduce((total, item) => {
  return total + parseInt(item.Percentage);
}, 0) ?? 0;

const totalPercentagechem = getchemrec?.reduce((total, item) => {
  return total + parseInt(item.Percentage);
}, 0) ?? 0;

const averagePercentagebio = getbiorec?.length ? totalPercentagebio / getbiorec.length : 0;
const averagePercentagechem = getchemrec?.length ? totalPercentagechem / getchemrec.length : 0;
const averagePercentage = getrecord?.length ? totalPercentage / getrecord.length : 0;
const averagePercentagegk=getgkRec?.length?totalPercentagegk/getgkRec.length:0
const averagePercentagephy=getphyrec?.length?totalPercentagephy/getphyrec.length:0
const averagePercentagemath=getmathsrec?.length?totalPercentagemath/getmathsrec.length:0
const averagePercentagepk=getpakstudy?.length?totalPercentagepk/getpakstudy.length:0
const averagePercentageisl=getislamicstudy?.length?totalPercentageisl/getislamicstudy?.length:0
    const options = {
        tooltip: {
          
          trigger: 'axis', 
          formatter: '{b}: {c}%', 
          axisPointer: {
            type: 'shadow', 
          },
        },
        toolbox: {
          
        },
        xAxis: {
          type: 'category',
          data: [
            'English',
            'Pak Study',
            'Islamic Study',
            'Maths',
            'Biology',
            'Physics',
            'Chemistry',
            'General Knowledge',
          ],
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
        },
        series: [
          {
            data: [averagePercentage.toFixed(0),averagePercentagepk.toFixed(0), averagePercentageisl.toFixed(0), averagePercentagemath.toFixed(0),averagePercentagebio.toFixed(0),averagePercentagephy.toFixed(0), averagePercentagechem.toFixed(0), averagePercentagegk.toFixed(0)],
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
