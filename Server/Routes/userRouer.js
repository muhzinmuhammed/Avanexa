import express from "express";
import { userSignup,loginUser,userSingupVerifyOtp } from "../Controller/userController.js";
import { getUserPost,AddPost,deletPost,handleSearch, userSavedPost, userUnSavedPost, savedPosts, editPost, updatePost } from "../Controller/PostController.js";
import { protect } from "../Middleware/protection.js";

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
userRouer.post('/add_post',protect,AddPost)
/*add post*/

/*get post*/
userRouer.get('/get_post/:id',protect,getUserPost)
/*get post*/

/*delete post*/
userRouer.delete('/delete_post/:id',protect,deletPost)

/*delete post*/

/*search post*/
userRouer.post('/search',protect,handleSearch)
/*search post*/


/*saved post*/
userRouer.patch('/post_save/:id',protect,userSavedPost)

/*saved post*/

/*unsaved post*/
userRouer.patch('/post_unsave/:id',protect,userUnSavedPost)

/*unsaved post*/


/*user saved post*/
userRouer.get('/saved_post/:id',protect,savedPosts)

/*user saved post*/

/*edit post*/
userRouer.get('/edit_post/:id',protect,editPost)

/*edit post*/

userRouer.put('/upate_post/:id',protect,updatePost)



export default userRouer;