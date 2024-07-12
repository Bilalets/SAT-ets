"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { ArrowDownRight, ChevronLeft, ChevronRight, CircleFadingPlus } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import { MyAssessment } from "../assessment/components";
import Category from "./Category/page";
import { Spinner } from "flowbite-react";
import { redirect } from "next/navigation";


interface Chapter {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface Subcategory {
  id: string;
  name: string;
  subject: Subject[];
}

interface Category {
  id: string;
  name: string;
  Desc: string;
  Prep: string;
  Subs: string[];
  subcategory: Subcategory[];
}

interface Test {
  id: string;
  name: string;
  category: Category[];
}

const Home = () => {

  const [getData, setData] = useState<Test[]>();
  const [serviceData, setSericeData] = useState<Test>();
  const [Loading,setLoading]=useState<boolean>(false)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );


  useEffect(() => {
    fetchAllServicesData();
  }, []);
  const fetchAllServicesData = async () => {

    try {
      setLoading(false)
      const response = await axios.get("/api/Allservices/");
      if (response.status === 200) {
        setLoading(true)
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 

  return (
    <>
    
    {!Loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Spinner />
        </div>
      ) : (
        <div className="relative">
          <div className="flex flex-col gap-5 justify-center mt-10 ml-1">
            {getData?.map((item) => (
              <div key={item.id}>
                <div className="inline-block  px-7 text-xl border bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between gap-4">
                    <span>{item.name}</span>
                    <ArrowDownRight />
                  </div>
                </div>
                {getData && <Category name={item.name} id={item.id} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
export const fetchCache = 'force-no-store';
