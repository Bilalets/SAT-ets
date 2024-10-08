"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Modal, Button } from "flowbite-react";
import useAppContext from "@/app/store/user";
import { getEmail } from "@/app/libs/myeail";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";

interface Record {
  Percentage: string;
  Correctawn: string;
  Wrongawn: string;
  subjectname: string;
  createdAt: string;
  Totalquestion: string;
  catname?: string;
}

const Cards = () => {
  const { getData } = useAppContext();
  const [getRecord, setRecord] = useState<Record[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const userEmail = getEmail();
 
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) return;

      try {
        setLoading(true);
        const res = await axios.get(`/api/getprofile/${userEmail}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]);
  
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.post(
          "/api/Service/Subrecord",
          { userId: getData?.id },
          { headers: { "Cache-Control": "no-store" } }
        );
        setRecord(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchResult();
  }, [getData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleViewClick = (record: Record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    const input = document.getElementById("pdf-content") as HTMLElement;

    html2canvas(input, { scale: 2 }) // Increase the scale for better quality
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        // Calculate the height ratio
        const imgRatio = imgWidth / imgHeight;
        const pdfRatio = pdfWidth / pdfHeight;

        let finalWidth = pdfWidth;
        let finalHeight = pdfWidth / imgRatio;

        if (finalHeight > pdfHeight) {
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * imgRatio;
        }

        pdf.addImage(imgData, "PNG", 0, 0, finalWidth, finalHeight);
        pdf.save("result-card.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1200px] p-4 items-center ml-0 md:ml-0 sm:ml-0 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              History
            </h5>
          </div>
        </div>

        {getRecord.map((item, index) => (
          <Card key={index} className="m-5 w-full max-w-[1200px]">
            <div className="flex justify-between">
              <p className="text-base md:text-lg">{index + 1}</p>
            </div>
            <hr />
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <Table.Head>
                  <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">
                    Percentage
                  </Table.HeadCell>
                  <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">
                    Subject Name
                  </Table.HeadCell>
                  <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">
                    Category Name
                  </Table.HeadCell>
                  <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">
                    Wrong Answers
                  </Table.HeadCell>
                  <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">
                    Correct Answers
                  </Table.HeadCell>
                  <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">
                    Date
                  </Table.HeadCell>
                  <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">
                    Time
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">
                      {" "}
                      {parseFloat(item.Percentage).toFixed(0)}%
                    </Table.Cell>
                    <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">
                      {item.subjectname}
                    </Table.Cell>
                    <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">
                      {item?.catname}
                    </Table.Cell>
                    <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">
                      {item.Wrongawn}
                    </Table.Cell>

                    <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">
                      {item.Correctawn}
                    </Table.Cell>
                    <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">
                      {formatDate(item.createdAt)}
                    </Table.Cell>
                    <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">
                      {formatTime(item.createdAt)}
                    </Table.Cell>
                    <Button
                      onClick={() => handleViewClick(item)}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      View & Download Result
                    </Button>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Card>
        ))}
      </div>

      {selectedRecord && userData && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-row justify-center items-center rounded min-h-screen bg-gray-100">
            <div
              id="pdf-content"
        
              className="bg-white  p-2 gap-8  shadow-lg w-[1000px] h-[700px] max-w-md"
            >
              <div className="flex gap-8 mt-6  items-center ">
                <div className="flex gap-4  justify-center flex-row">
                  <div className="flex ml-8 mt-5 text-xl ">
                    {/* <Image
                      src={"/images/ETS.png"}
                      width={350}
                      height={250}
                      alt="image"
                      className="flex object-fill"
                    /> */}
                    Logo Here
                  </div>

                  <div className="flex ml-[-30px] mt-6 w-full flex-col">
                    <h1 className="  text-center underline   font-bold mt-2">
                      Eagle Testing Service{" "}
                    </h1>
                    <h2 className="  text-center   font-bold">
                      Self Assessment Test
                    </h2>
                    <h2 className=" text-center  font-bold">RESULT CARD</h2>
                    <h2 className="text-center font-bold">
                      {selectedRecord.catname}
                    </h2>
                  </div>
                  <div>
                    {userData.map((item, index) => (
                      <div className="flex mt-5 " key={index}>
                        <Image
                          className="  flex "
                          key={index}
                          src={item.userpicture}
                          width={200}
                          height={20}
                          alt="image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {userData.map((item, index) => (
                <div className="mb-4 ml-8 mt-2" key={index}>
                  <p>
                    <strong>Name: </strong>
                    {item.name}
                  </p>
                  <p>
                    <strong>Father Name: </strong>
                    {item.fatherName}
                  </p>
                  <p>
                    <strong>CNIC: </strong>
                    {item.Cnic}
                  </p>
                </div>
              ))}

              <div className="mb-4 ml-8">
                <table className="w-auto border">
                  <thead>
                    <tr>
                      <th className="border p-2">Subject</th>
                      <th className="border p-2">Test Date</th>
                      <th className="border p-2">Total Score</th>
                      <th className="border p-2">Score Obtained</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">
                        {selectedRecord.subjectname}
                      </td>
                      <td className="border p-2">
                        {formatDate(selectedRecord.createdAt)}
                      </td>
                      <td className="border p-2">
                        {selectedRecord.Totalquestion}
                      </td>
                      <td className="border p-2">
                        {selectedRecord.Correctawn}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mb-4 mt-8 ml-8">
                <h3 className=" font-bold">Obtained Score Detail:</h3>
                <table className="w-full border mt-2">
                  <thead>
                    <tr>
                      <th className="border p-2">Total MCQS</th>
                      <th className="border p-2">Correct Answers</th>
                      <th className="border p-2">Wrong Answers</th>
                      <th className="border p-2">Percentage%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">
                        {selectedRecord.Totalquestion}
                      </td>
                      <td className="border p-2">
                        {selectedRecord.Correctawn}
                      </td>
                      <td className="border p-2">{selectedRecord.Wrongawn}</td>
                      <td className="border p-2">
                        {selectedRecord.Percentage}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h1 className=" font-bold ml-8 text-sm">
                Note: This result card is valid for 2 years from date of test
              </h1>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setIsModalOpen(false)} className="mr-2">
              Close
            </Button>
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Cards;
export const fetchCache = "force-no-store";
