'use client'
import React from 'react';

import dynamic from 'next/dynamic';
const BoardDynamic = dynamic(() => import('./Data/Data'), {
  ssr: false,
})

const Mainpage = () => {
 
 

  return (
    <>
<BoardDynamic/>
    </>
  );
};

export default Mainpage;
