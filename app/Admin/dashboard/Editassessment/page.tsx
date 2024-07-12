"use client";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Subject {
  count: number;
  name: string;
}

interface Assessment {
  id: string;
  name: string;
  takes: Record<string, number>;
  duration: number | null;
  Subcatname: string | null;
  totalquestions: number | null;
  subjects?: Record<string, Subject>;
}

const EditAssessment = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [hoveredAssessmentId, setHoveredAssessmentId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/createdassessment/");
      setAssessments(response.data);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentAssessment(null);
  };

  const deletequiz = async (id: string) => {
    try {
      const response = await axios.delete("/api/Deletequiz", {
        data: { id: id },
      });

      if (response.status === 200) {
        toast.success("Assessment Deleted Successfully");
        fetchData();
      } else {
        toast.error("Error Deleting Assessment");
      }
    } catch (error) {
      toast.error("Error Deleting Assessment");
    }
  };
  const calculateTotalPercentage = () => {
    if (!currentAssessment) return 0;
    let totalPercentage = 0;
    for (const key in currentAssessment.takes) {
      totalPercentage += currentAssessment.takes[key];
    }
    return totalPercentage;
  };

  const updateAssessment = async () => {
    if (currentAssessment) {
      const totalPercentage = calculateTotalPercentage();
      if (totalPercentage < 100) {
        toast.error("Please fill in percentages to total 100%.");
        return;
      } else if (totalPercentage > 100) {
        toast.error("Total percentage should not exceed 100%.");
        return;
      }

      try {
        const updatedTakes = Object.keys(currentAssessment.takes).reduce((acc, subjectName) => {
          const subject = Object.keys(currentAssessment.subjects ?? {}).find(key => currentAssessment.subjects?.[key].name === subjectName);
          if (subject) {
            acc[subject] = currentAssessment.takes[subjectName];
          }
          return acc;
        }, {} as Record<string, number>);

        const response = await axios.patch('/api/EditAssessment', {
          id: currentAssessment.id,
          takes: updatedTakes,
          totalquestions: currentAssessment.totalquestions,
          duration: currentAssessment.duration
        });

        if (response.status === 200) {
          toast.success("Assessment updated successfully");
          fetchData(); // Refresh the data after update
        } else {
          toast.error("Error updating assessment");
        }
      } catch (error) {
        toast.error("Error updating assessment");
      }
    }
  };

  const modal1 = (
    <div
      id="default-modal"
      aria-hidden="true"
      className={`fixed overflow-scroll top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full ${isModalVisible ? 'flex' : 'hidden'}`}
    >
      <div className="fixed inset-0 justify-center bg-black opacity-50"></div>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Assessment
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={handleCloseModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            {currentAssessment && (
              <>
                <p className="mb-4 text-sm text-gray-600">Editing assessment: <strong>{currentAssessment.name}</strong></p>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration Per Question</label>
                  <input type="number" value={currentAssessment.duration ?? ''} className="block w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" onChange={(e) => setCurrentAssessment({ ...currentAssessment, duration: Number(e.target.value) })} />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Questions</label>
                  <input type="number" value={currentAssessment.totalquestions ?? ''} className="block w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" onChange={(e) => setCurrentAssessment({ ...currentAssessment, totalquestions: Number(e.target.value) })} />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SUBJECT NAME</label>
                  <label className="block mb-2 text-sm font-medium ml-96 mt-[-25px] text-gray-900 dark:text-white">% From Each Subject</label>
                  {Object.entries(currentAssessment.takes).map(([subjectName, count]) => (
                    <div key={subjectName} className="flex mb-2 gap-2 ">
                      <span className="block w-1/2 p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500">{subjectName}</span>

                      <input type="number" value={count} className="block w-1/2 p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" onChange={(e) => {
                        const newTakes = { ...currentAssessment.takes, [subjectName]: Number(e.target.value) };
                        setCurrentAssessment({ ...currentAssessment, takes: newTakes });
                      }} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                updateAssessment();
                handleCloseModal();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        {modal1}
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            onMouseEnter={() => setHoveredAssessmentId(assessment.id)}
            onMouseLeave={() => setHoveredAssessmentId(null)}
            className="flex text-white flex-col gap-2 mb-12 w-60 sm:w-72 text-[10px] sm:text-xs z-50 ml-10"
          >
            <div>
              {hoveredAssessmentId === assessment.id && (
                <div
                  id="tooltip-default"
                  role="tooltip"
                  className="absolute z-10 ml-32 mt-[-40px] px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
                >
                  <p className="text-white">
                    Per Question Duration: {assessment.duration} Seconds, Total
                    Questions: {assessment.totalquestions}, Total Subjects: {Object.keys(assessment.takes).length}
                  </p>
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              )}
            </div>
            <div className="success-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-orange-500 px-[10px]">
              <div className="flex gap-2">
                <div>
                  <p className="text-white text-sm">
                    {assessment.name} - ({assessment.Subcatname})
                  </p>
                </div>
              </div>
              <div className="gap-6 flex">
                <button onClick={() => handleOpenModal(assessment)} className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear">
                  <Edit2 style={{ color: "white" }} />
                </button>
                <button
                  onClick={() => deletequiz(assessment.id)}
                  className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
                >
                  <Trash2 style={{ color: "white" }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditAssessment;
