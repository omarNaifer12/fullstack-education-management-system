const mySql=require("mysql");
const connection=mySql.createConnection({
    host:'localhost',
    user:'omar',
    password: 'root', // Replace with your MySQL password
    database: 'study'
});
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});
module.exports=connection