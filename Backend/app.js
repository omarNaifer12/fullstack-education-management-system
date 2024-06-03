const express = require('express');
const app = express();
const port = 3000;
const connection=require("./Database/index")
const studentRoutes=require("./routes/students");
const teacherRoutes=require("./routes/teachers");
const classRoutes=require("./routes/classes");










const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use('/api',studentRoutes);
app.use('/api',teacherRoutes);
app.use('/api',classRoutes);

app.get('/',(req,res)=>{
  console.log("run good");
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});