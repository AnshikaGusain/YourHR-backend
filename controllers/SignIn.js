const handleSignin=async (req,res,bcrypt,User)=>{
    const {email,password}=req.body;

    // if email or password is missing error message is send as a response
    if(!email || !password){
        
        return res.status(400).json("Incorrect form submission");
    }

    // Checking if user exists
    const foundOne=await User.findOne({email:email});

    // If user exists, check hashed password stored in database and password given by user
    if(foundOne){
        const isValid = bcrypt.compareSync(password,foundOne.password);

        // If password is correct, user data will be send as a response
        if(isValid){
            const user=await User.findOne({email:email});
                if(!user)res.status(400).json("cannot get user details");
                else{
                    res.json(user);
                }
            
        }

        // If password is incorrect, an error message will be send as a response
        else{
            res.status(400).json("Wrong Credentials");
        }
    }
    // If user does not exists, it means user is not registered. An error message stating it will be send as a response
    else{
        res.status(400).json("User not registered yet");
    }
}

export default handleSignin;