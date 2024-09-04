'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface SubcatId {
  id: string | undefined;
}

interface Subject {
  id: string;
  name: string;
}

interface Question {
  id: string;
  questionName: string;
  awnsers: string[];
  correctAwnser: string;
  subjectsId: string;
}

const Subjects: React.FC<SubcatId> = (props) => {
  const [getSubject, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | undefined>();
  const [getQuestion, setQuestions] = useState<Question[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedQuestion, setEditedQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchSub = async () => {
      if (!props.id) return;
      try {
        const res = await axios.post('/api/Service/Getsinglesubject', { subcategoryId: props.id });
        setSubjects(res.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchSub();
  }, [props.id]);

  const fetchQB = async () => {
    if (!selectedSubject?.id) return;
    try {
      const res = await axios.post('/api/FindQB', { subjectid: selectedSubject.id });
      setQuestions(res.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const editqb = async () => {
    if (!editedQuestion) return;
    try {
      await axios.put('/api/EditQB', editedQuestion);
     
      const updatedQuestions = getQuestion.map(q =>
        q.id === editedQuestion.id ? editedQuestion : q
      );
      setQuestions(updatedQuestions);
      setIsEditing(null);
      toast.success('Updated Successfully')
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };
  const deleteqb = async (id: string) => {
    try {
      await axios.delete('/api/DeleteQB', { data: { id } });
      // Remove the deleted question from the state
      const updatedQuestions = getQuestion.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
      toast.success('Deleted Successfully');
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Error deleting question');
    }
  };
  const handleSubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubID = event.target.value;
    const selSub = getSubject.find((ser) => ser.id === selectedSubID);
    setSelectedSubject(selSub);
  };

  const handleEditClick = (question: Question) => {
    setIsEditing(question.id);
    setEditedQuestion(question);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditedQuestion(null);
  };

  const handleSaveEdit = () => {
    editqb();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Question) => {
    if (editedQuestion) {
      setEditedQuestion({
        ...editedQuestion,
        [field]: e.target.value
      });
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (editedQuestion) {
      const newAnswers = [...editedQuestion.awnsers];
      newAnswers[index] = e.target.value;
      setEditedQuestion({
        ...editedQuestion,
        awnsers: newAnswers
      });
    }
  };

  return (
    <>
      <div className='flex flex-row gap-5'>
        <div>
          <select
            value={selectedSubject?.id || ''}
            onChange={handleSubChange}
            id="subjects"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose Subjects</option>
            {getSubject.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={fetchQB}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Search
          </button>
        </div>
      </div>
      {getQuestion.length > 0 && (
        <div className="absolute ml-[-700px] mt-20 border rounded-lg">
          <div className="overflow-scroll h-96 flex w-[1000px] shadow-md sm:rounded-lg">
            <table className="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">No#</th>
                  <th scope="col" className="px-6 py-3">Question</th>
                  {getQuestion[0]?.awnsers?.map((_, index) => (
                    <th key={index} scope="col" className="px-6 py-3">Answer {index + 1}</th>
                  ))}
                  <th scope="col" className="px-6 py-3">Correct Answer</th>
                  <th scope="col" className="px-6 py-3 no-underline">Edit</th>
                  <th scope="col" className="px-6 py-3 no-underline">Delete</th>
                </tr>
              </thead>
              <tbody>
                {getQuestion.map((item, index) => (
                  <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {isEditing === item.id ? (
                        <input
                          type="text"
                          value={editedQuestion?.questionName || ''}
                          onChange={(e) => handleInputChange(e, 'questionName')}
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      ) : (
                        item.questionName
                      )}
                    </td>
                    {item.awnsers.map((answer, answerIndex) => (
                      <td key={answerIndex} className="px-6 py-4">
                        {isEditing === item.id ? (
                          <input
                            type="text"
                            value={editedQuestion?.awnsers[answerIndex] || ''}
                            onChange={(e) => handleAnswerChange(e, answerIndex)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        ) : (
                          answer
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4">
                      {isEditing === item.id ? (
                        <input
                          type="text"
                          value={editedQuestion?.correctAwnser || ''}
                          onChange={(e) => handleInputChange(e, 'correctAwnser')}
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      ) : (
                        item.correctAwnser
                      )}
                    </td>
                    <td className="px-6 py-4 cursor-pointer">
                      {isEditing === item.id ? (
                        <>
                          <button onClick={handleSaveEdit} className="font-medium text-green-600 dark:text-green-500 ">Save</button>
                          <button onClick={handleCancelEdit} className=" font-medium text-red-600 dark:text-red-500">Cancel</button>
                        </>
                      ) : (
                        <p onClick={() => handleEditClick(item)} className="font-medium text-blue-600 dark:text-blue-500 ">Edit</p>
                      )}
                    </td>
                    <td className="px-6 py-4 cursor-pointer">
                      <p onClick={()=>deleteqb(item.id)} className="font-medium text-red-600 dark:text-red-500 ">Delete</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Subjects;
