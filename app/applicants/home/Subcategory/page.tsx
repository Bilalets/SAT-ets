"use client"
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Spinner } from "flowbite-react";

interface PageProps {
  name: string;
  id: string;
}

interface Subcat {
  name: string;
  id: string;
  isShown:boolean
}

const Subcategory: React.FC<PageProps> = (props) => {
  const [subcategoryData, setSubcategoryData] = useState<Subcat[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <>
      {loading ? (
        <div><Spinner /></div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
      {subcategoryData?.map((item) => (
  item.isShown && (
    <div key={item.id} className="w-full grid-cols-1 sm:grid-cols-2 mt-4">
      <section className="flex gap-2">
        <div className="mt-2 rounded-xl bg-white w-[7px] h-[7px]"></div>
        <Link href={{ pathname: `/applicants/assessment/Test`, query: { name: item.name } }} passHref>
          <p className="break-words whitespace-normal text-sm sm:text-base md:text-sm lg:text-sm max-w-xs cursor-pointer">
            {item.name}
          </p>
        </Link>
      </section>
    </div>
  )
))}

        </div>
      )}
    </>
  );
};

export default Subcategory;
