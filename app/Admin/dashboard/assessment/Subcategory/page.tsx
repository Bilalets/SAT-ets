'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Assessmentsubjects from '../Subjects/page';
import axios from 'axios';
import toast from 'react-hot-toast';
interface PageProps {
    name: string;
    id: string;
  }
  
  interface Subcat {
    name: string;
    id: string;
  }
  
const Assessmentsubcategory: React.FC<PageProps> = (props) => {
    const [subcategoryData, setSubcategoryData] = useState<Subcat[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedsubcategoryData,getsubcategoryData]=useState<Subcat>()

    const fetchSubcategoryData = useCallback(async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/Service/Getsinglesubcategories", {
          categoryId: props.id,
        });
        if (response.status === 200) {
          setSubcategoryData(response.data);
        }
      } catch (error) {
        toast.error("Error fetching Data");
      } finally {
        setLoading(false);
      }
    }, [props.id]);
  
    useEffect(() => {
      fetchSubcategoryData();
    }, [fetchSubcategoryData]);
    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedCategory = subcategoryData?.find(category => category.id === selectedId);
        getsubcategoryData(selectedCategory);
      };
  return (
    <>
    
    <div className="mt-5">
    <form className="max-w-sm mx-auto">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select a Subcategory
      </label>
      <select
      onChange={handleSubCategoryChange}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose a Subcategory</option>
        {subcategoryData?.map((sub) => (
              <option key={sub.id} value={sub.id} >
                {sub.name}
              </option>
            ))}
      </select>
    </form>
  </div>
  <div>
  {
    selectedsubcategoryData && 
    <Assessmentsubjects key={selectedsubcategoryData.id} subcatName={props.name} name={selectedsubcategoryData?.name} id={selectedsubcategoryData?.id} />
} 
  </div>
  </>
  )
}

export default Assessmentsubcategory;