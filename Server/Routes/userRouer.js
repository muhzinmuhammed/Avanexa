import express from "express";
import { userSignup,loginUser,userSingupVerifyOtp } from "../Controller/userController.js";
import { getUserPost,AddPost,deletPost,handleSearch } from "../Controller/PostController.js";

const userRouer = express.Router();


/*user register*/
userRouer.post("/register", userSignup);
/*user register*/

/*user login*/
userRouer.post("/login", loginUser);

/*user login*/

/*user login with otp*/
userRouer.post("/signup_verify", userSingupVerifyOtp);
/*user login with otp*/

/*add post*/
userRouer.post('/add_post',AddPost)
/*add post*/

/*get post*/
userRouer.get('/get_post/:id',getUserPost)
/*get post*/

/*delete post*/
userRouer.delete('/delete_post/:id',deletPost)

/*delete post*/




export default userRouer;