import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {


    const { auth , setAuth} = useAuth()
    console.log(auth);
    
  return (
    <div>
      <h1>helo</h1>
    </div>
  )
}

export default Dashboard
