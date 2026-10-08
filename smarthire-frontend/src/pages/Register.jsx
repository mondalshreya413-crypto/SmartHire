import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { apiRequest } from '../api'

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('CANDIDATE')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(event) {

    event.preventDefault()

    setError('')
    setSuccess('')

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    try {

      setLoading(true)

      const data = await apiRequest(
        '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password,
            role: role
          })
        }
      )

      console.log('Registration successful:', data)

      setSuccess(
        `Account created successfully for ${data.name}!`
      )

      setTimeout(() => {
        navigate('/login')
      }, 1500)

    } catch (error) {

      console.error('Registration error:', error)

      setError(
        error.message ||
        'Registration failed. Please try again.'
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-brand">

          <div className="register-logo">
            🚀
          </div>

          <span>
            SmartHire
          </span>

        </div>

        <h1>
          Create Account
        </h1>

        <p className="register-subtitle">
          Join SmartHire and start your career journey
        </p>

        <form onSubmit={handleRegister}>

          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label htmlFor="role">
              Account Type
            </label>

            <select
              id="role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            >

              <option value="CANDIDATE">
                Candidate
              </option>

              <option value="RECRUITER">
                Recruiter
              </option>

            </select>

          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {success && (
            <div className="register-success">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading
              ? 'Creating Account...'
              : 'Create Account →'}
          </button>

        </form>

        <p className="login-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Register

