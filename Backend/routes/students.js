const express = require('express');
const multer = require('multer');
const path = require('path');
const router=express.Router();

const studentController=require("../Controllers/students");
const uploadsPath = path.join(__dirname,'../uploads');

// Serve the uploads directory as static files

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
    }
  });


  const upload = multer({ storage: storage });
  router.use('/uploads', express.static(uploadsPath));
router.get("/students",studentController.GetAllStudents);
router.get("/student/:id",studentController.GetStudentByID)
router.post("/student",upload.single("image"),studentController.AddStudent);
router.put("/student/:id",upload.single("image"),studentController.updateStudent);
router.delete("/student/:id",studentController.deleteStudent);


module.exports=router;