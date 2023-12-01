

import userModel from "../Models/userModel.js";
import generateToken from "../utilitis/genarateToken.js";

import { sendMail } from "../utilitis/mailSender.js";

/*user register*/

const globalData = {
    otp: '', // Use type null | number for otp
    user: {
        username: '',
        useremail: '',
        phone: '',
        password: '',
    }, // Define a type for user
};
const userSignup = async (req, res) => {
    try {
        console.log(req.body);

        const { username, useremail, password, phone } = req.body;

        if (!username || !useremail || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await userModel.findOne({ useremail });
        const userPhone = await userModel.findOne({ phone });

        if (userExists || userPhone) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = {
            username,
            useremail,
            phone,
            password,
        };

        globalData.user = user;

        if (user) {
            const mail = sendMail(user.useremail, res);
            globalData.otp = mail;
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

/*student register*/

const userSingupVerifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;

        if (otp == globalData.otp) {
            const addUser = await userModel.create(globalData.user);
            const token = generateToken(addUser._id);
            return res.status(200).json({
                _id: addUser?._id,
                name: addUser?.username,
                email: addUser?.useremail,
                phone: addUser?.phone,
                token,
            });
        } else {
            res.status(500).json({ message: "Wrong otp" });
        }
    } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
};

/*student login*/

const loginUser = async (req, res) => {
    const { useremail, password } = req.body;

    try {
        const user = await userModel
            .findOne({ useremail })
            .where({ isBlocked: false });

        // Use UserModel instead of userModel

        if (!user) {
            return res.status(401).json({ message: "User not logged in" }); // Use return here to exit the function after sending the response
        }
        if (user?.isBlocked == true) {
            return res.status(401).json({ message: "User is Blocked" });
        }

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            return res.json({
                _id: user._id,
                name: user.username,
                phone: user.phone,
                email: user.useremail,
                isBlocked: user.isBlocked,
                token,
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/*student login*/


export {
   userSignup,
    loginUser,
    userSingupVerifyOtp,

};