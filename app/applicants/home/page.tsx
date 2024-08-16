"use client";
import React from "react";
import { ArrowDownRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Spinner } from "flowbite-react";
import useAppContext from "../../store/user";
import Category from "./Category/page";

const Home = () => {
  const { allServicesData, loading } = useAppContext();

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Spinner />
        </div>
      ) : (
        <div className="relative">
          <div className="flex flex-col gap-5 justify-center mt-10 ml-1">
            {allServicesData?.map((item) => (
              <div key={item.id}>
                <div className="inline-block px-7 text-xl border bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between gap-4">
                    <span>{item.name}</span>
                    <ArrowDownRight />
                  </div>
                </div>
                <Category name={item.name} id={item.id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
export const fetchCache = 'force-no-store';
