"use client";

import axios from "axios";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  PlayIcon,
  Redo,
  SaveIcon,
  Undo,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
type QuestionRequestData = {
  questionName: string | undefined;
  awnsers: (string | undefined)[];
  correctAwnser: string | undefined;
  subcategoryId?: string;
  subjectsId?: string;
  chaptersId?: string;
};
interface Chapter {
  id: string;
  name: string;
}
interface chap {
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
  subcategory: Subcategory[];
}

interface Test {
  id: string;
  name: string;
  category: Category[];
}
const UploadQuestions = () => {
  const [getdata, setdata] = useState<Test[]>([]);
  const [question, setQuestion] = useState<string>();
  const [correctAwn, setCorrectAwn] = useState<string>();
  const [getchapid, setchapid] = useState<Chapter>();
  const [awnser1, setAwnser1] = useState<string>();
  const [awnser2, setAwnser2] = useState<string>();
  const [awnser3, setAwnser3] = useState<string>();
  const [awnser4, setAwnser4] = useState<string>();
  const [selectedservice, Setselectedservice] = useState<Test>();
  const [selectedcattegory, Setselectedcategory] = useState<Category>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>();
  const [selectedSubject, setSelectedSubject] = useState<Subject>();
  const [clickedSubjectId, setClickedSubjectId] = useState<Subject>();
  const handleSubcategoryClick = (item: Subcategory) => {
    setSelectedSubcategory(item);
  };
  const handlesubjectClick = (item: Subject) => {
    setSelectedSubject(item);
    setClickedSubjectId(item);
  };

  const handlecategoryclick = (item: Category) => {
    Setselectedcategory(item);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/Everyservice/");
     
      const data = response.data;
      setdata(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [set, seed] = useState<Subcategory[]>([]);
  const [translateValue, setTranslateValue] = useState(0);
  const itemWidth = 60;
  //
  const containerWidth = itemWidth * set.length;
  useEffect(() => {
    if (selectedcattegory) {
      const subcategories = selectedcattegory.subcategory;
      seed(subcategories);
    }
  }, [selectedcattegory, seed]);
  const handleMoveRight = () => {
    const firstItem = set[0];
    const newSet = set.slice(1).concat(firstItem);
    seed(newSet);

    const newTranslateValue = translateValue - itemWidth;

    if (Math.abs(newTranslateValue) >= containerWidth) {
      setTranslateValue(0);
    } else {
      setTranslateValue(newTranslateValue);
    }
  };

  const handleMoveLeft = () => {
    const lastItem = set[set.length - 1];
    const newSet = [lastItem, ...set.slice(0, -1)];
    seed(newSet);

    const newTranslateValue = translateValue + itemWidth;

    if (newTranslateValue > 0) {
      setTranslateValue(-(containerWidth - itemWidth));
    } else {
      setTranslateValue(newTranslateValue);
    }
  };

  let displaycategory = selectedservice?.category.map((item) => (
    <div
      onClick={() => handlecategoryclick(item)}
      className="flex flex-row gap-5"
      key={item.id}
    >
      {item.name}
    </div>
  ));
  const handleservicechange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedserviceId = event.target.value;
    const selservice = getdata?.find((ser) => ser.name === selectedserviceId);
    Setselectedservice(selservice);
  };

  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChapterId = event.target.value;
    const selectedChapter = selectedSubject?.chapters.find(
      (chapter) => chapter.id === selectedChapterId
    );

    setchapid(selectedChapter);
  };
  const clearInputs = () => {
    setQuestion("");
    setCorrectAwn("");
    setAwnser1("");
    setAwnser2("");
    setAwnser3("");
    setAwnser4("");
  };
  const addQuestion = async () => {
    try {
      let requestData: QuestionRequestData = {
        questionName: question,
        awnsers: [awnser1, awnser2, awnser3, awnser4],
        correctAwnser: correctAwn,
      };

      if (selectedSubcategory && !selectedSubject && !getchapid) {
        // Subcategory selected
        requestData.subcategoryId = selectedSubcategory.id;
        await axios.post("/api/Service/subcatquestions", requestData);
      } else if (selectedSubject && !getchapid) {
        // Subject selected
        requestData.subjectsId = selectedSubject.id;
        await axios.post("/api/Service/Subjectquestions", requestData);
      } else if (getchapid) {
        // Chapter selected
        requestData.chaptersId = getchapid.id;
        await axios.post("/api/Service/Chapterquestions", requestData);
      } else {
        console.error("Please select a valid subcategory, subject, or chapter");
      }
      clearInputs();
      toast.success("Question saved successfully!");
    } catch (error) {
      console.error("Error saving question:", error);
      toast.error("Failed to save question.");
    }
  };

  return (
    <>
      <div className="flex flex-row items-center  ml-[570px] mb-10 gap-5">
        <div className=" flex ml-[-200px]">
          <h1 className="text-xl">Select Service</h1>
        </div>
        <div className=" flex ml-48">
          <select
            onChange={handleservicechange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select Service</option>
            {getdata.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className=" flex flex-col  gap-10">
        <div className=" flex flex-row rounded-md bg-white gap-14 shadow h-14 w-[600px] ml-[390px] items-center justify-center">
          <div className=" mt-1 ml-[-160px] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Categories
          </div>
          <div className="flex cursor-pointer flex-row overflow-hidden w-[250px] gap-5">
            {displaycategory}
          </div>
        </div>
        <div className="flex flex-row bg-white items-center shadow rounded-md   h-16 w-[600px] ml-[390px]">
          <div className=" ml-3">
            <button onClick={() => handleMoveLeft()}>
              {" "}
              <PlayIcon className="transform -scale-x-100" />
            </button>
          </div>
          <div className="overflow-hidden w-[300px] ml-[100px]">
            <div
              className="flex transition-transform duration-300 gap-10 "
              style={{
                transform: `translateX(${translateValue}px)`,
              }}
            >
              {set.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer w-[500px]"
                  onClick={() => handleSubcategoryClick(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <button onClick={() => handleMoveRight()} className=" ml-32">
              {" "}
              <PlayIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <div className=" absolute">
      {selectedSubcategory?.subject && selectedSubcategory.subject.length > 0 && (<div>
        <div className=" text-center w-[250px] h-[530px] ml-16 overflow-scroll  bg-white mb-10 shadow border-1 ">
          <div className=" flex flex-row gap-6 h-[50px] bg-gray-800 text-white justify-center items-center ">
            <div>
              <BookOpen />
            </div>
            <div>
              <h1 className="text-xl">Subjects</h1>
            </div>
          </div>
          
          <Sidebar
            rootStyles={{
              [`.${sidebarClasses.container}`]: {
                backgroundColor: "#ffffff",
              },
            }}
          >
            <Menu>
              <hr />
              {selectedSubcategory?.subject.map((subject) => (
                <div key={subject.id}>
                  <div
                    style={{
                      backgroundColor:
                        clickedSubjectId?.id === subject.id ? "Black" : "white",
                      color:
                        clickedSubjectId?.id === subject.id ? "white" : "Black",
                      cursor: "pointer",
                    }}
                    onClick={() => handlesubjectClick(subject)}
                  >
                    <hr />
                    <MenuItem> {subject.name}</MenuItem>
                  </div>
                </div>
              ))}

              <hr />
            </Menu>
          </Sidebar>
        </div>

      </div>)}
      </div>
      <div className="flex flex-row ml-96  gap-16 ">
   
       <div className=" flex">
        <div className=" bg-white shadow mt-8 h-[500px] w-[600px]  p-12 border-1">
          {selectedSubject?.chapters  && selectedSubject.chapters.length > 0 && (   <div className="w-[200px] ml-72 mb-10">
            <select
              id="countries"
              onChange={handleChapterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Select Chapter</option>
              {selectedSubject?.chapters?.map((chapter) => {
                return (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                );
              })}
            </select>
          </div>)}
      
      

          <div className=" flex flex-row gap-10 ">
            <div className="flex flex-col">
              <div>
                <p className=" font-semibold">Question</p>
                <input
                  value={question}
                  placeholder="Enter Awnser-5 Text"
                  className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div>
                <p className=" font-semibold">Awnser 1</p>
                <input
                  value={awnser1}
                  placeholder="Enter Awnser-5 Text"
                  className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                  onChange={(e) => setAwnser1(e.target.value)}
                />
              </div>
              <div>
                <p className=" font-semibold">Awnser 2</p>
                <input
                  value={awnser2}
                  placeholder="Enter Awnser-5 Text"
                  className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                  onChange={(e) => setAwnser2(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <p className=" font-semibold">Awnser 3</p>
                <input
                  value={awnser3}
                  placeholder="Enter Awnser-5 Text"
                  className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                  onChange={(e) => setAwnser3(e.target.value)}
                />
              </div>
              <div>
                <p className=" font-semibold">Awnser 4</p>
                <input
                  value={awnser4}
                  placeholder="Enter Awnser-5 Text"
                  className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                  onChange={(e) => setAwnser4(e.target.value)}
                />
              </div>
              <div>
                <p className=" font-semibold">Correct Awnser</p>
                <input
                  value={correctAwn}
                  placeholder="Enter Awnser-5 Text"
                  className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                  onChange={(e) => setCorrectAwn(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row ml-36 mt-12">
            <div>
              <button
                onClick={() => addQuestion()}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <SaveIcon className="me-2" />
                  <span>Save</span>
                </div>
              </button>
            </div>
            <div>
              <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                <div className="flex items-center">
                  <Undo className="me-2" />
                  <span>Reset</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default UploadQuestions;
