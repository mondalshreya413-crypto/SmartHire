import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { apiRequest } from '../api'

function Login() {

const navigate = useNavigate()

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

async function handleLogin(event) {


event.preventDefault()

setError('')

if (!email || !password) {
  setError('Please enter email and password.')
  return
}

try {

  setLoading(true)

  const data = await apiRequest(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    }
  )

  localStorage.setItem(
    'token',
    data.token
  )

  const role = data.role

  if (role === 'CANDIDATE') {

    navigate('/candidate-dashboard')

  } else if (role === 'RECRUITER') {

    navigate('/recruiter-dashboard')

  } else {

    navigate('/')

  }

} catch (error) {

  setError(
    error.message ||
    'Login failed. Please try again.'
  )

} finally {

  setLoading(false)

}


}

return ( <div className="login-page">

  <div className="login-card">

    <div className="login-brand">

      <div className="login-logo">
        🚀
      </div>

      <span>
        SmartHire
      </span>

    </div>

    <h1>
      Welcome Back
    </h1>

    <p className="login-subtitle">
      Login to your SmartHire account
    </p>

    <form onSubmit={handleLogin}>

      <div className="form-group">

        <label htmlFor="email">
          Email Address
        </label>

        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

      </div>

      <div className="form-group">

        <label htmlFor="password">
          Password
        </label>

        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

      </div>

      <div className="login-options">

        <label className="remember-me">

          <input type="checkbox" />

          <span>
            Remember me
          </span>

        </label>

        <Link to="/forgot-password">
          Forgot Password?
        </Link>

      </div>

      {error && (
        <div className="login-error">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="login-button"
        disabled={loading}
      >
        {loading
          ? 'Logging in...'
          : 'Login →'}
      </button>

    </form>

    <p className="register-text">

      Don't have an account?

      <Link to="/register">
        Create Account
      </Link>

    </p>

  </div>

</div>


)
}

export default Login
