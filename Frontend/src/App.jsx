
import "./styles/SignupForm.css"; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import SignupForm from './Components/SignupForm'
import LoginForm from './Components/LoginForm';
import './App.css'
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import AddEmployee from "./Components/AddEmployee"

function App() {
  

  return (
    <>
     <Router>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/UserDashboard" element = {<Sidebar/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
