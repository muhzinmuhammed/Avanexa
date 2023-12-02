import { log } from "console";
import PostModel from "../Models/PostModel.js";

/*Add Post */

const AddPost = async (req, res) => {
    try {

        const { title, description, content, imageUrl, filesUrl, userId } = req.body
        const newPost = new PostModel({
            title,
            description,
            content,
            imageUrl,
            filesUrl,
            userId


        })
        await newPost.save()

        if (newPost) {
            return res.status(200).json({ newPost })

        } else {
            return res.status(500).json({ Message: "Some error" })
        }



    } catch (error) {
        console.log(error);

    }
}
/*Add Post */


/*get Post*/

const getUserPost = async (req, res) => {
    try {

        const { id } = req.params
        console.log(id);

        const posts = await PostModel.find({ userId: id }).populate('userId')
        if (posts) {
            return res.status(200).json({ posts })

        }

    } catch (error) {
        res.status(400).json(error.message)
        console.log(error);

    }
}

/*get Post*/


/* delete post*/
const deletPost = async (req, res) => {
    try {
        const { id } = req.params
        const userPost = await PostModel.find({ _id: id })
        if (userPost) {
            await PostModel.findByIdAndDelete(id)

            res.status(200).json("POst deleted successfully");

        } else {
            res.status(500).json({ message: "no Post to display" });
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });

    }
}
/* delete post*/


/*search post*/

const handleSearch = async (req, res, next) => {
    const { searchItem } = req.body;

    console.log(req.body);

    try {
        const results = await PostModel.find({ $text: { $search: searchItem } });
        console.log(results);

        res.status(200).json({ results });

    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message });
    }
};



/*search*/


/*saved post*/

const userSavedPost = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const postFind = await PostModel.findById(id);
        console.log(postFind);
        if (postFind) {
            const updatedFind = await PostModel.findByIdAndUpdate(
                id,
                { star: true },
                { new: true }
            );

            res.status(200).json({ updatedFind });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


/*saved post*/

/*unsaved post*/

const userUnSavedPost = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(req.params, "oooooooooo");

        const postFind = await PostModel.findById(id);

        console.log(postFind, "ooo");

        if (postFind) {
            const updatedFind = await PostModel.findByIdAndUpdate(
                id,
                { star: false },
                { new: true }
            );


            res.status(200).json({ updatedFind });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/*unsaved post*/


/*saved posts*/

const savedPosts = async (req, res) => {
    try {
        const { id } = req.params
        const savedPost = await PostModel.find({ userId: id }).where({ star: true })
        if (savedPost) {
            return res.status(200).json({ savedPost })

        } else {
            return res.status(400).json({ Messge: 'No Posts' })

        }



    } catch (error) {
        console.log(error);

    }
}

/*saved posts*/
const editPost = async (req, res) => {
    try {
        const { id } = req.params
        const editPost = await PostModel.find({ _id: id })

        if (editPost) {
            return res.status(200).json({ editPost })

        }

    } catch (error) {

    }
}

/*post edit */


/*update post*/
const updatePost = async (req, res) => {
    try {
        console.log(req.params,"ooo");
        const { id } = req.params;
        const { title, description, content } = req.body;

        const postFind = await PostModel.findById(id);

        if (postFind) {
            await PostModel.findByIdAndUpdate(id, {
                title,
                description,

                content,
            });

            const updatedPost = await PostModel.findById(id);

            res.status(200).json({ updatedPost });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/*update post*/




export { AddPost, getUserPost, deletPost, handleSearch, userSavedPost, userUnSavedPost, savedPosts, editPost, updatePost }