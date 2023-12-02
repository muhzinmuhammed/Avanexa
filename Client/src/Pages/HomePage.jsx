import { useEffect } from 'react';
import NavbarHeader from '../Components/UserComponets/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import Home from '../Components/UserComponets/Home/Home'


const HomePage = () => {
  const navigate=useNavigate()
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    console.log(parseData,"lllll");
    if (!parseData) {
      navigate("/login");
    }else{
      navigate("/");

    }
  }, [navigate]);
  return (
    <>
    
    <NavbarHeader/>
    <Home/>
      
    </>
  )
}

export default HomePage
