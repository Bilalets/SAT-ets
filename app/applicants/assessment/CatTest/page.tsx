'use client'
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Button } from "flowbite-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import clsx from "clsx";

interface Questionbank {
  id: string;
  questionName: string;
  correctAwnser: string;
  awnsers: string[];
}

interface ID {
  id: string;
}

const fetchData = async (subcategoryid: string) => {
  try {
    const response = await axios.post(`/api/Service/Getsubcategoryquestions`, {
      subcategoryId: subcategoryid,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

const SuspenseLoading = () => <div>Loading...</div>;

const CategoryTest = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const subcategoryname = searchParams.get("subcategoryname");
  const subcategoryid = searchParams.get("subcategoryid");

  const [getData, setData] = useState<Questionbank[]>([]);
  const [userData, setUserData] = useState<ID | null>(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ percentage: 0, correctAnswers: 0 });
  const [remainingSeconds, setRemainingSeconds] = useState<number>(30);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      if (subcategoryid) {
        try {
          const data = await fetchData(subcategoryid);
          setData(data);
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchDataAndSetState();
  }, [subcategoryid]);

  const nextQuestion = useCallback(() => {
    if (activeQuestion < getData.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setRemainingSeconds(30);
    } else {
      setShowResult(true);
    }
  }, [activeQuestion, getData.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(timer);
          if (activeQuestion === getData.length - 1) {
            setShowResult(true);
          } else {
            nextQuestion();
          }
          return 30;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuestion, getData.length, nextQuestion]);

  const handleAnswerClick = (answer: string, index: number) => {
    setSelectedAnswerIndex(index);
    const isCorrect = answer === getData[activeQuestion].correctAwnser;

    const correctAnswers = isCorrect
      ? result.correctAnswers + 1
      : result.correctAnswers;
    const percentage = (correctAnswers / getData.length) * 100;

    setResult({
      percentage: parseFloat(percentage.toFixed(2)),
      correctAnswers,
    });
  };

  const savedata = async () => {
    try {
      await axios.post("/api/Usertestrecord/Savetestdata", {
        Percentage: result.percentage.toString(),
        Wrongawn: (getData.length - result.correctAnswers).toString(),
        Correctawn: result.correctAnswers.toString(),
        subcategoryname,
        userId: userData?.id,
      });
      toast.success("Quiz Saved Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state until data is fetched
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      {getData.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-3xl">Coming Soon</p>
        </div>
      ) : (
        <div className="flex-col justify-center text-center mt-10">
          <p className="text-2xl">Assessment</p>
          {showResult ? (
            <p>Time Up</p>
          ) : (
            <div>
              <p>
                Question: {activeQuestion + 1} / {getData.length}
              </p>
              <p>{remainingSeconds % 60} seconds</p>
            </div>
          )}
        </div>
      )}

      {!showResult && getData.length > 0 && (
        <div className="flex justify-center mt-4">
          <div className="w-full lg:max-w-[40%] rounded-md bg-white shadow">
            <div className="p-10 w-full">
              <p>Q: {getData[activeQuestion]?.questionName}</p>
              <ul className="pl-0">
                {getData[activeQuestion]?.awnsers?.map((answer, index) => (
                  <li key={index} className="mt-3">
                    <button
                      className={clsx(
                        "w-full p-2 border rounded border-gray hover:bg-gray-200",
                        selectedAnswerIndex === index && "bg-gray-700 text-white"
                      )}
                      onClick={() => handleAnswerClick(answer, index)}
                    >
                      {answer}
                    </button>
                  </li>
                ))}
              </ul>
              <Button
                onClick={nextQuestion}
                pill
                color="dark"
                className="mt-5 mb-5 float-right"
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === getData.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showResult && (
        <div className="flex justify-center mt-4">
          <div className="w-full lg:max-w-[40%] rounded-md bg-white shadow">
            <div className="p-10 w-full">
              <p className="text-xl">Result:</p>
              <p>Percentage: {result.percentage}%</p>
              <p>Correct Answers: {result.correctAnswers}</p>
              <p>Wrong Answers: {getData.length - result.correctAnswers}</p>
              <Button onClick={savedata} pill color="dark" className="mt-5">
                Submit Quiz
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<SuspenseLoading />}>
    <CategoryTest />
  </Suspense>
);

export default SuspenseWrapper;
