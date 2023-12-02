
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/UserComponets/SignUp/Signup";
import UserOtp from "./Components/UserComponets/SignUp/Otp";
import './App.css'
import Login from "./Components/UserComponets/Login/Login";
import HomePage from "./Pages/HomePage";
import AddPosts from "./Pages/AddPost";

import SavedPostPage from "./Pages/SavedPostPage";

function App() {
  

  return (
    <>
    <Router>
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/user_otp" element={<UserOtp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/add_post" element={<AddPosts/>}/>
      <Route path="/saved_post/:id" element={<SavedPostPage/>}/>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
