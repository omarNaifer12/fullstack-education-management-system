import React, { useState } from 'react';
import "./AddUpdateClass.css";
import axios from 'axios';

const AddUpdateClass = ({ classData }) => {
  const [classInfo, setClassInfo] = useState({
    className: classData === undefined ? "" : classData.ClassName
  });
  const [lblClassID, setLblClassID] = useState(classData === undefined ? "????" : classData.classID);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/class/${classData.classID}`, {
        ClassName: classInfo.className
      });
      console.log('Updated class:', response.data);
      alert('Class updated successfully!');
    } catch (error) {
      console.error('Error updating class:', error);
      alert('Failed to update class.');
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/class", {
        ClassName: classInfo.className
      });
      console.log("Added success", response.data);
      alert("Success");
      const id = response.data.classID;
      console.log("ID is", id);
      setLblClassID(id);
    } catch (error) {
      console.error('There was an error adding the class!', error);
      alert("Failed to add class.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassInfo({ ...classInfo, [name]: value });
    console.log("The data is", classInfo);
  };

  return (
    <div className="form-container">
      <h2>{classData ? "Update Class" : "Add Class"}</h2>
      <form className="add-class-form">
        <div className="form-group">
          <label htmlFor="classID">Class ID:</label>
          <label htmlFor="classID">{lblClassID}</label>
        </div>
        <div className="form-group">
          <label htmlFor="className">Class Name</label>
          <input type="text" id="className" name="className"
            onChange={handleChange} value={classInfo.className}
          />
        </div>
        <button type="submit" className="submit-btn"
          onClick={classData === undefined ? handleSubmitAdd : handleSubmitUpdate}>
          {classData === undefined ? "Add Class" : "Update Class"}
        </button>
      </form>
      <button  className='back' onClick={()=>navigate(-1)}>back</button>
    </div>
  )
}

export default AddUpdateClass;
