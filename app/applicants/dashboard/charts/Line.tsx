import React, { useEffect, useState, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import useAppContext from "@/app/store/user";

interface Record {
  Percentage: string;
  Correctawn: string;
  Wrongawn: string;
  subjectname: string;
  createdAt: string;
}

const Line = () => {
  const { getData } = useAppContext();
  const [getrecord, setrecord] = useState<Record[]>([]);
  const [monthlyData, setMonthlyData] = useState<number[]>(new Array(12).fill(0));

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.post(
          "/api/Service/Getyearlyrecord",
          { userId: getData?.id },
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

  const calculateMonthlyData = useCallback((): void => {
    const monthlyTotals = new Array(12).fill(0);
    const monthlyCounts = new Array(12).fill(0);

    getrecord.forEach((item) => {
      const date = new Date(item.createdAt);
      const month = date.getMonth(); // getMonth() returns month from 0-11
      const percentage = parseFloat(item.Percentage);

      if (!isNaN(percentage)) {
        monthlyTotals[month] += percentage;
        monthlyCounts[month] += 1;
      }
    });

    const averages = monthlyTotals.map((total, index) => 
      monthlyCounts[index] > 0 ? total / monthlyCounts[index] : 0
    );

    setMonthlyData(averages);
  }, [getrecord]);

  useEffect(() => {
    calculateMonthlyData();
  }, [getrecord, calculateMonthlyData]);

  const options = {
    xAxis: {
      type: "category",
      data: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: monthlyData,
        type: "line",
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={options} />
    </div>
  );
};

export default Line;
export const dynamic = 'force-dynamic'
