'use client'
import React, { useEffect, useState } from "react";
import Subjects from "../Subjects/page";
import axios from "axios";

interface Category{
  id:string|undefined
}
interface subcategory{
  name:string;
  id:string;
}
const Subcategory:React.FC<Category> = (props) => {
  const [getSubcategory,setSubcategory]=useState<subcategory[]>([])
  const [getselectedsubcat,setselectedsubcat]=useState<subcategory|undefined>()
  useEffect(() => {
    const fetchSubCategory = async () => {
      if (!props.id) return;
      try {
        const res = await axios.post('/api/Service/Getsinglesubcategories', { categoryId: props.id });
        setSubcategory(res.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchSubCategory();
  }, [props.id]);


  const handleSubcatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedsubcatID = event.target.value;
    const selsubcat = getSubcategory.find((ser) => ser.id === selectedsubcatID);
    setselectedsubcat( selsubcat);
  };

  return (
    <div className="flex flex-row gap-5">
      <div>
        <select
        onChange={handleSubcatChange}
        value={getselectedsubcat?.id}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose Subcategory</option>
          {getSubcategory.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div><Subjects id={getselectedsubcat?.id}/></div>
    </div>
  );
};

export default Subcategory;
