const jwt = require('jsonwebtoken')
const bcrypt =require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// user registration
const registerUser = asyncHandler(async (req, res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user= await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


// user login
const loginUser = asyncHandler(async (req, res) => {
    const {email,password} = req.body

// check for user email
    const user = await User.findOne({email})

    if (user.isBlock) {
        res.status(400)
        throw new Error('user is blocked')  
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credientials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    // const {_id,name,email}= await User.findById(req.user.id)
    res.status(200).json(req.user)

    // res.status(200).json({
    //     id:_id,
    //     name,
    //     email
    // })
})

//token generator
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

//photo url upload
const profileUpload = asyncHandler(async (req, res) => {
    const url = req.body.url;
    console.log("here profile");
  
    const user = await User.findByIdAndUpdate(req.user.id, {
      profileUrl: url
    }, { new: true });
  
    
    res.status(200).json(user);
  });

module.exports={
    registerUser,
    loginUser,
    getMe,
    profileUpload
}