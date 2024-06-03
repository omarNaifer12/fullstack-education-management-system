import React from 'react'
import HomePage from './component/HomePage/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetClasses from './component/classes/AllClasses/GetClasses';
import GetStudents from './component/students/AllStudents/GetStudents';
import GetTeachers from './component/teachers/AllTeachers/GetTeachers';
import AddUpdateStudent from './component/students/AddUpdateStudent/AddUpdateStudent';
import AddUpdateTeacher from './component/teachers/AddUpdateTeacher/AddUpdateTeacher';
import AddUpdateClass from './component/classes/AddUpdateClass/AddUpdateClass';
const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<GetStudents />} />
        <Route path="/classes" element={<GetClasses />} />
 <Route path="/teachers" element={<GetTeachers />} />
        <Route path="/SAdd" element={<AddUpdateStudent />} />
        <Route path="/TAdd" element={<AddUpdateTeacher />} />
        <Route path="/CAdd" element={<AddUpdateClass />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App