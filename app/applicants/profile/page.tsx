"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Upload } from "lucide-react";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { getEmail } from "@/app/libs/myeail";
import { CldUploadWidget } from "next-cloudinary";
const Profile: React.FC = () => {
  const [username, setName] = useState<string>();
  const [fatherName, setFatherName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [picImage, setImage] = useState<string>();
  
  const handleUploadSuccess = (result:any) => {
    const imageUrl = result.info.secure_url; 
    setImage(imageUrl);
  };

  const userEmail = getEmail();
  const onSubmits = async () => {
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    const updateData: any = {
      name: username,
      email: userEmail,
      fatherName: fatherName,
      phoneNumber: phoneNumber,
      password: password,
      userpicture:picImage
    };
  
    // Include dateOfBirth only if it's not an empty string
    if (dateOfBirth) {
      updateData.dateOfBirth = dateOfBirth;
    }
  
    try {
      await axios.put("/api/updateuser/", updateData);
      toast.success("User updated successfully");
      closeModel();
      fetchUserData();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  const fetchUserData = useCallback(async () => {
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
  }, [userEmail]);

  // Call fetchUserData on component mount
  useEffect(() => {
    fetchUserData();
  }, [userEmail]);





  function closeModel() {
    setOpen(false);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-8 w-[400px] items-center justify-center">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Update User Profile
        </h2>
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="justify-center items-center ml-10">
            <label className="block text-gray-800 font-semibold text-sm">
              Update Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold text-sm">
                Update Father Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  onChange={(e) => setFatherName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-semibold text-sm">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-semibold text-sm">
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-semibold text-sm">
                Enter New Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold text-sm">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <CldUploadWidget
              uploadPreset="test_upload"
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => {
                return (
                  <div className=" mt-5 ">   
                <button
  className="flex gap-2 items-center justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
  onClick={() => open()}
>
  <Upload  />
  Upload Profile Picture
</button>

                 </div>
               
                );
              }}
            </CldUploadWidget>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-5">
          <button
            onClick={onSubmits}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Update
          </button>
          <button
            onClick={closeModel}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        userData.map((item) => (
          <div
            key={item?.id}
            className="mx-auto mt-10 lg:ml-96 px-4 sm:px-6 lg:px-8"
          >
            <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
              <div className="flex flex-col sm:flex-row px-4 py-5 sm:px-6">
                <div className="flex flex-col mt-10 sm:mt-0">
                  <div className="flex flex-row gap-5 items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      User Profile
                    </h3>
                    <div>
                      <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      >
                        <Pencil />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and information about user.
                  </p>
                </div>

                <div className="flex justify-center sm:justify-end mt-4 sm:mt-0 sm:ml-6">
                  <Image
                   src={item?.userpicture || "/images/Avatar.jpg"}
                    className="h-32 w-32 rounded-full  object-cover"
                    alt="User Avatar"
                    width={128}
                    height={128}
                  />
                </div>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {item?.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Father Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {item?.fatherName}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {item?.email}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {item?.phoneNumber}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formatDate(item?.dateofBirth)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))
      )}
      {open && modal}
    </div>
  );
};

export default Profile;
