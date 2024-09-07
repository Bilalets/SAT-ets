'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Qb from '../qb/page';
import FileUpload from '../Fileupload';

interface SubcatId {
  id: string | undefined;
}

interface Subject {
  id: string;
  name: string;
}


const Subjects: React.FC<SubcatId> = (props) => {
  const [getSubject, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | undefined>();


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


  const handleSubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubID = event.target.value;
    const selSub = getSubject.find((ser) => ser.id === selectedSubID);
    setSelectedSubject(selSub);
  };

  return (
    <>
      <div className='flex flex-row gap-5'>
        <div>
          <select
            value={selectedSubject?.id }
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
          {selectedSubject?.id &&  <FileUpload id={selectedSubject?.id} />}
         
        </div>
      </div>


<Qb id={selectedSubject?.id} />
      
    </>
  );
};

export default Subjects;
