import Home from "./Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { authActions } from "./store/Auth";


function App() {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)

  const Dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('id') && localStorage.getItem('token')){
      Dispatch(authActions.login())
    }else if( isLoggedIn === false ){
      navigate('/login')
    }

  },[])
  
  
  return (
    <>
      <h1 className="bg-gray-900 text-white h-screen p-2 relative">
        <Routes>
          <Route exact path="/" element={<Home />}>
          <Route index element={<AllTasks />}/>
              <Route path="/completedTasks" element={<CompletedTasks />} />
            </Route>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>

        </Routes>

      </h1>
    </>
  );
}

export default App;
