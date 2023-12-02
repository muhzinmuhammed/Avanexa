import express from "express";
import { userSignup,loginUser,userSingupVerifyOtp } from "../Controller/userController.js";
import { getUserPost,AddPost,deletPost,handleSearch, userSavedPost, userUnSavedPost, savedPosts, editPost, updatePost } from "../Controller/PostController.js";


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

/*search post*/
userRouer.post('/search',handleSearch)
/*search post*/


/*saved post*/
userRouer.patch('/post_save/:id',userSavedPost)

/*saved post*/

/*unsaved post*/
userRouer.patch('/post_unsave/:id',userUnSavedPost)

/*unsaved post*/


/*user saved post*/
userRouer.get('/saved_post/:id',savedPosts)

/*user saved post*/

/*edit post*/
userRouer.get('/edit_post/:id',editPost)

/*edit post*/

userRouer.put('/upate_post/:id',updatePost)



export default userRouer;