import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { FaCheckDouble } from "react-icons/fa6"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/Auth';
import axios from 'axios';


const SideBar = () => {

    const Dispatch = useDispatch()
    const navigate = useNavigate()


    const data = [
        {title:"All Task",
        icon: <CgNotes />,
         link:"/",
         

        },
        {title:"completed Task",
            icon: <FaCheckDouble/>,
         link:"/completedTasks",
        },
    ]

    const [Data, setData] = useState()

    const Logout = ()=>{
        Dispatch(authActions.logout());
        localStorage.clear('id')
        localStorage.clear('token')
        alert('Logout Successfully')
        navigate('/login')

    }


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

    },[])
    


  return (
    <>
    {Data && (
        <div>
        <h2 className='text-xl font-semibold'>{Data.username}</h2>
        <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
        <hr/>
        </div>
    )}
        <div >
            {data.map((items,index)=>(
                <Link to={items.link} key={index} className='my-2 flex items-center hover:bg-gray-600 rounded transition-all'>{items.icon}&nbsp;{items.title}</Link>
            ))}
        </div>
        <div>
            <button className='bg-gray-600 w-full p-2 rounded' onClick={Logout}>LOG OUT</button>
        </div>

    </>
  )
}

export default SideBar
