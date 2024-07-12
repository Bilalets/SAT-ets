"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import ReactECharts from "echarts-for-react";
import useAppContext from "@/app/store/user";

interface record {
  Percentage: string;
  Correctawn: string;
  Wrongawn: string;
  subjectname: string;
  createdAt: string;
}

interface ID {
  id: string;
}

const Pie = () => {
  const { getData } = useAppContext();
  const [getrecord, setrecord] = useState<record[]>();
  const [values, setValues] = useState({
    Excellentvalues: [] as number[],
    Bestvalues: [] as number[],
    Bettervalues: [] as number[],
    Goodvalues: [] as number[],
    Averagevalues: [] as number[],
    worstvalues: [] as number[],
  });

  useEffect(() => {
    const fetchResult = async () => {
      if (getData?.id) {
        try {
          const response = await axios.post(
            "/api/Service/Subrecord",
            { userId: getData.id },
            { headers: { "Cache-Control": "no-store" } }
          );
          setrecord(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchResult();
  }, [getData]);

  const displayrecord = useCallback((): void => {
    const newValues = {
      Excellentvalues: [] as number[],
      Bestvalues: [] as number[],
      Bettervalues: [] as number[],
      Goodvalues: [] as number[],
      Averagevalues: [] as number[],
      worstvalues: [] as number[],
    };

    getrecord?.forEach((item) => {
      const pars = parseFloat(item.Percentage);

      if (pars >= 90) {
        newValues.Excellentvalues.push(pars);
      } else if (pars >= 80) {
        newValues.Bestvalues.push(pars);
      } else if (pars >= 70) {
        newValues.Bettervalues.push(pars);
      } else if (pars >= 60) {
        newValues.Goodvalues.push(pars);
      } else if (pars >= 33) {
        newValues.Averagevalues.push(pars);
      } else {
        newValues.worstvalues.push(pars);
      }
    });

    setValues(newValues);
  }, [getrecord]);
  useEffect(() => {
    displayrecord();
  }, [displayrecord]);

  const rec = getrecord?.length;
  const Exval = values?.Excellentvalues?.length;
  const bestval = values?.Bestvalues.length;
  const betterval = values?.Bettervalues.length;
  const goodval = values?.Goodvalues.length;
  const avgval = values?.Averagevalues.length;
  const worstval = values?.worstvalues.length;

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "top-middle",
      orient: "horizontal",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "100%"],
        top: "50%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "right",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 10,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: rec, name: "No of Attempts" },
          { value: Exval, name: "Excellent Attempts" },
          { value: bestval, name: "Best Attempts" },
          { value: betterval, name: "Better Attempts" },
          { value: goodval, name: "Good Attempts" },
          { value: avgval, name: "Average Attempts" },
          { value: worstval, name: "Worst Attempts" },
        ],
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={option} />
    </div>
  );
};

export default Pie;
export const dynamic = 'force-dynamic'
