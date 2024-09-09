'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Disuser = () => {
    const [getuser, setuser] = useState<any[]>([])
    const [selectedRole, setSelectedRole] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')

    const fetchuser = async () => {
        try {
            const res = await axios.get('/api/Alluser')
            setuser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchuser()
    }, [])

    // Filter users by role and search term
    const filteredUsers = getuser
        .filter(user => 
            (selectedRole ? user.role.toLowerCase() === selectedRole.toLowerCase() : true) &&
            (searchTerm ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
        )

    // Toggle user status between 'active' and 'inactive'
    const toggleStatus = async (userId: string, currentStatus: boolean) => {
        try {
            // Toggle the status
            const newStatus = !currentStatus;
    
            // Send the update request to the API
            await axios.put('/api/Userstatus', { id: userId, status: newStatus });
    
            // Refresh the user list
            fetchuser();
            
            toast.success('Status updated successfully');
        } catch (error) {
            console.error('Error updating user status', error);
            toast.error('Failed to update status');
        }
    };

    return (
        <>
            <div className='mt-10 flex flex-row w-auto'>
                {/* Button group for filtering by role */}
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" onClick={() => setSelectedRole('Admin')}
                        className={`px-4 py-2 text-sm font-medium ${selectedRole === 'Admin' ? 'bg-blue-700 text-white' : 'text-gray-900 bg-white'} border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700`}>
                        Admin
                    </button>
                    <button type="button" onClick={() => setSelectedRole('Applicant')}
                        className={`px-4 py-2 text-sm font-medium ${selectedRole === 'Applicant' ? 'bg-blue-700 text-white' : 'text-gray-900 bg-white'} border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700`}>
                        Applicants
                    </button>
                    <button type="button" onClick={() => setSelectedRole('')}
                        className="px-4 py-2 text-sm font-medium text-gray-900 rounded-e-lg bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700">
                        All Users
                    </button>
                </div>

                {/* Search Bar */}
                <div className='ml-auto'>
                    <form className="max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div className="relative">
                            <input 
                                type="search"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search Users" 
                            />
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Table displaying filtered users */}
            <div className="relative overflow-x-auto mt-10">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Enroll</th>
                            <th scope="col" className="px-6 py-3">Activate/Deactivate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">
                                    <p className={`w-24 px-4 py-2 text-center text-black rounded-md`} style={{ backgroundColor: user.role === 'admin' ? '#ffc5cb' : '#a5f5fc' }}>
                                        {user.role}
                                    </p>
                                </td>
                                <td className="px-6 py-4">{user.status? 'Active' : "Deactive"}</td>
                                <td className="px-6 py-4">{user.createdAt.slice(0, -14)}</td>
                                <td className="px-6 py-4">
                                  
     {/* Conditionally render the toggle button based on the user's role */}
     {user.role !== 'admin' && (
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    checked={user.status}
                                    onChange={() => toggleStatus(user.id, user.status)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Disuser;
