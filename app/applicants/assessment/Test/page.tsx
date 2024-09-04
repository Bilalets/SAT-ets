'use client';

import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAppContext from '@/app/store/user';
import toast from 'react-hot-toast';
import Image from 'next/image';
import StartPop from '../Startpopup/startpop'; // Import the StartPop component

interface AssessmentQuestion {
  id: string;
  questionId: string;
  questionName: string;
  answers: string[];
  correctAnswer: string;
  subjectsId: string;
  assessmentId: string;
  createdAt: string;
  updatedAt: string;
}

interface Assessment {
  id: string;
  name: string;
  totalquestions: number | null;
  createdAt: string;
  updatedAt: string;
  questions: AssessmentQuestion[];
  duration?: number; // Make duration optional
}

const MyAssessment = () => {
  const { getData } = useAppContext();
  const router = useRouter();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  // Timer state initialized with assessment duration from API response
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const subjectname = searchParams.get("id");
     
     
      if (!subjectname) {
        setError('No subject name provided');
        return;
      }

      try {
        const response = await fetch(`/api/fetchquiz/${encodeURIComponent(subjectname)}`);
        if (!response.ok) {
          throw new Error('Coming Soon');
        }
        const data: Assessment = await response.json();
        setAssessment(data);
        setTimeLeft(data.duration || null); // Set duration in seconds
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchAssessment();
  }, []);

  const savetestresult = useCallback(async () => {
    try {
      const percentage = ((result.correctAnswers / (assessment?.questions.length || 1)) * 100).toFixed(2);
      await axios.post('/api/Usertestrecord/Savetestdata', {
        userId: getData?.id,
        Percentage: percentage,
        Wrongawn: result.wrongAnswers.toString(),
        Correctawn: result.correctAnswers.toString(),
        subjectname: new URLSearchParams(window.location.search).get("name"),
        Totalquestion: assessment?.questions.length.toString(),
        catname:new URLSearchParams(window.location.search).get("catname")
      });
      toast.success('Quiz Result Saved Successfully');
    } catch (error) {
      console.error('Error saving quiz result:', error);
      toast.error('Failed to save quiz result. Please try again.');
    }
  }, [result, assessment?.questions.length, getData?.id]);

  useEffect(() => {
    if (showResult) {
      savetestresult();
    }
  }, [showResult, savetestresult]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || !testStarted) return; // Check if test has started

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime && prevTime <= 1) {
          clearInterval(timer);
          // Check if there are more questions
          if (assessment && activeQuestion < assessment.questions.length - 1) {
            setActiveQuestion(activeQuestion + 1);
            setSelectedAnswerIndex(null);
            setTimeLeft(assessment.duration || null); // Reset timer for the next question
          } else {
            setShowResult(true);
          }
          return 0;
        }
        return prevTime ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, assessment, activeQuestion, testStarted]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!showResult) {
        event.preventDefault();
        event.returnValue = ''; 
        savetestresult();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !showResult) {
        savetestresult();
        router.replace('/applicants/home');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showResult, savetestresult, router]);

  const handleAnswerClick = (answer: string, index: number) => {
    setSelectedAnswerIndex(index);
    const isCorrect = answer === assessment?.questions[activeQuestion].correctAnswer;
    setResult((prevResult) => ({
      ...prevResult,
      score: isCorrect ? prevResult.score + 5 : prevResult.score,
      correctAnswers: isCorrect ? prevResult.correctAnswers + 1 : prevResult.correctAnswers,
      wrongAnswers: !isCorrect ? prevResult.wrongAnswers + 1 : prevResult.wrongAnswers,
    }));
  };

  const nextQuestion = () => {
    if (assessment && activeQuestion < assessment.questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
      setSelectedAnswerIndex(null);
      setTimeLeft(assessment.duration || null); // Reset timer for the next question
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuestion(0);
    setShowResult(false);
    setResult({ score: 0, correctAnswers: 0, wrongAnswers: 0 });
    setTimeLeft(assessment?.duration || null); // Reset timer
  };

  const startTest = () => {
    setTestStarted(true);
  };

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Image src="/images/red.png" className='rounded-lg' alt='img' width={500} height={500} />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (assessment.questions.length === 0) {
    return (
      <div className="text-center">
        No assessment found
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      {!testStarted ? (
        <StartPop onStart={startTest} /> // Show StartPop before the test
      ) : (
        <div>
          <div className="flex-col justify-center text-center mt-10">
            <p className="text-2xl">Test Assessment</p>
            {showResult ? (
              <p>Time Up</p>
            ) : (
              <div>
                <p>
                  Question: {activeQuestion + 1} / {assessment.questions.length}
                </p>
                <p>{timeLeft !== null ? `${timeLeft} seconds remaining for current question` : ''}</p>
              </div>
            )}
          </div>
          {!showResult ? (
            <div className="flex justify-center mt-4">
              <div className="w-full lg:max-w-[40%] rounded-md bg-white shadow">
                <div className="p-10 w-full">
                  <p style={{ userSelect: 'none' }}>Q: {assessment.questions[activeQuestion].questionName}</p>
                  <ul className="pl-0" style={{ userSelect: 'none' }}>
                    {assessment.questions[activeQuestion].answers?.map((answer, index) => (
                      <li key={index} className="mt-3">
                        <button
                          className={clsx(
                            'w-full p-2 border rounded border-gray hover:bg-gray-200',
                            selectedAnswerIndex === index && 'bg-gray-700 text-white'
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
                    disabled={selectedAnswerIndex === null && timeLeft !== null}
                  >
                    {activeQuestion === assessment.questions.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <div className="w-full lg:max-w-[40%] rounded-md bg-white shadow">
                <div className="p-10 w-full">
                  <p className='font-bold text-2xl'>Result</p>
                  <p>
                    Overall Result Percentage {(result.correctAnswers / assessment.questions.length) * 100}%
                  </p>
                  <p>
                    Total Question: <span className="font-bold">{assessment.questions.length}</span>
                  </p>
                  <p>
                    Correct Answer: <span className="font-bold">{result.correctAnswers}</span>
                  </p>
                  <p>
                    Wrong Answer: <span className="font-bold">{result.wrongAnswers}</span>
                  </p>
                  <div className='flex flex-row gap-2'>
                    <Button
                      pill
                      color="dark"
                      className="mt-5 mb-5 float-right"
                      onClick={resetQuiz}
                    >
                      Restart Quiz
                    </Button>
                    <Button
                      pill
                      color="dark"
                      className="mt-5 mb-5 float-right"
                      href={'/applicants/home'}
                    >
                      Back To Home
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAssessment;
