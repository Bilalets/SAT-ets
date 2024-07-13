"use client";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import axios from "axios";
import useAppContext from "@/app/store/user";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DynamicLine = dynamic(() => import("./charts/Line"), {
  ssr: false,
  loading: () => <div className=" m-48"><Spinner size="lg" /></div>,
});
const DynamicPie = dynamic(() => import("./charts/Pie"), {
  ssr: false,
  loading: () => <div className=" m-28"><Spinner size="lg" /></div>,
});
const DynamicBargraph = dynamic(() => import("./charts/Bargraph"), {
  ssr: false,
  loading: () => <div className=" m-28"><Spinner size="lg" /></div>,
});
const DynamicPiechart = dynamic(() => import("./charts/Piechart"), {
  ssr: false,
  loading: () => <div className=" m-28"><Spinner size="lg" /></div>,
});

interface Record {
  Percentage: string;
  Correctawn: string;
  Wrongawn: string;
  subjectname: string;
}

interface Position {
  rank: number | null;
  message?: string;
}

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
    
  }, [router]);
  const { getData } = useAppContext();

  const [getrecord, setrecord] = useState<Record[]>();
  const [values, setValues] = useState({
    Excellentvalues: [] as number[],
    Bestvalues: [] as number[],
    Bettervalues: [] as number[],
    Goodvalues: [] as number[],
    Averagevalues: [] as number[],
    worstvalues: [] as number[],
  });
  const [getposition, setposition] = useState<Position>({ rank: null });
  const [loading, setLoading] = useState(true);
  const [positionError, setPositionError] = useState<string | null>(null);
  const[loadingpostion,setloadingpostion]=useState(true)
  useEffect(() => {
    const fetchPosition = async () => {
      try {
        setloadingpostion(true);
        const res = await axios.post('/api/Userposition', {
          userId: getData?.id,
        });
        setposition(res.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setPositionError('You have given no test to display position');
        } else {
         
        }
      } finally {
        setloadingpostion(false);
      }
    };
  
    fetchPosition();
  }, [getData]);
  

  useEffect(() => {
    const fetchResult = async () => {
      if (!getData?.id) return;

      setLoading(true);
      try {
        const response = await axios.post(
          "/api/Service/Subrecord",
          { userId: getData?.id },
          { headers:  { cache: 'no-cache'} } 
        );
        setrecord(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [getData]);

  const totalPercentage =
    getrecord?.reduce((total, item) => {
      return total + parseInt(item.Percentage);
    }, 0) ?? 0;

  const averagePercentage = totalPercentage / (getrecord?.length || 1);
  const formattedAveragePercentage = averagePercentage.toFixed(2);

  const displayrecord = useCallback((): void => {
    const newValues = {
      Excellentvalues: [] as number[],
      Bestvalues: [] as number[],
      Bettervalues: [] as number[],
      Goodvalues: [] as number[],
      Averagevalues: [] as number[],
      worstvalues: [] as number[],
    };

    getrecord?.forEach((item) => {
      const pars = parseFloat(item.Percentage);

      if (pars >= 90) {
        newValues.Excellentvalues.push(pars);
      } else if (pars >= 80) {
        newValues.Bestvalues.push(pars);
      } else if (pars >= 70) {
        newValues.Bettervalues.push(pars);
      } else if (pars >= 60) {
        newValues.Goodvalues.push(pars);
      } else if (pars >= 33) {
        newValues.Averagevalues.push(pars);
      } else {
        newValues.worstvalues.push(pars);
      }
    });

    setValues(newValues);
  }, [getrecord]);

  useEffect(() => {
    displayrecord();
  }, [displayrecord]);

  return (
    <>
    <div className="flex flex-col mt-10 lg:ml-9 sm:flex-row md:ml-1 sm:mr-2">
  <div className="w-full sm:w-[270px] max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="mb-4">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white text-center">
        Overall Records
      </h5>
    </div>
    <div className="flow-root">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="w-8 h-8"
                src="/images/No.png"
                alt="Neil image"
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                No of Attempts
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {loading ? (
                <div className="ml-2 sm:ml-4"><Spinner size="lg" /></div>
              ) : (
                getrecord?.length || 0
              )}
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="w-8 h-8 rounded-full"
                src="/images/Best.png"
                alt="Bonnie image"
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Excellent Attempts
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {loading ? (
                <div className="ml-2 sm:ml-4"><Spinner size="lg" /></div>
              ) : (
                values?.Excellentvalues?.length
              )}
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="w-8 h-8 rounded-full"
                src="/images/bestattempt.png"
                alt="Bonnie image"
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Best Attempts
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {loading ? (
                <div className="ml-2 sm:ml-4"><Spinner size="lg" /></div>
              ) : (
                values?.Bestvalues.length
              )}
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="w-8 h-8 rounded-full"
                src="/images/pass.png"
                alt="Michael image"
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Better Attempts
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {loading ? (
                <div className="ml-2 sm:ml-4"><Spinner size="lg" /></div>
              ) : (
                values?.Bettervalues.length
              )}
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="w-8 h-8 rounded-full"
                src="/images/m.png"
                alt="Bonnie image"
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Good Attempts
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {loading ? (
                <div className="ml-2 sm:ml-4"><Spinner size="lg" /></div>
              ) : (
                values?.Goodvalues.length
              )}
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="w-8 h-8 rounded-full"
                src="/images/avg.png"
                alt="Bonnie image"
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Average Attempts
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {loading ? (
                <div className="ml-2 sm:ml-4"><Spinner size="lg" /></div>
              ) : (
                values?.Averagevalues.length
              )}
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="w-8 h-8 rounded-full"
                src="/images/dislike.png"
                alt="Thomas image"
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Worst Attempts
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {loading ? (
                <div className="ml-2 sm:ml-4"><Spinner size="lg" /></div>
              ) : (
                values?.worstvalues.length
              )}
            </div>
          </div>
        </li>
      </ul>
      <div className="ml-5 mt-6 font-semibold text-center sm:text-left">
        Your Position:{" "}
        {loadingpostion ? (
          <div className="mt-2 sm:mt-0"><Spinner size="lg" /></div>
        ) : positionError ? (
          positionError
        ) : (
          getposition?.rank
        )}
      </div>
      <div className="ml-5 mt-3 font-semibold text-center sm:text-left">
        Overall Ratio: {formattedAveragePercentage}%
      </div>
    </div>
  </div>

  <div className="flex flex-col  mt-6 sm:mt-0 sm:ml-6">
    <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow ">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white text-center lg:mt-36 mt-7 md:mt-7 sm:mt-7">
        Overall Monthly Performance
      </h5>
      <div className="h-full lg:w-[1150px]">
        <DynamicLine />
      </div>
    </div>
  </div>
</div>

<div className="flex flex-col lg:ml-7 mt-8 md:ml-0 sm:flex-row">
  <div className="w-full sm:w-[240px] h-[400px] ml-0 sm:ml-2 mt-6 sm:mt-0">
    <div className="flex flex-col lg:w-[267px] items-center bg-white border border-gray-200 rounded-lg shadow h-full">
      <div className="mt-5 mb-2">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mt-4 text-center">
          Last Test Accuracy
        </h5>
      </div>
      <div className="h-[300px] w-[290px] mt-[10px]">
        <DynamicPiechart />
      </div>
    </div>
  </div>

  <div className="w-full sm:w-[830px] h-[400px]  sm:ml-8 mt-6 sm:mt-0">
    <div className="bg-white border border-gray-200 rounded-lg shadow  lg:ml-7 h-full">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white text-center mt-7">
        Subject Performance
      </h5>
      <div className="h-full">
        <DynamicBargraph />
      </div>
    </div>
  </div>

  <div className="w-full sm:w-[330px] h-[400px] ml-0 sm:ml-4 mt-6 sm:mt-0">
    <div className="bg-white border border-gray-200 rounded-lg lg:ml-3  shadow h-full">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mt-4 text-center">
        Overall Stats in Pie
      </h5>
      <div className="ml-8">
        <DynamicPie />
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default Dashboard;
export const fetchCache = 'force-no-store';
