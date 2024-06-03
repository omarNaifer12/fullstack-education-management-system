import React, { useEffect, useState } from 'react';
import "./GetTeachers.css";
import axios from 'axios';
import AddUpdateTeacher from '../AddUpdateTeacher/AddUpdateTeacher';
import { useNavigate } from 'react-router-dom';

const GetTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [formMode, setFormMode] = useState(""); // "ADD" or "Edit"
  const [selectedTeacher, setSelectedTeacher] = useState({});
const navigate=useNavigate();
  useEffect(() => {
    const fetchDataTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/teachers");
        console.log(response.data);
        setTeachers(response.data);
      } catch (err) {
        console.log("error", err);
      }
    }
    fetchDataTeachers();
  }, []);

  const deleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:3000/api/teacher/${teacherId}`);
      setTeachers(teachers.filter(teacher => teacher.teacherID !== teacherId));
    } catch (err) {
      console.log("error", err);
    }
  }

   if (formMode === "Edit") {
    return <AddUpdateTeacher teacher={selectedTeacher} />
  }

  const handleUpdate = (teacher) => {
    setSelectedTeacher(teacher);
    setFormMode("Edit");
  }

  return (
    <div className="container">
      <h1>Teacher Records</h1>
      <button onClick={() => navigate("/TAdd")} className="add-btn">Add Teacher</button>
      <table id="teachersTable">
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Subject</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={teacher.teacherID}>
              <td>{teacher.teacherID}</td>
              <td>{teacher.FirstName}</td>
              <td>{teacher.LastName}</td>
              <td>{teacher.Age}</td>
              <td>{teacher.SubjectName}</td>
              <td>
                <img src={`http://localhost:3000/api/uploads/${teacher.Image}`} alt={`${teacher.FirstName} ${teacher.LastName}`} className="teacher-image" />
              </td>
              <td>
                <button className="action-btn update" onClick={() => handleUpdate(teacher)}>Update</button>
                <button onClick={() => deleteTeacher(teacher.teacherID)} className="action-btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}  
export default GetTeachers;
