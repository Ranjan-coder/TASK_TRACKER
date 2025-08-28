import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoAddCircle } from "react-icons/io5";
import InputData from '../components/Home/InputData';
import axios from 'axios';


const AllTasks = () => {

  const [Data, setData] = useState()
  const [inputdiv, setInputdiv] = useState("hidden")
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  })

  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`
}
useEffect(() => {

    const fetch = async()=>{
        // const response = await axios.get('http://localhost:5055/api/task/alltask',{
        //     headers,
        // })
        const response = await axios.get('https://task-tracker-knhi.onrender.com/api/task/alltask',{
            headers,
        })
        setData(response.data.data);        
    }

    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch()
    }

},[Data,inputdiv,updatedData,headers])

  return (
    <>
    <div>

    <div className='w-fill flex justify-end px-4 py-2'>
      <button onClick={()=> setInputdiv("fixed")}> <IoAddCircle className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300'/></button>

      </div>
      { Data && <Cards home={"true"} setInputdiv={setInputdiv} Data={Data.tasks} setUpdatedData={setUpdatedData}/> }
    </div>
    <InputData inputdiv={inputdiv} setInputdiv={setInputdiv} updatedData={updatedData} setUpdatedData={setUpdatedData} />
    </>
  )
}

export default AllTasks