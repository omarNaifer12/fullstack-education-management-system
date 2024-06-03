const Teacher=require("../Database/models/teachers");
const path=require("path");
const fs=require("fs");
const pathImages="C:/Users/naifer/Desktop/fullStack/Backend/uploads"
const teacherController={
    GetAllteacher:(req,res)=>{
        Teacher.GetAll((error,results)=>{
            if(error){
                console.log("error",error);
               return res.status(500).send(error);
            }
            console.log('the result is ',results);
           return  res.json(results);
        })
    },
    GetAllSubjectsList:(req,res)=>{
        Teacher.GetAllSubjects((error,results)=>{
            if(error){
                console.log("error",error);
               return res.status(500).send(error);
            }
            console.log('the result is ',results);
           return  res.json(results);
        })
    },
    GetTeacherByID:(req,res)=>{
        const id=req.params.id;
        Teacher.GetByID(id,(error,results)=>{
            if(error){
                console.log("error",error);
               return res.status(500).send(error);
            }
            if(results.length===0){
                return res.status(404).send({ error: 'student not found' });
            }
            console.log('the result is',results);
           return res.json(results);
        })
    },
    AddTeacher:(req,res)=>{
        const student={
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            Age:req.body.Age,
            SubjectID:req.body.SubjectID,
            Image:req.file?req.file.filename:null
        };
        Teacher.Add(student,(error,results)=>{
            if(error){
                console.log("this error",error);
                return res.status(500).send(err);
            }
            console.log("added good");
            req.body.studentID=results.insertId;
            res.send(`teacher added with ID: ${results.insertId}`);
        })
    },
    
    updateTeacher: (req, res) => {
        const id = req.params.id;
        Teacher.GetByID(id, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).send({ error: 'student not found' });
            }

            const existingTeacher = results[0];
        let img=null;
            if(req.file){
                if(existingTeacher.Image){
                const oldFilePath=path.join(pathImages,existingTeacher.Image);
                if(fs.existsSync(oldFilePath)){
                    fs.unlinkSync(oldFilePath);
                }
            }
                img=req.file.filename;
            }
        const teacher = {
            FirstName: req.body.FirstName||existingTeacher.FirstName,
            LastName: req.body.LastName||existingTeacher.LastName,
             Age:req.body.Age||existingTeacher.Age,
             SubjectID:req.body.SubjectID||existingTeacher.SubjectID,
            Image:img||existingTeacher.Image
        }
      
        Teacher.update(id, teacher, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(`User updated with ID: ${req.params.id}`);
        });
        })
    },
    deleteTeacher:(req, res) => {
        const id = req.params.id;
        Teacher.GetByID(id, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).send({ error: 'teacher not found' });
            }
            Teacher.delete(id, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                const existingTeacher = results[0];
                const filePath=path.join(pathImages,existingTeacher.Image);
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath);
                }
                res.send(`Student deleted with ID: ${req.params.id}`);
            });
           
        })
    }
}
module.exports=teacherController;
