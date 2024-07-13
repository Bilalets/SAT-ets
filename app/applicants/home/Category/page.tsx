'use client'
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { ArrowDown } from "lucide-react";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Subcategory from "../Subcategory/page";
import { Spinner } from "flowbite-react";

// Define props interface
interface PageProps {
  name: string;
  id: string;
}

interface CategoryData {
  name: string;
  id: string;
  backgroundColor: string;
  textColor: string;
}

const Category: React.FC<PageProps> = (props) => {
  const [categoryData, setCategoryData] = useState<CategoryData[] | null>(null);
  const [Loading, isLoading] = useState<boolean>(false);
  

  const fetchCategoryData = useCallback(async () => {
    try {
      isLoading(false);
      const response = await axios.post("/api/Service/Getsinglecategory", {
        serviceId: props.id,
      });
      if (response.status === 200) {
        isLoading(true);
        setCategoryData(response.data);
      }
    } catch (error) {
      toast.error("Error fetching Data");
    }
  }, [props.id]);

 

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  return (
    <>
      {!Loading ?  <div><Spinner/></div> :(  <div className="align-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categoryData?.map((item) => (
          <div style={{
            backgroundColor: item.backgroundColor,
            color:item.textColor
          }} key={item.id} className={`text-center bg-${item.backgroundColor}-600 text-${item.textColor} p-4 m-2 rounded-lg shadow-xl`}>
            <h3 className={`text-lg font-bold `}>{item.name}</h3>
            <hr />
            {categoryData && <Subcategory name={item.name} id={item.id} />}
          </div>
        ))}
      </div>)}
    
    </>
  );
};

export default Category;
