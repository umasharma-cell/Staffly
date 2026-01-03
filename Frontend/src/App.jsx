
import "./styles/SignupForm.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import SignupForm from './Components/SignupForm'
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';
import AddEmployee from './Components/AddEmployee';
import EmployeesList from './Components/EmployeesList';
import './App.css'

function App() {


  return (
    <>
     <Router>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employees" element={<EmployeesList />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
