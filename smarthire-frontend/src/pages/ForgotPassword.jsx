import { Link } from 'react-router-dom'
import { useState } from 'react'
import './ForgotPassword.css'

function ForgotPassword() {

const [email, setEmail] = useState('')
const [submitted, setSubmitted] = useState(false)

function handleSubmit(event) {


event.preventDefault()

if (!email) {
  return
}

setSubmitted(true)


}

return ( <div className="forgot-page">

  <div className="forgot-card">

    <div className="forgot-brand">

      <div className="forgot-logo">
        🔐
      </div>

      <span>
        SmartHire
      </span>

    </div>

    {!submitted ? (
      <>

        <h1>
          Forgot Password?
        </h1>

        <p className="forgot-subtitle">
          Enter your registered email address and we'll help you
          reset your password.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label htmlFor="forgot-email">
              Email Address
            </label>

            <input
              type="email"
              id="forgot-email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="forgot-button"
          >
            Continue →
          </button>

        </form>

        <Link
          to="/login"
          className="back-login"
        >
          ← Back to Login
        </Link>

      </>
    ) : (
      <div className="forgot-success">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Check Your Email
        </h1>

        <p>
          If an account exists for
          <strong> {email}</strong>,
          you will receive instructions to reset your password.
        </p>

        <Link
          to="/login"
          className="forgot-button success-button"
        >
          Back to Login
        </Link>

      </div>
    )}

  </div>

</div>


)
}

export default ForgotPassword
