const handleSignUp=async (req,res,bcrypt,User)=>{

    const {firstname,lastname,email,password}=req.body;
    
    // if any field is missing error message will be send as a response
    if(!email|| !firstname || !lastname || !password){
        return res.status(400).json("Incorrect form submission");
    }

    // Hashing the user's password before storing it in database
    const hash=bcrypt.hashSync(password,10);

    // Checking if user already exists or not
    const foundOne=await User.findOne({$and:[{firstname:firstname},{lastname:lastname}]});

    // If user does not exist create one and store it in database
    if(!foundOne){
        const user=new User({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hash
        });
        user.save();
        res.redirect(307,"/signup");
    }
    // If user already exists just send the already created user as a response
    else{
        res.json(foundOne);
    }
}

export default handleSignUp;
