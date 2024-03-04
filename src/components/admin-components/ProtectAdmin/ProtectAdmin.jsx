"use client";
import { authContext } from '@/context/authContext/AuthProvider'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const ProtectAdmin = ({children}) => {
  const {logInfo} = useContext(authContext);
  const router = useRouter();

  if(logInfo?.role === "admin"){
    return children;
  }else if(logInfo?.role === "user"){
    return router.push("/dashboard/user");
  }else{
    return <div className='flex w-[70vw] items-center justify-center min-h-[80vh]'>
      <span className='loading text-center loading-bars'></span>
    </div>
  }
}

export default ProtectAdmin
