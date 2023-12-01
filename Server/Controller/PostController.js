import { log } from "console";
import PostModel from "../Models/PostModel.js";

/*Add Post */

const AddPost =async(req,res)=>{
    try {
      
        const {title,description,content,imageUrl,filesUrl,userId} =req.body
        const newPost= new PostModel({
            title,
            description,
            content,
            imageUrl,
            filesUrl,
            userId


        })
        await newPost.save()

        if (newPost) {
            return res.status(200).json({newPost})
            
        }else{
            return res.status(500).json({Message:"Some error"})
        }


        
    } catch (error) {
        console.log(error);
        
    }
}
/*Add Post */


/*get Post*/

const getUserPost=async(req,res)=>{
    try {
       
        const {id}=req.params
        console.log(id);
       
        const posts=await PostModel.find({userId:id}).populate('userId')
        if (posts) {
            return res.status(200).json({posts})
            
        }  
        
    } catch (error) {
        res.status(400).json(error.message)
        console.log(error);
        
    }
}

/*get Post*/


/* delete post*/
const deletPost=async(req,res)=>{
    try {
        const {id}=req.params
        const userPost=await PostModel.find({_id:id})
        if (userPost) {
            await PostModel.findByIdAndDelete(id)

            res.status(200).json("POst deleted successfully");
            
        }else {
            res.status(500).json({ message: "no Post to display" });
          }
        
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}
/* delete post*/


/*search post*/

const handleSearch = async (req, res, next) => {
    const {searchItem} = req.body;
    
  try {
    const results = await PostModel.find({$text: {$search: searchItem}});
   
    res.status(200).json({results});
   
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};



/*search*/



export {AddPost,getUserPost,deletPost,handleSearch}