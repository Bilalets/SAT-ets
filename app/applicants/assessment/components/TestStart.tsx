import clsx from 'clsx';
import React, { useState } from 'react';
import { Button } from 'flowbite-react';

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

const MyAssessment = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const handleAnswerClick = (answer: string, index: number) => {
    setSelectedAnswerIndex(index);
    const isCorrect = answer === correctAnswer;
    setResult((prevResult) => ({
      ...prevResult,
      score: isCorrect ? prevResult.score + 5 : prevResult.score,
      correctAnswers: isCorrect
        ? prevResult.correctAnswers + 1
        : prevResult.correctAnswers,
      wrongAnswers: !isCorrect
        ? prevResult.wrongAnswers + 1
        : prevResult.wrongAnswers,
    }));
  };

  const nextQuestion = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
      setSelectedAnswerIndex(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuestion(0);
    setShowResult(false);
    setResult({ score: 0, correctAnswers: 0, wrongAnswers: 0 });
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex-col  justify-center text-center mt-10">
        <p className="text-2xl">Assessment</p>
        Question : {activeQuestion + 1}
        <span> / {questions.length}</span>
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
                      disabled={selectedAnswerIndex !== null}
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
        <div className="text-center mt-8">
          <p>Result:</p>
          <p>Score: {result.score}</p>
          <p>Correct Answers: {result.correctAnswers}</p>
          <p>Wrong Answers: {result.wrongAnswers}</p>
          <Button onClick={resetQuiz} pill color="dark" className="mt-5">
            Restart Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyAssessment;
