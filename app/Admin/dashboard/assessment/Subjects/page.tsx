'use client'
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PageProps {
  name: string;
  id: string;
  subcatName:string;
}

interface subs {
  name: string;
  id: string;
}

const Assessmentsubjects: React.FC<PageProps> = (props) => {
  const [getsubjects, setsubjects] = useState<subs[]>();
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});
  const [total, settotal] = useState<number>();
  const [testDuration, setTestDuration] = useState<number>();



  const calculateTotalPercentage = () => {
    let totalPercentage = 0;
    for (const id in inputValues) {
      totalPercentage += inputValues[id];
    }
    return totalPercentage;
  };

  const fetchSubData = useCallback(async () => {
    try {
      
      const response = await axios.post("/api/Service/Getsinglesubject", {
        subcategoryId: props.id,
      });
      if (response.status === 200) {
        setsubjects(response.data);
      }
    } catch (error) {
      toast.error("Error fetching Data");
    } finally {
     
    }
  }, [props.id]);

  useEffect(() => {
    fetchSubData();
  }, [fetchSubData]);

  const handleInputChange = (id: string, value: string) => {
    const numericValue = parseFloat(value);
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: numericValue,
    }));
  };

  const assessmentData: Record<string, number> = Object.entries(inputValues).reduce(
    (acc: Record<string, number>, [id, percentage]) => {
      acc[id] = Number(percentage);
      return acc;
    },
    {}
  );

  const createassessment = async () => {
    const totalPercentage = calculateTotalPercentage();
    if (totalPercentage < 100) {
toast.error("Please fill in percentages to total 100%.")
    } else if (totalPercentage > 100) {
toast.error("Total percentage should not exceed 100%.")
    } else {
      try {
        await axios.post("/api/Makequiz", {
          Subcatname: props.subcatName,
          name: props.name,
          takes: assessmentData,
          duration: testDuration,
          totalquestions: total,
        });
        toast.success("Assessment Created Successfully");
      } catch (error) {
        toast.error("Error Creating Assessment");
      }
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center mt-5 gap-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Total Questions
          </label>
          <input
            type="text"
            id="first_name"
            onChange={(e) => settotal(parseFloat(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Total Question Value"
            required
          />
        </div>
        <div>
          <form className="max-w-sm mx-auto ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Test Duration
            </label>
            <select
              id="test_duration"
              value={testDuration}
              onChange={(e) => setTestDuration(parseFloat(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled selected>
                Choose Time Duration
              </option>
              <option value="15">15 Secound</option>
              <option value="30">30 Secound</option>
              <option value="45">45 Secound</option>
              <option value="60">1 Minute</option>
           
            </select>
          </form>
        </div>
      </div>
      <div className="relative overflow-x-auto mt-9 justify-center items-center ml-56">
        <table className="w-2/3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Subject Name
              </th>
              <th scope="col" className="px-6 py-3">
                % of each subject
              </th>
            </tr>
          </thead>
          <tbody>
            {getsubjects?.map((subject) => (
              <tr
                key={subject.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {subject.name}
                </th>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    id={subject.id}
                    value={inputValues[subject.id] || ""}
                    onChange={(e) => handleInputChange(subject.id, e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Value"
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" justify-center flex items-center mt-4">
        <button
          onClick={createassessment}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Create Assessment
        </button>
      </div>
    </>
  );
};

export default Assessmentsubjects;
