import React from 'react'
import Disuser from './Displayusers/Disuser';

const Users = () => {
  return (
    <>
    <div className='flex w-auto shadow-sm bg-white font-bold text-2xl border h-24 justify-center items-center mt-[-70px] ml-[-20px] '>All Users</div>
    <Disuser/>
    </>
  )
}

export default Users;