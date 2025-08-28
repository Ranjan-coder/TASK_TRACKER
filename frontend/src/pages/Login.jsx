import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { authActions } from './../store/Auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)

  const [Data, setData] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const Dispatch = useDispatch()

  const Change = (e)=>{
    const { name, value } = e.target
    setData({...Data, [name]: value });

  }

  if( isLoggedIn === true ){
    navigate('/')
  }

  const SubmitForm = async()=>{
    try {
      if( Data.email ==="" || Data.password === "" ){
        alert("All Fields Are Required")
      }
      else{
        // const response = await axios.post('http://localhost:5055/api/login',Data)
        const response = await axios.post('https://task-tracker-knhi.onrender.com/api/login',Data)
        setData({ email:"",password:"" })
        alert(response.data.message)
        localStorage.setItem("id",response.data.userId)
        localStorage.setItem("token",response.data.token)
        Dispatch(authActions.login())
        navigate('/')
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className='h-[98vh] flex items-center justify-center '>
        <div className='p-4 w-2/6 rounded bg-gray-800 '>
        <div className='text-2xl font-semibold'>Login</div>
        <input type='email' name='email' placeholder='Email' onChange={Change} value={Data.email} className='bg-gray-700 px-3 py-2 my-3 w-full rounded'/>
        <input type='password' name='password' placeholder='password' onChange={Change} value={Data.password} className='bg-gray-700 px-3 py-2 my-3 w-full rounded'/>
          <div className='w-full flex items-center justify-between'>
        <button onClick={SubmitForm} className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded'>Login</button>
            <Link to="/signup" className='text-gray-400 hover:text-gray-200' >Not Having An Account ? Signup Here</Link>
          </div>
        </div>

    </div>
  )
}

export default Login
