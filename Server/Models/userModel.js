import bcrypt from "bcrypt";
import  { Schema,  model } from "mongoose";



const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
      unique: true, // Add unique constraint
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: [
      {
        type: String,
      },
    ],
    
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
   
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Define the model using the model function and export it
const userModel= model(
  "user",
  userSchema
);
export default userModel;