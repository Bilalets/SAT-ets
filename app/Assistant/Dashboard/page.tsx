"use client";

import axios from "axios";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LogOutIcon,
  PlayIcon,
  Redo,
  SaveIcon,
  Undo,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import Slider from "react-slick";
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

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
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

const Questionbankhome: React.FC = () => {
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
  const { data: session } = useSession();


  const SamplePrevArrow: React.FC<ArrowProps> = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,  display: "block", backgroundColor: "black"  }}
        onClick={onClick}
      />
    );
  };
  
  const SampleNextArrow: React.FC<ArrowProps> = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", backgroundColor: "black" }}
        onClick={onClick}
      />
    );
  };
  var settings = {
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow />
  };


  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

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
      const response = await axios.get("/api/Allservices/");

      const data = response.data;
      setdata(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


 
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
    if (!question || !correctAwn || !awnser1 || !awnser2 || !awnser3 || !awnser4) {
      alert("Please fill in all fields before saving the question.");
      return; 
    }
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
      <h1>Logged in as {session?.user?.name}</h1>
      <div className="flex flex-row m-5">
        <button
          onClick={() => handleSignOut()}
          className="flex flex-row text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Logout
          <span>
            <LogOutIcon />
          </span>
        </button>
      </div>
      <div className="flex flex-row items-center  ml-[690px] mb-10 gap-5">
        <div className=" flex ml-[-300px]">
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
        <div className=" flex flex-row rounded-md bg-white gap-14 shadow h-14 w-[700px] ml-[390px] items-center justify-center">
          <div className=" mt-1 ml-[-160px] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Categories
          </div>
          <div className="flex cursor-pointer flex-row overflow-hidden w-[250px] gap-5">
            {displaycategory}
          </div>
        </div>
        <div className="flex flex-row bg-white items-center shadow rounded-md h-20 w-[700px] ml-[390px]">
          
        <div className="flex ml-52 justify-center items-center" >
                  <div className="w-60  justify-center items-center text-center ">
                    <Slider {...settings} >
                      {selectedcattegory?.subcategory.map((sub) => (
                        <div
                          className="justify-center items-center"
                          key={sub.id}
                        >
                          <button
                             onClick={() => handleSubcategoryClick(sub)}
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          >
                         {sub.name}
                          </button>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
        
        </div>
      </div>

      <div className="flex flex-row gap-16  ">
        <div className=" text-center w-[250px] h-[530px]  ml-20 bg-white mb-10 shadow border-1 overflow-scroll ">
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
                <div key={subject.id} >
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

        <div className=" bg-white shadow mt-8 h-[500px] w-[700px]  p-12 border-1">
          <div className="w-[200px] ml-80 mb-10">
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
          </div>
          <div className=" flex flex-row gap-10 ">
            <div className="flex flex-col">
              <div>
                <p className=" font-semibold">Question</p>
                <input
                  value={question}
                  placeholder="Enter Awnser-5 Text"
                  className="bg-gray-100 w-80 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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
  

    </>
  );
};

export default Questionbankhome;
