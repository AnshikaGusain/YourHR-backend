const handleUpload=(req,res,Resume)=>{
    const {firstname,lastname,email}=req.body;
    const newResume = new Resume({
        firstname: firstname,
        lastname:lastname,
        email:email,
        fileName: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype
      });
    
      // Save the file object to the database
      newResume.save()
        .then(() => {
          res.json('File uploaded successfully');
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json('Error uploading file');
        });
}
export default handleUpload;