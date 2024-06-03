const express=require("express");
const router=express.Router();
const classController=require("../Controllers/classes");
router.get("/classes",classController.GetAllclasss);
router.get("/class/:id",classController.GetClassByID);
router.post("/class",classController.AddClass);
router.put("/class/:id",classController.updateClass);
router.delete("/class/:id",classController.deleteClass);


module.exports=router;