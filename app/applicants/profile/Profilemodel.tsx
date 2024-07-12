import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";


const Profilemodel: React.FC = () => {
  const { data: session, status } = useSession();
  const [username, setName] = useState<string>();
  const [setfather, setfatherName] = useState<string>();
  const [setPhone, setPhoneNumber] = useState<string>();

  const onSubmits = async () => {
    try {
      await axios.put("/api/updateuser/", {
        name: username,
        email: `${session?.user?.email}`,
        fatherName: setfather,
        phoneNumber: setPhone,
      });
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-8 w-[400px] items-center justify-center">
        <h2 className="text-xl font-semibold mb-4 text-center ">Update User Profile</h2>
        <div className="bg-gray-100  p-6 rounded-lg ">
          <div className="justify-center items-center ml-10">
            <label className="block text-gray-800 font-semibold text-sm">
              Update Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="inputname"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
              />
            </div>
            <div>
              <div>
                <label className="block text-gray-800 font-semibold text-sm">
                  Update Father Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="inputname"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-semibold text-sm">
                  Phone-Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="inputname"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
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
                    name="inputname"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
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
                    name="inputname"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-gray-800 font-semibold text-sm">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="inputname"
                      className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
        onClick={onSubmits}
          type="button"
          className="text-white bg-[#050708]  ml-32 hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profilemodel;
