import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import multer from "multer";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
import handleSignUp from "./controllers/SignUp.js";
import handleSignin from "./controllers/SignIn.js";
import handleUpload from "./controllers/handleUpload.js";
const upload = multer({ dest: 'uploads/' });
const app = express();
dotenv.config();

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://admin-anshika:${process.env.PASSWORD}@cluster0.wzrpvnt.mongodb.net/applicant`);


// Stores user credentials

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const User = new mongoose.model("user", userSchema);



// Stores user resume with their name,email
const resumeSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    fileName: String,
    data: Buffer,
    contentType: String
})

const Resume=new mongoose.model("resume",resumeSchema);


// Handles Sign Up functionality
app.post("/signup", (req, res) => {
    handleSignUp(req, res, bcrypt, User);
})

// Handles Sign In functionality
app.post("/signin", (req, res) => {
    handleSignin(req, res, bcrypt, User);
})

// Stores the uploaded resume in database
app.post("/upload", upload.single('file'), (req, res) => {
    handleUpload(req,res,Resume);
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Server started on port 3001");
})