import AddPost from "../Components/UserComponets/AddPost/AddPost"
import NavbarHeader from "../Components/UserComponets/Navbar/Navbar"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AddPosts = () => {
  const navigate=useNavigate()
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (!parseData) {
      navigate("/login");
    }else{
      navigate("/add_post");

    }
  }, [navigate]);
  return (
    <>
    <NavbarHeader/>
    <AddPost/>
      
    </>
  )
}

export default AddPosts
