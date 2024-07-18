'use client'
import clsx from 'clsx';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import useAppContext from '@/app/store/user';
import toast from 'react-hot-toast';
import Image from 'next/image';

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
  const searchParams = useSearchParams();
  const subjectname = searchParams.get("name");
  const { getData } = useAppContext();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  // Timer state initialized with assessment duration from API response
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const fetchAssessment = async () => {
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
  }, [subjectname]);

  const savetestresult = useCallback(async () => {
    try {
      const percentage = ((result.correctAnswers / (assessment?.questions.length || 1)) * 100).toFixed(0);
      await axios.post('/api/Usertestrecord/Savetestdata', {
        userId: getData?.id,
        Percentage: percentage,
        Wrongawn: result.wrongAnswers.toString(),
        Correctawn: result.correctAnswers.toString(),
        subjectname: subjectname,
        Totalquestion:assessment?.questions.length.toString()
      });
      toast.success('Quiz Result Saved Successfully');
    } catch (error) {
      console.error('Error saving quiz result:', error);
      toast.error('Failed to save quiz result. Please try again.');
    }
  }, [result, assessment?.questions.length, getData?.id, subjectname]);

  useEffect(() => {
    if (showResult) {
      savetestresult();
    }
  }, [showResult, savetestresult]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

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
  }, [timeLeft, assessment, activeQuestion]);

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

  if (error) {
    return <div className='flex justify-center items-center h-screen' ><Image src="/images/red.png" className=' rounded-lg' alt='img' width={500} height={500}/></div>;
  }

  if (!assessment) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (assessment.questions.length === 0) {
    return <div className="text-center">No assessment found for &#39;{subjectname}&#39;</div>;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex-col justify-center text-center mt-10">
        <p className="text-2xl">Assessment for {subjectname}</p>
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
              <p>Q: {assessment.questions[activeQuestion].questionName}</p>
              <ul className="pl-0">
                {assessment.questions[activeQuestion].answers.map((answer, index) => (
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
                disabled={selectedAnswerIndex === null && timeLeft !== null && timeLeft > 0}
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
              <p className="text-xl">Result:</p>
              <p>Percentage: {((result.correctAnswers / assessment.questions.length) * 100).toFixed(0)}%</p>
              <p>Correct Answers: {result.correctAnswers}</p>
              <p>Wrong Answers: {result.wrongAnswers}</p>
              <Button onClick={resetQuiz} pill color="dark" className="mt-5">
                Restart Quiz
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AssessmentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyAssessment />
    </Suspense>
  );
};

export default AssessmentPage;
