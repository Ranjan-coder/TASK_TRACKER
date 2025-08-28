import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios'

const CompletedTasks = () => {
  const [Data, setData] = useState()
  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`
}
useEffect(() => {

    const fetch = async()=>{
        const response = await axios.get('http://localhost:5055/api/task/getcompletetask',{
            headers,
        })
        setData(response.data.data);     
    }
    fetch()

},[])
  return (
    <div>
      <Cards home={"false"} Data={Data}/>
    </div>
  )
}

export default CompletedTasks