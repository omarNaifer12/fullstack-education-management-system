import React, { useEffect, useState } from 'react';
import "./AddUpdateTeacher.css";
import axios from 'axios';

const AddUpdateTeacher = ({ teacher }) => {
  const [teacherData, setTeacherData] = useState({
    FirstName: teacher === undefined ? "" : teacher.FirstName,
    LastName: teacher === undefined ? "" : teacher.LastName,
    Age: teacher === undefined ? "" : teacher.Age
  });
  const [subjects,setSubjects]=useState([]);
  const[subjectID,setSubjectID]=useState(1);
  const[image,setImage]=useState(teacher===undefined?"":teacher.Image);
  useEffect( ()=>{
    const fetchDaSubjects = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/subjects");
          console.log(response.data);
          setSubjects(response.data);
        } catch (err) {
          console.log("error", err);
        }
      }
      fetchDaSubjects();
    }
  ,[]);
  const [lblTeacherID, setLblTeacherID] = useState(teacher === undefined ? "????" : teacher.teacherID);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('image', image);
        
        formData.append('FirstName', teacherData.FirstName);
        formData.append('LastName', teacherData.LastName);
        formData.append('Age', teacherData.Age);
        formData.append('SubjectID', subjectID);
        
      const response = await axios.put(`http://localhost:3000/api/teacher/${teacher.teacherID}`,formData);
      console.log('Updated teacher:', response.data);
      alert('Teacher updated successfully!');
    } catch (error) {
      console.error('Error updating teacher:', error);
      alert('Failed to update teacher.');
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('image', image);
        
        formData.append('FirstName', teacherData.FirstName);
        formData.append('LastName', teacherData.LastName);
        formData.append('Age', teacherData.Age);
        formData.append('SubjectID', subjectID);
        
      const response = await axios.post("http://localhost:3000/api/teacher", formData);
      console.log("Added success", response.data);
      alert("Success");
      const id = response.data.teacherID;
      console.log("ID is", id);
      setLblTeacherID(id);
    } catch (error) {
      console.error('There was an error adding the teacher!', error);
      alert("Failed to add teacher.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
    console.log("The data is", teacherData);
  };
const handleOptions=(e)=>{
    setSubjectID(e.target.value);
    console.log("option is :",subjectID);
}
  return (
    <div className="form-container">
      <h2>{teacher === undefined ? "Add Teacher" : "Update Teacher"}</h2>
      <form className="add-teacher-form" onSubmit={teacher === undefined ? handleSubmitAdd : handleSubmitUpdate}>
        <div className="form-group">
          <label htmlFor="teacherID">Teacher ID:</label>
          <span>{lblTeacherID}</span>
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="FirstName"
            onChange={handleChange}
            value={teacherData.FirstName}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="LastName"
            onChange={handleChange}
            value={teacherData.LastName}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="Age"
            onChange={handleChange}
            value={teacherData.Age}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <select id="subject" name="Subject" onChange={handleOptions} value={subjectID} required>
            {
                subjects.map((subject,index)=>{
                  return  <option key={index} value={subject.subject_id}> 
                    {subject.SubjectName}</option>
                })
            }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
          type="file"
          id="image"
          name="Image"
          accept="image/*"
          onChange={(e)=>setImage(e.target.files[0])}  
          />
        </div>
        <button type="submit" className="submit-btn">
          {teacher === undefined ? "Add Teacher" : "Update Teacher"}
        </button>
      </form>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
  
}

export default AddUpdateTeacher;
