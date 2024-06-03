const conn=require("../index");
const classModel={
GetAll:(callback)=>{
    const sql="select *from classes";
    conn.query(sql,callback);
},
GetByID:(id,callback)=>{
    const sql="select *from classes where classID = ?";
    conn.query(sql,[id],callback);
},
Add:(classe,callback)=>{
    const sql = 'INSERT INTO classes SET ?';
    conn.query(sql, classe, callback);
},
update: (id, classe, callback) => {
    const sql = 'UPDATE classes SET ? WHERE classID = ?';
    conn.query(sql, [classe, id], callback);
},
delete: (id, callback) => {
    const sql = 'DELETE FROM classes WHERE classID = ?';
    conn.query(sql, [id], callback);
}
}
module.exports=classModel;