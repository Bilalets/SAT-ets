import clsx from 'clsx';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'flowbite-react';
import axios from 'axios';


interface Questionbank {
  id: string;
  questionName: string;
  correctAwnser: string;
  awnsers: string[];
}
const quiz = {
  totalQuestions: 5,
  questions: [
    {
      id: 1,
      question: 'What is the capital of France?',
      answers: ['Madrid', 'Paris', 'Rome', 'Berlin'],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      question: 'What is the largest planet in our solar system?',
      answers: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
      correctAnswer: 'Jupiter',
    },
    {
      id: 3,
      question: 'What is the smallest country in the world?',
      answers: ['Monaco', 'Maldives', 'Vatican City', 'San Marino'],
      correctAnswer: 'Vatican City',
    },
    {
      id: 4,
      question: 'What is the most widely spoken language in the world?',
      answers: ['English', 'Mandarin', 'Spanish', 'Hindi'],
      correctAnswer: 'Mandarin',
    },
    {
      id: 5,
      question: 'Who is the founder of Microsoft?',
      answers: ['Steve Jobs', 'Bill Gates', 'Elon Musk', 'Mark Zuckerberg'],
      correctAnswer: 'Bill Gates',
    },
  ],
};

const TestStart = () => {
  let time = 30;
  let counter = 1;
  const [getData,setData]=useState<Questionbank[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/Service/Getsubjectquestions/`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
console.log(getData)

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    // score: 0,
    percentage: 0,
    correctAnswers: 0,
  });

  const [remainingSeconds, setRemainingSeconds] = useState<number>(time);
  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];
  const nextQuestion = useCallback(() => {
    counter++;
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
      setSelectedAnswerIndex(null);
      setRemainingSeconds(time);
    } else {
      setShowResult(true);
    }
  }, [activeQuestion, questions.length, time,counter]);
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(timer);
          if (activeQuestion === quiz.questions.length - 1) {
            setShowResult(true);
          } else {
            nextQuestion();
          }
          return time;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuestion, nextQuestion,time]);

  const handleAnswerClick = (answer: string, index: number) => {
    setSelectedAnswerIndex(index);
    const isCorrect = answer === correctAnswer;

    const totalQuestions = quiz.totalQuestions;
    const correctAnswers = isCorrect
      ? result.correctAnswers + 1
      : result.correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;

    setResult({
      percentage: parseFloat(percentage.toFixed(2)),
      correctAnswers: correctAnswers,
    });
  };

  const resetQuiz = () => {
    setActiveQuestion(0);
    setShowResult(false);

    setResult({ percentage: 0, correctAnswers: 0 });
    counter = 1;
    setRemainingSeconds(time);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex-col justify-center text-center mt-10">
        <p className="text-2xl">Assessment</p>

        {showResult || counter > quiz.questions.length - 1 ? (
          <p>Time Up</p>
        ) : (
          <div>
            <p>
              Question : {activeQuestion + 1} / {questions.length}
            </p>
            <p>{remainingSeconds % 60} seconds</p>
          </div>
        )}
      </div>
      {!showResult ? (
        <div className="flex justify-center mt-4">
          <div className="w-full lg:max-w-[40%] rounded-md bg-white shadow">
            <div className="p-10 w-full">
              <p>Q: {question}</p>
              <ul className="pl-0">
                {answers.map((answer, index) => (
                  <li key={index} className="mt-3">
                    <button
                      className={clsx(
                        'w-full p-2 border rounded border-gray hover:bg-gray-200',
                        selectedAnswerIndex === index &&
                          'bg-gray-700 text-white'
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
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          <div className="w-full lg:max-w-[40%] rounded-md bg-white shadow">
            <div className="p-10 w-full">
              <p className="text-xl">Result:</p>
              <p>Percentage: {result.percentage}%</p>
              <p>Correct Answers: {result.correctAnswers}</p>
              <p>Wrong Answers: {questions.length - result.correctAnswers}</p>

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

export default TestStart;
