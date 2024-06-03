const conn=require("../index");
const teacherModel={
GetAll:(callback)=>{
    const sql="select s.teacherID, s.FirstName, s.LastName, s.Age, s.Image ,g.SubjectName"+ 
    " from teachers s JOIN Subjects g on s.SubjectID=g.subject_id";
    conn.query(sql,callback);
},
GetByID:(id,callback)=>{
    const sql="select s.teacherID, s.FirstName, s.LastName, s.Age, s.Image ,g.SubjectName"+ 
    " from teachers s JOIN Subjects g on s.SubjectID=g.subject_id where teacherID = ?";
    conn.query(sql,[id],callback);
},
GetAllSubjects:(callback)=>{
    const sql="select * from Subjects";
    conn.query(sql,callback);
},
Add:(teacher,callback)=>{
    const sql = 'INSERT INTO teachers SET ?';
    conn.query(sql, teacher, callback);
},
update: (id,teacher,callback) => {
    const sql = 'UPDATE teachers SET ? WHERE teacherID = ?';
    conn.query(sql, [teacher, id], callback);
},
delete: (id, callback) => {
    const sql = 'DELETE FROM teachers WHERE teacherID = ?';
    conn.query(sql, [id], callback);
}
}
module.exports=teacherModel;
