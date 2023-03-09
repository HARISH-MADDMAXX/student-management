import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentsPage from './pages/StudentsPage';
import TeacherPage from './pages/TeacherPage';
import HomePage from './pages/HomePage';
import View from './pages/View';
// import Test from './pages/Test';
// import Enter from './pages/Enter';
import Enterskill from './pages/Enterskill';
import Description from './pages/Description';
import './index.css'
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/student" element={<StudentsPage />}/>
        <Route path="/teacher" element={<TeacherPage />}/>
        <Route path='/teacher/view' element = {<View />} />
        <Route path='/description/:name' element = {<Description />} />

        <Route path='/student/enter' element = {<Enterskill />} />
        <Route path='/profile/:name' element = {<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}


ReactDOM.render(
  <App />,
  document.getElementById("root")
)