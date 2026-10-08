import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import CandidateDashboard from './pages/CandidateDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import ForgotPassword from './pages/ForgotPassword'

function App() {
return ( <BrowserRouter>

  <div className="app">

    <nav className="navbar">

      <div className="logo">
        SmartHire
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/jobs">
            Jobs
          </Link>
        </li>

        <li>
          <Link to="/login">
            Login
          </Link>
        </li>

      </ul>

    </nav>

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/jobs"
        element={<Jobs />}
      />

      <Route
        path="/jobs/:id"
        element={<JobDetails />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/candidate-dashboard"
        element={<CandidateDashboard />}
      />

      <Route
        path="/recruiter-dashboard"
        element={<RecruiterDashboard />}
      />

    </Routes>

  </div>

</BrowserRouter>


)
}

export default App
