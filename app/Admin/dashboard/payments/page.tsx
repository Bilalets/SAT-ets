'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface UserApplication {
  id: string;
  Name: string;
  isVerified: boolean;
  FatherName: string;
  Email: string;
  CNIC: string;
  Imageurl: string;
  DateOfBirth: string;
  MobileNumber: string;
  Qualification: string;
  Gender: string;
  Province: string;
  City: string;
  isViewed: boolean;
  registrationNumber: number;
}

const Payments = () => {
  const [userApplications, setUserApplications] = useState<UserApplication[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null); 
  const [getid, setid] = useState<string | null>(null); 
    const[loading,setloading]=useState(false)
  useEffect(() => {
    fetchUserApplications();
  }, []);

  const fetchUserApplications = async () => {
    try {
      const response = await axios.get('/api/Paymentverify');
      setUserApplications(response.data);
    } catch (error) {
      toast.error('Error Fetching Data');
    }
  };

  const handleViewedToggle = async (id: string) => {
    try {
        setloading(true)
      await axios.put(`/api/payment/updatepaymentviewed`, {
        id: id
      });
      setloading(false)
      fetchUserApplications(); // Refresh the data after update
      toast.success('Image Verified Successfully');
    } catch (error) {
      toast.error('Error Verifying');
    }
  };

  const handleVerifiedToggle = async (id: string) => {
    try {
      await axios.put(`/api/payment/updatepaymentverified`, {
        id: id
      });
      fetchUserApplications();
      toast.success('Verified Successfully') // Refresh the data after update
    } catch (error) {
      toast.error('Error Verifying')
    }
  };

  const openImageModal = (imageUrl: string, id: string) => {
    setSelectedImage(imageUrl);
    setid(id); // Set id here
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setShowImageModal(false);
  };

  const toggleDetailExpand = (id: string) => {
    if (expandedDetails === id) {
      setExpandedDetails(null);
    } else {
      setExpandedDetails(id);
    }
  };

  return (
    <>
      <h1 className='text-center mb-6 text-3xl'>Candidate Verification</h1>
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50">
          <div className="relative max-w-4xl max-h-screen overflow-auto bg-white rounded-lg shadow-lg">
            <div className=' flex justify-end mt-5'>
              <button type="button" onClick={() => handleViewedToggle(getid!)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loading?'Verifying':'Verify'}</button>

              <button
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={closeImageModal}
              >
                Close
              </button>
            </div>
            <div className="p-4">
              {selectedImage && (
                <Image src={selectedImage} alt="Application Image" layout="responsive" width={600} height={600} />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Registration #
              </th>
              <th scope="col" className="px-3 py-3">
                Name
              </th>
              <th scope="col" className="px-3 py-3">
                Payment Receipt
              </th>
              <th scope="col" className="px-3 py-3">
                View More Details
              </th>
              <th scope="col" className="px-3 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((application) => (
              <tr key={application.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className={application.isVerified && application.isViewed ? 'text-gray-700 px-3 pl-10 pr-10' : 'font-bold px-3 text-black pl-10 pr-10'}>
                  {application.registrationNumber}
                </td>
                <td className={application.isVerified && application.isViewed ? 'text-gray-700 px-3' : 'font-bold px-3 text-black'}>
                  {application.Name}
                </td>
                <td className="px-3 py-3">
                  <button onClick={() => openImageModal(application.Imageurl, application.id)}>View Receipt</button>
                </td>
                <td className="px-3 py-3">
                  <button onClick={() => toggleDetailExpand(application.id)}>
                    {expandedDetails === application.id ? 'Hide Details' : 'View Details'}
                  </button>
                  {expandedDetails === application.id && (
                    <div className="p-2 mt-2 bg-gray-100 dark:bg-gray-700">
                      <p>CNIC: {application.CNIC}</p>
                      <p>Date of Birth: {new Date(application.DateOfBirth).toLocaleDateString()}</p>
                      <p>City: {application.City}</p>
                      <p>Father&apos;s Name: {application.FatherName}</p>
                      <p>Gender: {application.Gender}</p>
                      <p>Email: {application.Email}</p>
                    </div>
                  )}
                </td>
                <td className="px-3 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={application.isVerified}
                      onChange={() => handleVerifiedToggle(application.id)}
                    />
                    <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-20 h-10 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-8 after:w-8 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-10 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0">
                    </div>
                  </label>
                  <div className='items-center'>
                    {application.isVerified ? 'Verified' : <strong className='ml-3 text-black'>Verify</strong>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Payments;
