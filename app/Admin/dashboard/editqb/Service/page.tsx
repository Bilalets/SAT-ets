'use client'
import React, { useEffect, useState } from 'react';
import Category from '../Category/page';
import axios from 'axios';

interface Service {
  id: string;
  name: string;
}

const Service: React.FC = () => {
  const [getData, setData] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | undefined>();

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServiceId = event.target.value;
    const selService = getData.find((ser) => ser.id === selectedServiceId);
    setSelectedService(selService);
  };

  const fetchService = async () => {
    try {
      const res = await axios.get('/api/Allservices');
      setData(res.data);
    } catch (error) {
      console.error('Error fetching services data:', error);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  return (
    <div className='flex-row flex gap-5 ml-48'>
      <div>
        <select
          onChange={handleServiceChange}
          value={selectedService?.id || ''}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>
            Choose Service
          </option>
          {getData.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
         <Category id={selectedService?.id} name={selectedService?.name} />
      </div>
    </div>
  );
};

export default Service;
