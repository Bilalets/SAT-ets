'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Disuser = () => {
    const [getuser, setuser] = useState<any[]>([])
    const [selectedRole, setSelectedRole] = useState<string>('')

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

    const filteredUsers = selectedRole
        ? getuser.filter(user => user.role.toLowerCase() === selectedRole.toLowerCase())
        : getuser

    return (
        <>
            <div className='mt-10 flex flex-row w-auto'>
                {/* Button group for filtering by role */}
          
                <div className="inline-flex rounded-md shadow-sm" role="group">
  <button type="button"  onClick={() => setSelectedRole('Admin')}
                        className={`px-4 py-2 text-sm font-medium ${selectedRole === 'Admin' ? 'bg-blue-700 text-white' : 'text-gray-900 bg-white'} border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}>
    Admin
  </button>
  <button type="button"  onClick={() => setSelectedRole('Applicant')}
                        className={`px-4 py-2 text-sm font-medium ${selectedRole === 'Applicant' ? 'bg-blue-700 text-white' : 'text-gray-900 bg-white'} border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}>
    Applicants
  </button>
  <button type="button"  onClick={() => setSelectedRole('')}
                        className="px-4 py-2 text-sm font-medium text-gray-900 rounded-e-lg bg-white border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    All Users
  </button>
</div>

                {/* Search Bar */}
                <div className='ml-[700px]'>
                    <form className="max-w-md mx-auto">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users" required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Table displaying filtered users */}
            <div className="relative overflow-x-auto mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
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
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">
                                    <p className={`w-24 px-4 py-2 text-center text-black rounded-md`} style={{'backgroundColor':user.role ==='admin'?'#ffc5cb':'#a5f5fc'}}>
                                        {user.role}
                                    </p>
                                </td>
                                <td className="px-6 py-4">{user?.status || 'Active'}</td>
                                <td className="px-6 py-4">{user.createdAt}</td>
                                <td className="px-6 py-4">
                                    <label className="inline-flex items-center mt-3 cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
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
