const Student=require("../Database/models/students");
const pathImages="C:/Users/naifer/Desktop/fullStack/Backend"
const fs = require('fs');
const path=require('path');
const studentController={
    GetAllStudents:(req,res)=>{
        Student.GetAll((error,results)=>{
            if(error){
                console.log("error",error);
               return res.status(500).send(error);
            }
            console.log('the result is ',results);
           return  res.json(results);
        })
    },
    GetStudentByID:(req,res)=>{
        const id=req.params.id;
        Student.GetByID(id,(error,results)=>{
            if(error){
                console.log("error",error);
               return res.status(500).send(error);
            }
            if(results.length===0){
                return res.status(404).send({ error: 'student not found' });
            }
            console.log('the result is ',results);
           return  res.json(results);
        })
    },
    AddStudent:(req,res)=>{
        const student={
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            Age:req.body.Age,
            GradeID:req.body.GradeID,
            Image:req.file?`/uploads/${req.file.filename}`:null
        };
        Student.Add(student,(error,results)=>{
            if(error){
                console.log("this error",error);
                return res.status(500).send(err);
            }
            console.log("added good");
            req.body.studentID=results.insertId;
            res.send(`User added with ID: ${results.insertId}`);
        })
    },
    updateStudent: (req, res) => {
        const id = req.params.id;
        Student.GetByID(id, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).send({ error: 'student not found' });
            }

            const existingStudent = results[0];
        let img=null;
            if(req.file){

                if (existingStudent.Image) {
                    const oldFilePath = path.join(pathImages, existingStudent.Image);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                img=`/uploads/${req.file.filename}`;
            }
        const student = {
            FirstName: req.body.FirstName||existingStudent.FirstName,
            LastName: req.body.LastName||existingStudent.LastName,
             Age:req.body.Age||existingStudent.Age,
            GradeID:req.body.GradeID||existingStudent.GradeID,
            Image:img||existingStudent.Image
        }
      
        Student.update(id, student, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(`User updated with ID: ${req.params.id}`);
        });
        })
    },
    deleteStudent:(req,res) => {
        const id = req.params.id;
        Student.GetByID(id, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).send({ error: 'student not found' });
            }
            Student.delete(id, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                const existingStudent = results[0];
                if(existingStudent.Image!==null){
                const filePath=path.join(pathImages,existingStudent.Image);
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath);
                }
            }
                res.send(`Student deleted with ID: ${req.params.id}`);
            });
           
        })
    }
}
module.exports=studentController;