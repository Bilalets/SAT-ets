"use client";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import Subcategory from "../Subcategory/page";

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
  isShown: boolean;
}

const Category: React.FC<PageProps> = (props) => {
  const [categoryData, setCategoryData] = useState<CategoryData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategoryData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/Service/Getsinglecategory", {
        serviceId: props.id,
      });
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [props.id]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="align-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categoryData?.map((item) => (
            item.isShown ? ( // Check if item should be shown
              <div
                key={item.id}
                style={{
                  backgroundColor: item.backgroundColor,
                  color: item.textColor,
                }}
                className={`text-center p-4 m-2 rounded-lg shadow-xl`}
              >
                <h3 className="text-lg font-bold">{item.name}</h3>
                <hr />
                <Subcategory name={item.name} id={item.id} />
              </div>
            ) : null
          ))}
        </div>
      )}
    </>
  );
};

export default Category;
