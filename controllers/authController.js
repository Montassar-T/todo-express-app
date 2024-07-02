const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();





const register = async (req,res)=>{
    const {username, email,password} = req.body;
    try{
        const exists = await User.findOne({email});
        if(exists){
            return res.status(400).json({message:'User already exist'});
        }
        let hashed = await bcrypt.hash(password,10);
        const user = new User({
            username,
            email,
            password: hashed
        })
        await user.save()
        res.status(200).json({
            success: true,
            message:'User registered'
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error"
        })
    }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "EMAIL NOT FOUND" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "WRONG PASSWORD" });
    }
    const access_token = jwt.sign(
      {
        userInfo: {
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      access_token,
      message: "User logged in successfuly",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = { login,register };
