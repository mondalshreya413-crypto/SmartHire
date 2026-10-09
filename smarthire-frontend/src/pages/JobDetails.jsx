import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './JobDetails.css'
import { apiRequest } from '../api'

function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applying, setApplying] = useState(false)
  const [applyMessage, setApplyMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadJob() {
      try {
        setLoading(true)
        setError('')

        const data = await apiRequest(`/jobs/${id}`)

        if (!cancelled) {
          setJob(data)
        }
      } catch (error) {
        console.error('Job details error:', error)

        if (!cancelled) {
          setError(error.message || 'Unable to load job details.')
          setJob(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadJob()

    return () => {
      cancelled = true
    }
  }, [id])

  async function handleApply() {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    try {
      setApplying(true)
      setApplyMessage('')

      // Read the logged-in user's email from the JWT.
      const encodedPayload = token.split('.')[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/')

      const payload = JSON.parse(
        atob(encodedPayload.padEnd(
          Math.ceil(encodedPayload.length / 4) * 4,
          '='
        ))
      )

      const email = payload.sub

      if (!email) {
        throw new Error('Unable to identify the logged-in user. Please log in again.')
      }

      // Load candidate profiles using the shared API helper.
      const candidatesData = await apiRequest('/candidates')

      const candidates = Array.isArray(candidatesData)
        ? candidatesData
        : candidatesData?.data ||
          candidatesData?.content ||
          candidatesData?.candidates ||
          []

      const candidate = candidates.find(
        (item) => item.email === email
      )

      if (!candidate) {
        throw new Error('Candidate profile not found.')
      }

      // Submit the job application.
      await apiRequest('/applications', {
        method: 'POST',
        body: JSON.stringify({
          candidateId: candidate.id,
          jobId: job.id,
        }),
      })

      setApplyMessage('Application submitted successfully! 🎉')
    } catch (error) {
      console.error('Application error:', error)

      setApplyMessage(
        error.message || 'Unable to submit application.'
      )
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <main className="job-details-page">
        <div className="job-details-container">
          <Link to="/jobs" className="back-link">
            ← Back to Jobs
          </Link>

          <div className="job-details-card">
            <h2>Loading job details...</h2>
          </div>
        </div>
      </main>
    )
  }

  if (error || !job) {
    return (
      <main className="job-details-page">
        <div className="job-details-container">
          <Link to="/jobs" className="back-link">
            ← Back to Jobs
          </Link>

          <div className="job-details-card">
            <div className="job-error-icon">⚠️</div>
            <h2>Job not found</h2>
            <p>{error || 'This job is no longer available.'}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="job-details-page">
      <div className="job-details-container">
        <Link to="/jobs" className="back-link">
          ← Back to Jobs
        </Link>

        <div className="job-details-card">
          <div className="job-details-header">
            <div className="job-details-icon">💻</div>

            <div>
              <h1>{job.title}</h1>
              <h2>{job.company}</h2>
            </div>
          </div>

          <div className="job-details-info">
            <div>
              📍
              <strong>{job.location}</strong>
              <span>Location</span>
            </div>

            <div>
              💰
              <strong>
                ₹{Number(job.salary).toLocaleString('en-IN')}
              </strong>
              <span>Salary</span>
            </div>

            <div>
              💼
              <strong>{job.employmentType || 'Full Time'}</strong>
              <span>Job Type</span>
            </div>
          </div>

          <section className="job-details-section">
            <h2>About this role</h2>
            <p>
              {job.description || 'Explore this opportunity and take the next step in your career.'}
            </p>
          </section>

          <section className="job-details-section">
            <h2>Why join this opportunity?</h2>

            <ul className="job-benefits">
              <li>Work with an experienced engineering team.</li>
              <li>Build reliable and scalable software solutions.</li>
              <li>Develop your technical and professional skills.</li>
              <li>Work on real-world development projects.</li>
            </ul>
          </section>

          <div className="job-apply-section">
            <h3>Interested in this job?</h3>
            <p>Apply now and take the next step in your career.</p>

            <button
              type="button"
              className="apply-button"
              onClick={handleApply}
              disabled={applying}
            >
              {applying ? 'Applying...' : 'Apply Now →'}
            </button>

            {applyMessage && (
              <p className="apply-message" role="status">
                {applyMessage}
              </p>
            )}

            <small>🔒 Your application is secure</small>
          </div>
        </div>
      </div>
    </main>
  )
}

export default JobDetails