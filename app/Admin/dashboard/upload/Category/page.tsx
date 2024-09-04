'use client'
import React, { useEffect, useState } from 'react';
import Subcategory from '../Subcategory/page';
import axios from 'axios';

interface Service {
  id: string | undefined;
  name: string | undefined;
}

interface CategoryItem {
  id: string | undefined;
  name: string | undefined;
}

const Category: React.FC<Service> = (props) => {
  const [getCat, setCat] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!props.id) return;
      try {
        const res = await axios.post('/api/Service/Getsinglecategory', { serviceId: props.id });
        setCat(res.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategory();
  }, [props.id]);

  const handleCatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCatId = event.target.value;
    setSelectedCategory(selectedCatId);
  };

  return (
    <div className='flex flex-row gap-5'>
      <div>
        <select
          onChange={handleCatChange}
          value={selectedCategory || ''}
          id="categories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>
            Choose Category
          </option>
          {getCat.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div><Subcategory id={selectedCategory} /></div>
    </div>
  );
};

export default Category;
