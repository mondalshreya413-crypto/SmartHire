import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './JobDetails.css'
function JobDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applying, setApplying] = useState(false)
  const [applyMessage, setApplyMessage] = useState('')

  useEffect(() => {

    async function loadJob() {

      try {

        setLoading(true)
        setError('')

        const response = await fetch(
          `http://localhost:8080/jobs/${id}`
        )

        if (!response.ok) {
          throw new Error(
            `Job not found: ${response.status}`
          )
        }

        const data = await response.json()

        setJob(data)

      } catch (error) {

        console.error(
          'Job details error:',
          error
        )

        setError(
          'Unable to load job details.'
        )

      } finally {

        setLoading(false)

      }
    }

    loadJob()

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

      /*
       * Get logged-in user's email
       * from JWT token.
       */
      const payload = JSON.parse(
        atob(token.split('.')[1])
      )

      const email = payload.sub

      /*
       * Find candidate profile.
       */
      const candidateResponse = await fetch(
        'http://localhost:8080/candidates',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!candidateResponse.ok) {
        throw new Error(
          'Unable to find candidate profile.'
        )
      }

      const candidatesData =
        await candidateResponse.json()

      /*
       * Backend may return:
       * 1. Array
       * 2. { data: [...] }
       * 3. { content: [...] }
       * 4. { candidates: [...] }
       */
      const candidates = Array.isArray(
        candidatesData
      )
        ? candidatesData
        : candidatesData?.data ||
          candidatesData?.content ||
          candidatesData?.candidates ||
          []

      const candidate = candidates.find(
        (item) =>
          item.email === email
      )

      if (!candidate) {
        throw new Error(
          'Candidate profile not found.'
        )
      }

      /*
       * Submit application.
       */
      const applicationResponse =
        await fetch(
          'http://localhost:8080/applications',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              candidateId: candidate.id,
              jobId: job.id
            })
          }
        )

      const applicationData =
        await applicationResponse
          .json()
          .catch(() => null)

      if (!applicationResponse.ok) {

        throw new Error(
          applicationData?.message ||
          applicationData?.error ||
          'Application failed.'
        )

      }

      setApplyMessage(
        'Application submitted successfully! 🎉'
      )

    } catch (error) {

      console.error(
        'Application error:',
        error
      )

      setApplyMessage(
        error.message ||
        'Unable to submit application.'
      )

    } finally {

      setApplying(false)

    }
  }

  if (loading) {

    return (
      <main className="job-details-page">

        <div className="job-details-container">

          <Link
            to="/jobs"
            className="back-link"
          >
            ← Back to Jobs
          </Link>

          <div className="job-details-card">

            <h2>
              Loading job details...
            </h2>

          </div>

        </div>

      </main>
    )
  }

  if (error || !job) {

    return (
      <main className="job-details-page">

        <div className="job-details-container">

          <Link
            to="/jobs"
            className="back-link"
          >
            ← Back to Jobs
          </Link>

          <div className="job-details-card">

            <div className="job-error-icon">
              ⚠️
            </div>

            <h2>
              Job not found
            </h2>

            <p>
              {error ||
                'This job is no longer available.'}
            </p>

          </div>

        </div>

      </main>
    )
  }

  return (
    <main className="job-details-page">

      <div className="job-details-container">

        <Link
          to="/jobs"
          className="back-link"
        >
          ← Back to Jobs
        </Link>

        <div className="job-details-card">

          <div className="job-details-header">

            <div className="job-details-icon">
              💻
            </div>

            <div>

              <h1>
                {job.title}
              </h1>

              <h2>
                {job.company}
              </h2>

            </div>

          </div>

          <div className="job-details-info">

            <div>
              📍

              <strong>
                {job.location}
              </strong>

              <span>
                Location
              </span>
            </div>

            <div>
              💰

              <strong>
                ₹
                {Number(job.salary)
                  .toLocaleString('en-IN')}
              </strong>

              <span>
                Salary
              </span>
            </div>

            <div>
              💼

              <strong>
                {job.employmentType}
              </strong>

              <span>
                Job Type
              </span>
            </div>

          </div>

          <section className="job-details-section">

            <h2>
              About this role
            </h2>

            <p>
              {job.description}
            </p>

          </section>

          <section className="job-details-section">

            <h2>
              Why join this opportunity?
            </h2>

            <ul className="job-benefits">

              <li>
                Work with an experienced
                engineering team.
              </li>

              <li>
                Build reliable and scalable
                software solutions.
              </li>

              <li>
                Develop your technical and
                professional skills.
              </li>

              <li>
                Work on real-world development
                projects.
              </li>

            </ul>

          </section>

          <div className="job-apply-section">

            <h3>
              Interested in this job?
            </h3>

            <p>
              Apply now and take the next
              step in your career.
            </p>

            <button
              type="button"
              className="apply-button"
              onClick={handleApply}
              disabled={applying}
            >
              {applying
                ? 'Applying...'
                : 'Apply Now →'}
            </button>

            {applyMessage && (

              <p className="apply-message">
                {applyMessage}
              </p>

            )}

            <small>
              🔒 Your application is secure
            </small>

          </div>

        </div>

      </div>

    </main>
  )
}

export default JobDetails

