const handleSignUp=async (req,res,bcrypt,User)=>{
    
    const {firstname,lastname,email,password}=req.body;
    
    if(!email|| !firstname || !lastname || !password){
        return res.status(400).json("Incorrect form submission");
    }
    const hash=bcrypt.hashSync(password,10);
    const foundOne=await User.findOne({$and:[{firstname:firstname},{lastname:lastname}]});
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
    else{
        res.json(foundOne);
    }
}

export default handleSignUp;
