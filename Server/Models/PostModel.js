import { model, Schema } from "mongoose";

const PostSchema = new Schema(
  {

    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
       
      },
      content: {
        type: String,
       
      },
      imageUrl: {
        type: String,
        
      },
      filesUrl: {
        type: String,
        
      },
    

    userId: {
         type: Schema.Types.ObjectId,
         ref: "user"
         },
         star:{
          type: Boolean,
          default:false,
          required: true
        },

  },
  
  {
    timestamps: true,
  }
);

PostSchema.index({title: "text"});
PostSchema.index({content: "text"});

export default model("post", PostSchema);