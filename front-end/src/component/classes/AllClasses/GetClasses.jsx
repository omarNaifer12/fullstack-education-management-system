import React, { useEffect, useState } from 'react';
import "./GetClasses.css";
import axios from 'axios';
import AddUpdateClass from '../AddUpdateClass/AddUpdateClass';
import { useNavigate } from 'react-router-dom';

const GetClasses = () => {
  const [classes,setClasses] = useState([]);
  const [formMode,setFormMode] = useState(""); // "ADD" or "Edit"
  const [selectedClass,setSelectedClass] = useState({});
const navigate=useNavigate();
  useEffect(() => {
    const fetchDataClasses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/classes");
        console.log(response.data);
        setClasses(response.data);
      } catch (err) {
        console.log("error", err);
      }
    }
    fetchDataClasses();
  }, []);

  const deleteClass = async (classId) => {
    try {
      await axios.delete(`http://localhost:3000/api/class/${classId}`);
      setClasses(classes.filter(cls => cls.classID !== classId));
    } catch (err) {
      console.log("error", err);
    }
  }

  if (formMode === "Edit") {
    return <AddUpdateClass classData={selectedClass} />
  }

  const handleUpdate = (cls) => {
    setSelectedClass(cls);
    setFormMode("Edit");
  }

  return (
    <div className="container">
      <h1>Class Records</h1>
      <button onClick={() => navigate("/CAdd")} className="add-btn">Add Class</button>
      <table id="classesTable">
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={cls.classID}>
              <td>{cls.classID}</td>
              <td>{cls.ClassName}</td>
              <td>
                <button className="action-btn update" onClick={() => handleUpdate(cls)}>Update</button>
                <button onClick={() => deleteClass(cls.classID)} className="action-btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    <button  className='back' onClick={()=>navigate(-1)}>back</button>
    </div>
  )
}

export default GetClasses;