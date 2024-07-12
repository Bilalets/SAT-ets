'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Assessmentsubcategory from '../Subcategory/page';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PageProps {
  name: string;
  id: string;
}

interface CategoryData {
  name: string;
  id: string;
}

const Assessmentcat: React.FC<PageProps> = (props) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData>();

  const fetchCategoryData = useCallback(async () => {
    try {
      setLoading(false);
      const response = await axios.post('/api/Service/Getsinglecategory', {
        serviceId: props.id,
      });
      if (response.status === 200) {
        setLoading(true);
        setCategoryData(response.data);
      }
    } catch (error) {
      toast.error('Error fetching Data');
    }
  }, [props.id]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedCategory = categoryData?.find(category => category.id === selectedId);
    setSelectedCategory(selectedCategory);
  };

  return (
    <>
      <div className="mt-5">
        <form className="max-w-sm mx-auto">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select a Category
          </label>
          <select
            id="categories"
            onChange={handleCategoryChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose a Category</option>
            {categoryData?.map(cat => (
  <option key={cat.id} value={cat.id}>
    {cat.name}
  </option>
))}
          </select>
        </form>
      </div>
      <div className="mt-5">
        {selectedCategory && <Assessmentsubcategory name={selectedCategory?.name} id={selectedCategory?.id} />}
      </div>
    </>
  );
};

export default Assessmentcat;
