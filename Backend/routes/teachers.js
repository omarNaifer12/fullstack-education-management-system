const express=require("express");
const router=express.Router();
const path=require("path");
const multer=require("multer");
const teacherController=require("../Controllers/teachers");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
    }
  });
  const uploadsPath = path.join(__dirname,'../uploads');
  router.use('/uploads', express.static(uploadsPath));
  const upload = multer({ storage: storage });
router.get("/teachers",teacherController.GetAllteacher);
router.get("/teacher/:id",teacherController.GetTeacherByID);
router.get("/subjects",teacherController.GetAllSubjectsList);
router.post("/teacher",upload.single("image"),teacherController.AddTeacher);
router.put("/teacher/:id",upload.single("image"),teacherController.updateTeacher);
router.delete("/teacher/:id",teacherController.deleteTeacher);


module.exports=router;