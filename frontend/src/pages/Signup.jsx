import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'


const Signup = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  console.log(isLoggedIn);

  const [Data, setData] = useState({ username: "", email: "", password: "" })
  const navigate = useNavigate()

  const Change = (e)=>{
    const { name, value } = e.target
    setData({...Data, [name]: value });

  }

  if( isLoggedIn === true ){
    navigate('/')
  }

  const SubmitForm = async()=>{
    try {
      if(Data.username === "" || Data.email ==="" || Data.password === ""){
        alert("All Fields Are Required")
      }
      else{
        const response = await axios.post('http://localhost:5055/api/signup',Data)
        setData({username:"",email:"",password:""})
        alert(response.data.message)
        console.log(response)
        navigate('/login')
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }


  return (
    <div className='h-[98vh] flex items-center justify-center '>
      <div className='p-4 w-2/6 rounded bg-gray-800 '>
        <div className='text-2xl font-semibold'>Signup</div>
        <input type='username' name='username' placeholder='username' onChange={Change} value={Data.username} className='bg-gray-700 px-3 py-2 my-3 w-full rounded' />
        <input type='email' name='email' placeholder='email' onChange={Change} value={Data.email} required className='bg-gray-700 px-3 py-2 my-3 w-full rounded' />
        <input type='password' name='password' placeholder='password' onChange={Change} value={Data.password} className='bg-gray-700 px-3 py-2 my-3 w-full rounded' />
        <div className='w-full flex items-center justify-between'>
          <button onClick={SubmitForm} className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded'>Signup</button>
          <Link to="/login" className='text-gray-400 hover:text-gray-200' >Already Having An Account ? Login Here</Link>
        </div>
      </div>

    </div>
  )
}

export default Signup
