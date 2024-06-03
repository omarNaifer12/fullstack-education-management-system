import React, {  useState } from 'react'
import "./AddUpdateStudent.css"
import axios from 'axios';

const AddUpdateStudent = ({student}) => {
const [studentData,setStudentData]=useState({
    FirstName:student===undefined?"":student.FirstName,
    LastName:student===undefined?"":student.LastName,
    Age:student===undefined?"":student.Age,
    GradeID:student===undefined?1:student.GradeName,
  
});
const [choiceSecondary,setChoiceSecondary]=useState(1);
const[image,setImage]=useState(student===undefined?"":student.Image);
const [lblStudentID,setLblStudentID]=useState(student===undefined?"????":student.studentID);
const handleSubmitUpdate=async(e)=>{
   e.preventDefault();
    try{
        const formData = new FormData();
formData.append('image', image);

formData.append('FirstName', studentData.FirstName);
formData.append('LastName', studentData.LastName);
formData.append('Age', studentData.Age);
formData.append('GradeID', choiceSecondary);
        
const response=await axios.put(`http://localhost:3000/api/student/${student.studentID}`,formData)
console.log('Updated student:', response.data);
alert('Student updated successfully!');
    }
    catch(error){
        console.error('Error updating student:', error);
        alert('Failed to update student.');
    }
}
const handleSubmitAdd = async(e)=>{
    e.preventDefault();
    try{
        const formData = new FormData();
formData.append('image', image);

formData.append('FirstName', studentData.FirstName);
formData.append('LastName', studentData.LastName);
formData.append('Age', studentData.Age);
formData.append('GradeID', choiceSecondary);

const response= await axios.post("http://localhost:3000/api/student",formData)

console.log("added success",response.data);
alert("success");
const id=response.data.studentID;
console.log("id is",id);
setLblStudentID(id);
    }
    catch{
        console.error('There was an error adding the student!', error);
    alert("bad");
    }
}
const handleChange=(e)=>{
    const{name,value}=e.target;
    setStudentData({...studentData,[name]:value}    )
console.log("the data is ",studentData);
}
function getValue(value) {
    switch (value) {
        case "First":
            return 1;
        case "Second":
            return 2;
        case "Third":
            return 3;
        case "Fourth":
            return 4;
        default:
            return "Invalid value";
    }
}
const handleChangeOptions=(e)=>{
const valueOption=getValue(e.target.value);
setChoiceSecondary(valueOption);
}
const handleImage=()=>{

}
return (
    <div className="form-container">
      <h2>{student === undefined ? "Add Student" : "Update Student"}</h2>
      <form className="add-student-form">
        <div className="form-group">
          <label htmlFor="studentID">Student ID:</label>
          <label htmlFor="studentID">{lblStudentID}</label>
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="FirstName" value={studentData.FirstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="LastName" value={studentData.LastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="Age" value={studentData.Age} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <select id="grade" name="GradeName" onChange={()=>handleChangeOptions}>
            <option value="First">First Secondary</option>
            <option value="Second">Second  Secondary</option>
            <option value="Third">Third Secondary</option>
            <option value="Fourth">Fourth Secondary</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="Image" accept="image/*" 
          onChange={(e)=>
          {
            console.log(image);
          setImage(e.target.files[0])}
        
        }
          />
        
          </div>
       
        <button type="submit" className="submit-btn" onClick={student === undefined ? handleSubmitAdd : handleSubmitUpdate}>
          {student === undefined ? "Add Student" : "Update Student"}
        </button>
      </form>
      <button className='back' onClick={() => navigate(-1)}>Back</button>
    </div>
  )
  
}

export default AddUpdateStudent