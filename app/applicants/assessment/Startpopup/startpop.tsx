import React from 'react';

const StartPop = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className='flex justify-center mt-32'>
    <div className=" bg-white p-10 h-80 w-[800px] shadow-md border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Test Instructions</h1>
      <ul className="text-left mb-4 list-disc">
        <li className="mb-2">
          <strong>Read Carefully:</strong> Please read each question thoroughly before selecting your answer.
        </li>
        <li className="mb-2">
          <strong>Time Limit:</strong> This test is timed. Make sure to keep an eye on the timer as you progress.
        </li>
        <li className="mb-2">
          <strong>Answer Submission:</strong> Once you select an answer, you can move to the next question. You will not be able to go back and change your answers.
        </li>
      </ul>
      <div>
        <button
          onClick={onStart}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Start Test
        </button>
      </div>
    </div>
    </div>
  );
};

export default StartPop;
