import bcrypt, { hash } from "bcrypt";
import User from "../model/User";

export const getAllUser = async(req,res,next) => {
    let users;
    try{
        users= await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users) return res.status(404).json({message: "No Users found"});
    else return res.status(200).json({users});
};

export const signup = async(req,res,next) => {
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser= await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(existingUser) return res.status(400).json({message: "User already exists"});
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
        
    const user = User({
        name,email,password:hashedPassword,blogs:[]
    });
   
    try{
        await user.save();
    }catch(err){
        console.log(err);
    }
    return res.status(201).json({user});
}

export const login = async(req,res,next) => {
    const {email, password} = req.body;

    let existingUser;
    try{
        existingUser= await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!existingUser) return res.status(400).json({message: "Couldn't find user by this Email and Password"});
    
    const isPassCrt = bcrypt.compareSync(password,existingUser.password);
    if(!isPassCrt) return res.status(400).json({message: "Incorrect Password"});
    else return res.status(200).json({message: "Login Successfull",user:existingUser});
}