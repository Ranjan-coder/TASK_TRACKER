import React from "react"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import axios from "axios";


const Cards = ({ home,setInputdiv,Data, setUpdatedData }) => {


  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`
}

  const handleCompletedTask = async (id)=>{
    try {
      await axios.put(`http://localhost:5055/api/task/completemarked/${id}`,{},
        {headers}
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (id,title,desc)=>{
    try {
      setInputdiv('fixed')
      setUpdatedData({id: id, title: title , desc: desc })
    } catch (error) {
      console.error(error)
    }

  }

  const handleDelete = async (id)=>{
    try {
      await axios.delete(`http://localhost:5055/api/task/delete/${id}`,
        {headers}
      )
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {Data && Data.map((items, index) => (
        <div key={index} className=" flex flex-col justify-between bg-gray-800 rounded p-4">
          <div>
            <h3 className="text-xl font-semibold" >{items.title}</h3>
            <p className="text-gray-300 my-2">{items.desc}</p>
          </div>
          <div className="mt-4 w-full flex items-center">
            <button onClick={()=>handleCompletedTask(items._id)} className={` ${items.complete === false ? "bg-red-400" : "bg-green-400"}  p-2 rounded`}>
              {items.complete === true ? "Completed" : "In Completed"}
              </button>
            <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
              {home !== "false" &&
               <button onClick={()=>handleEdit(items._id,items.title,items.desc)}><FaEdit /></button>
                }
              <button onClick={()=>handleDelete(items._id)}><MdDelete /></button>
            </div>
          </div>
        </div>))}
      {home === "true" && (
        <button onClick={()=> setInputdiv("fixed")} className="flex flex-col justify-center items-center bg-gray-800 rounded-5m p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300">
          <IoAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-2">Add Task </h2>
        </button>
      )}

    </div>
  )
}

export default Cards
