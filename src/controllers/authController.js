import {prisma} from '../config/db.js';
import bcrypt from 'bcryptjs';
const register= async (req,res) => {
  const body = req.body;  
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

res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: name,
          email: email,
        }

      }
    });
  }
    const login = async (req,res) =>{
      const {email,password} = req.body;

      //check if email alr exists in table
      const user = await prisma.user.findUnique({
        where: {email: email },
      });
    
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




    };

 


export { register, login };