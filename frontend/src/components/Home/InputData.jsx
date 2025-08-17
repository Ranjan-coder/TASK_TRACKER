import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";


const InputData = ({inputdiv,setInputdiv,updatedData,setUpdatedData}) => {

  const [Data, setData] = useState({title:"",desc:""})


  const change = (e)=>{
    const {name,value} = e.target
    setData({...Data, [name] : value })
  }

  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`
}

  const submitData = async()=>{
    if(Data.title === "" || Data.desc === ""){
      alert("All Fields Are Required");
    }else{
      await axios.post('http://localhost:5055/api/task/createtask',Data,{headers})
      setData({title:"",desc:""})
      setInputdiv("hidden")
    }
  }

  useEffect(()=>{
    setData({title: updatedData.title,desc: updatedData.desc})
  },[updatedData])


  const updateTask = async ()=>{
    if(Data.title === "" || Data.desc === ""){
      alert("All Fields Are Required");
    }else{
      await axios.put(`http://localhost:5055/api/task/update/${updatedData.id}`,Data,{headers})
      setUpdatedData({
        id: "",
        title: "",
        desc: "",
      });
      setData({title:"",desc:""});
      setInputdiv("hidden")
    }
  }

  return (
    <>
      <div className={`${inputdiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full `}></div>
      <div className={`${inputdiv} top-0 left-0 flex items-center justify-center h-screen w-full `}>
        <div className='w-2/6 bg-gray-900 p-4 rounded'>
        <div className='flex justify-end '>
          <button onClick={()=> {setInputdiv("hidden");
          setData({title: "", desc: ""});
          setUpdatedData({
            id: "",
            title: "",
            desc: "",
          })

          } }
          className='text-2xl' >
            <RxCross2 />
            </button>
          </div>
          <input type='text' placeholder='Title' name='title' value={Data.title} onChange={change}
           className='px-3 py-2 rounded w-full bg-gray-700 my-3' /> 
          <textarea type='text' name='desc' value={Data.desc} onChange={change} cols="30" rows="10" placeholder='Description.....' 
          className='px-3 py-2 rounded w-full bg-gray-700 my-3' />
          {updatedData.id === "" ? (
            <button onClick={submitData}
            className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold'>
             Submit</button>
          ) : (
            <button onClick={updateTask}
         className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold'>
          Update</button>
          )}
        
        
        </div>
      </div>
    </>
  )
}

export default InputData