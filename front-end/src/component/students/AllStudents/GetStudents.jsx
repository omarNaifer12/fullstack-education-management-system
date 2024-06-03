import React, { useEffect, useState } from 'react'
import "./GetStudents.css"
import axios from 'axios'
import AddUpdateStudent from '../AddUpdateStudent/AddUpdateStudent'
import { useNavigate } from 'react-router-dom'

const GetStudents =() => {
  let[students,setStudents]=useState([]);
  const[studentsForSeacrh,setStudentsForSeacrh]=useState([]);
  const [getAddForm,setGetAddForm]=useState("");
  const[GetStudent,setGetStudent]=useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const handleChangeOptions = (event) => {
      setSelectedOption(event.target.value);
      console.log(selectedOption);
  };
  const navigate=useNavigate();
useEffect(()=>{
const fetchDataStudents=async()=>{
try{
const response= await axios.get("http://localhost:3000/api/students");
const result=response.data;
 setStudents(result);
 setStudentsForSeacrh(result);
}
catch(err){
console.log("error",err);
    }
   
}
fetchDataStudents();

},[])
const handleSearchFirstName=(inputSearch)=>{
    
if(inputSearch===""){
   setStudents(studentsForSeacrh)
}else{
  
    let res=studentsForSeacrh.filter((student)=>{
        var name=student.FirstName.toLowerCase();
        if( name.includes(inputSearch.toLowerCase())){
            return true;
        }return false;

    })
    setStudents(res);
}
}
const handleSearchLastName=(inputSearch)=>{
    
    if(inputSearch===""){
       setStudents(studentsForSeacrh)
    }else{
        let res=studentsForSeacrh.filter((student)=>{
            var last=student.LastName.toLowerCase();
            if( last.includes(inputSearch.toLowerCase())){
                return true;
            }return false;    
        })
        setStudents(res);
    }
    }
    const handleSearchAge=(inputSearch)=>{
    
        if(inputSearch===""){
           setStudents(studentsForSeacrh)
        }else{
            let res=studentsForSeacrh.filter((student)=>{
                var age=student.Age.toString();
                if( age.includes(inputSearch)){
                    return true;
                }return false;    
            })
            setStudents(res);
        }
        }
        const handleSearchID=(inputSearch)=>{
    
            if(inputSearch===""){
               setStudents(studentsForSeacrh)
            }else{
                let res=studentsForSeacrh.filter((student)=>{
                    var ID=student.studentID.toString();
                    if( ID.includes(inputSearch)){
                        return true;
                    }return false;    
                })
                setStudents(res);
            }
            }
            const handleSearch=(input)=>{
if(selectedOption==="FirstName"){
    handleSearchFirstName(input);
}
else if(selectedOption==="LastName"){
    handleSearchLastName(input);
}
else if(selectedOption==="StudentID")  {
    handleSearchID(input);
}else if(selectedOption==="Age"){
    handleSearchAge(input);
}          
}
const DeleteStudent=async(studentId)=>{
   try{
await axios.delete(`http://localhost:3000/api/student/${studentId}`);
setStudents(students.filter(student=>student.studentID!==studentId));
   }
   catch(err){
console.log("error",err);
   }
}

 if(getAddForm==="Edit"){
    return <AddUpdateStudent student={GetStudent}/>
}
const handleUpdate=(student)=>{
setGetStudent(student);
setGetAddForm("Edit");
}
return (
    <div className="container">
        <h1>Student Records</h1>
        <button onClick={() => navigate("/SAdd")} className="add-btn">Add Student</button>
        <div className="search-container">
            <label htmlFor="searchBy">Search By:</label>
            <select id="searchBy" className="search-select" 
            onChange={handleChangeOptions}>
                <option value="">--Select--</option>
                <option value="FirstName">First Name</option>
                <option value="LastName">Last Name</option>
                <option value="StudentID">Student ID</option>
                <option value="Age">Age</option>
            </select>
            <input type="text" placeholder="Enter search term" 
            onChange={(e)=>handleSearch(e.target.value)}
            className="search-input" />
        </div>
        <table id="studentsTable">
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                   students.map((student, index) => (
                      <tr key={student.studentID}>
                            <td>{student.studentID}</td>
                            <td>{student.FirstName}</td>
                            <td>{student.LastName}</td>
                            <td>{student.Age}</td>
                            <td>{student.GradeName} {console.log(student.Image)}</td>
                           
                            <td><img src={`http://localhost:3000/api${student.Image}`}  className="student-img" /></td>
                            <td>
                                <button className="action-btn update"
                                    onClick={() => handleUpdate(student)}
                                >Update</button>
                                <button onClick={() => DeleteStudent(student.studentID)} className="action-btn delete">Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <button className='back' onClick={() => navigate(-1)}>Back</button>
    </div>
);

};
export default GetStudents