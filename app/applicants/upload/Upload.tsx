"use client";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Upload = () => {
  const [questionName, setQuestionname] = useState<string>("");
  const [addsubs, setsubs] = useState<string>("");
  const [answername1, setAnswername] = useState<string>("");
  const [answername2, setAnswername2] = useState<string>("");
  const [answername3, setAnswername3] = useState<string>("");
  const [answername4, setAnswername4] = useState<string>("");
  const [correctans, setCorrectans] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  const [getData, setData] = useState<any[]>([]);
  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.target.value);
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedSubject = getData.find((item) => item.name === selectedName);
    if (selectedSubject) {
      setSelectedSubjectId(selectedSubject.id);
    } else {
      setSelectedSubjectId("");
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/subject/allsubjects");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [getData]);

  const onSubmits = async () => {
    try {
      await axios.post("/api/questions", {
        question: questionName,
        correctAnswer: correctans,
        answers: [answername1, answername2, answername3, answername4],
        level: selectedLevel,
        subproductId: selectedSubjectId,
      });
      toast.success("Uploaded successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading");
    }
  };

  const addnewsubject = async () => {
    try {
      await axios.post("/api/subject", {
        name: addsubs,
      });
      toast.success("created successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating");
    }
  };

  let subdata = getData.map((item) => {
    return (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    );
  });
  return (
    <>
    {/* <div className="flex ml-[550px] mt-10 gap-5">
        <input
          className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500"
          placeholder="Create Subject"
          onChange={(e) => setsubs(e.target.value)}
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={addnewsubject}
        >
          Create Subject
        </button>
      </div> */}


      <div className="flex flex-col items-center justify-center h-screen dark text-cyan-50 mt-20 ">
        <div className=" flex flex-col w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">
            Upload Questions To Database
          </h2>

          <p>Enter Question</p>
          <input
            placeholder="Enter Question"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={questionName}
            onChange={(e) => setQuestionname(e.target.value)}
          />
          <p>Enter Answer1</p>
          <input
            placeholder="Enter Answer1"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={answername1}
            onChange={(e) => setAnswername(e.target.value)}
          />
          <p>Enter Answer2</p>
          <input
            placeholder=" Enter Answer2"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={answername2}
            onChange={(e) => setAnswername2(e.target.value)}
          />
          <p>Enter Answer3</p>
          <input
            placeholder="Enter Awsner3"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={answername3}
            onChange={(e) => setAnswername3(e.target.value)}
          />
          <p>Enter Answer4</p>
          <input
            placeholder="Enter Awsner4"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={answername4}
            onChange={(e) => setAnswername4(e.target.value)}
          />
          <p>Enter Correct-Answer</p>
          <input
            placeholder="Enter Correct Awnser"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={correctans}
            onChange={(e) => setCorrectans(e.target.value)}
          />
          <p>Select Subject</p>
          <select
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="product"
            onChange={handleSubjectChange}
          >
            {subdata}
          </select>
          {/*  <p>Select Difficulty Level</p>
        
          <select
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="product"
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select> */}
         

          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
            onClick={onSubmits}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Upload;
