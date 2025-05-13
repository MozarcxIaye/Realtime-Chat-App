import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

export const signup = async(req, res) => {

    const {fullName, email, password} = req.body
    try {

        if(!fullName || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the required fields."
            })
        }

        if(password.length < 8) {
            return res.status(400).json({
                message: "Password too short. Should be at least 8 characters."
            })
        }        

        const user = await User.findOne({email})
        if(user) return res.status(400).json({
            message: "Email already taken. Please try with another one."
        })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword 
        })

        if(newUser) {
            // generate jwt token
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

        } else {
            res.status(400).json({
                message: "Invalid User Data"
            })
        }
        
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    // check valid email if user exist
    // correct pass?

    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({
                message: "Invalid credentials. Please enter the correct credentials."
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            res.status(400).json({
                message: "Invalid credentials. Please enter the correct credentials."
            })
        }

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
        
    } catch (error) {
        console.log("Error in the login Controller.", error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }


}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({
            message: "Logged out succesfully."
        })
        
    } catch (error) {
        console.log("Error in the logout Controller.", error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        
    }
}


export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            res.status(400).json({
                message: "Profile Pic is required."
            })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})

        res.status(200).json({
            updatedUser
        })
        
    } catch (error) {
        console.log("Error in the updateProfile Controller.", error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

export const checkAuth = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user data found" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
