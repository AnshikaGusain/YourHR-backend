const handleSignin=async (req,res,bcrypt,User)=>{
    const {email,password}=req.body;
    if(!email || !password){
        
        return res.status(400).json("Incorrect form submission");
    }
    const foundOne=await User.findOne({email:email});
    if(foundOne){
        const isValid = bcrypt.compareSync(password,foundOne.password);
        if(isValid){
            const user=await User.findOne({email:email});
                if(!user)res.status(400).json("cannot get user details");
                else{
                    res.json(user);
                }
            
        }
        else{
            res.status(400).json("Wrong Credentials");
        }
    }
    else{
        res.status(400).json("User not registered yet");
    }
}

export default handleSignin;