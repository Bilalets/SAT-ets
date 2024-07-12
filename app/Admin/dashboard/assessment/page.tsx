"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Assessmentcat from "./Category/page";
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
const Assessments = () => {
  const [getData, setData] = useState<Test[]>();
  const [Loading, setLoading] = useState<boolean>(false);
  const [selectedData,getseletedData]=useState<Test>()
  useEffect(() => {
    fetchAllServicesData();
  }, []);
  const fetchAllServicesData = async () => {
    try {
      setLoading(false);
      const response = await axios.get("/api/Allservices/");
      if (response.status === 200) {
        setLoading(true);
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServiceId = event.target.value;
    const selectedService = getData?.find(service => service.id === selectedServiceId);
    getseletedData(selectedService);
  };
 

  return (
    <div>
      <div>
        <h1>Create Test</h1>
      </div>
      <div>
        <form className="max-w-sm mx-auto">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select a Service
          </label>
          <select
            onChange={handleServiceChange}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a Service</option>
            {getData?.map((service) => (
              <option key={service.id} value={service.id} >
                {service.name}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div >
          {selectedData && <Assessmentcat name={selectedData?.name} id={selectedData?.id}/>}  
      </div>
      

    
    </div>
  );
};

export default Assessments;
