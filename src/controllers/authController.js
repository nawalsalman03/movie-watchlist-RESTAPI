import {prisma} from '../config/db.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils/generateToken.js';
const register= async (req,res) => {
  const {name,email,password} = req.body;

  //check if user alr exists
  const userExists = await prisma.user.findUnique({
    where: {email: email },
  });

  if (userExists){
    return res
    .status(400)
    .json({error:"User already exists with this email"});
  }


  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt);

  //create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }

});
//generate jwt token
      const token = generateToken(user.id,res);


res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: name,
          email: email,
        },
        token,


      },
    });
  };
    const login = async (req,res) =>{
      console.log("🔵 Login request received");
      console.log("Request body:", req.body);


      const { email , password } = req.body;

      if (!email || !password) {
    console.log("❌ Missing email or password");
    return res.status(400).json({error: "Email and password are required"});
  }

      //check if email alr exists in table
      const user = await prisma.user.findUnique({
        where: {email: email },
      });

        console.log("User found:", user ? "Yes" : "No");

    
      if (!user){
        return res
        .status(401)
        .json({error:"Invalid email or password"});
      }
      //verify pssword
      const isPasswordValid = await bcrypt.compare(password,user.password);

      if (!isPasswordValid){
        return res.status(401).json({error:"invalid email or password "})
      }

      //Generate jwt token
      const token = generateToken(user.id,res);
      console.log("✅ Login successful, token generated");



      res.status(200).json({
        status: "success",
        data: {
          user: {
            id: user.id,
            email: email,
            name: user.name,
          },
          token,
        },
      });
    };
//logging out, removing the cookie with the jwt token from the users browrser
    const logout = async (req,res) => {
      res.cookie("jwt","", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({
        status: "success",
        message: "User logged out successfully",
      });
    };


 export { register, login, logout };