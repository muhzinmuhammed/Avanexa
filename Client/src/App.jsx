
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/UserComponets/SignUp/Signup";
import UserOtp from "./Components/UserComponets/SignUp/Otp";
import './App.css'
import Login from "./Components/UserComponets/Login/Login";
import HomePage from "./Pages/HomePage";
import AddPosts from "./Pages/AddPost";

import SavedPostPage from "./Pages/SavedPostPage";
import EditPostPage from "./Pages/EditPostPage";
import NotFoundPage from "./Pages/404";

function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* signup page */}
          <Route path="/signup" element={<Signup />} />
          {/* otp page */}
          <Route path="/user_otp" element={<UserOtp />} />
          {/* login page */}
          <Route path="/login" element={<Login />} />
          {/* Home page */}
          <Route path="/" element={<HomePage />} />
          {/* Add Post page */}
          <Route path="/add_post" element={<AddPosts />} />
          {/* Saved Post page */}
          <Route path="/saved_post/:id" element={<SavedPostPage />} />
          {/* edit post page */}
          <Route path="/edit_post/:id" element={<EditPostPage />} />
          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
