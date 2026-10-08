import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Jobs.css'

function Jobs() {

  const navigate = useNavigate()

  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {

    async function loadJobs() {

      try {

        setLoading(true)
        setError('')

        const response = await fetch(
          'http://localhost:8080/jobs'
        )

        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status}`
          )
        }

        const data = await response.json()

        setJobs(data)

      } catch (error) {

        console.error('Jobs loading error:', error)

        setError(
          'Unable to connect to the SmartHire server.'
        )

      } finally {

        setLoading(false)

      }
    }

    loadJobs()

  }, [])

  const filteredJobs = jobs.filter((job) => {

    const keyword = search.toLowerCase()

    return (
      job.title?.toLowerCase().includes(keyword) ||
      job.company?.toLowerCase().includes(keyword) ||
      job.location?.toLowerCase().includes(keyword)
    )

  })

  return (
    <main className="jobs-page">

      <section className="jobs-header">

        <span className="jobs-label">
          OPPORTUNITIES FOR YOU
        </span>

        <h1>
          Find Your <span>Next Opportunity</span>
        </h1>

        <p>
          Explore jobs from leading companies and take
          the next step in your career.
        </p>

      </section>

      <section className="job-search-section">

        <div className="job-search-box">

          <span className="search-icon">
            🔎
          </span>

          <input
            type="text"
            placeholder="Search by job title, company or location..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

      </section>

      <section className="jobs-content">

        {loading && (
          <div className="no-jobs">

            <div>⏳</div>

            <h2>
              Loading jobs...
            </h2>

            <p>
              Fetching opportunities from SmartHire.
            </p>

          </div>
        )}

        {!loading && error && (
          <div className="no-jobs">

            <div>⚠️</div>

            <h2>
              Unable to load jobs
            </h2>

            <p>
              {error}
            </p>

          </div>
        )}

        {!loading && !error && (
          <>

            <div className="jobs-topbar">

              <div>
                <strong>
                  {filteredJobs.length}
                </strong>{' '}
                jobs found
              </div>

            </div>

            <div className="jobs-grid">

              {filteredJobs.map((job) => (

                <div
                  className="job-card"
                  key={job.id}
                >

                  <div className="job-card-top">

                    <div className="company-icon">
                      💼
                    </div>

                    <button
                      type="button"
                      className="bookmark-button"
                    >
                      ♡
                    </button>

                  </div>

                  <h2>
                    {job.title}
                  </h2>

                  <p className="company">
                    {job.company}
                  </p>

                  <div className="job-info">

                    <span>
                      📍 {job.location}
                    </span>

                    <span>
                      💰 ₹{Number(job.salary).toLocaleString('en-IN')}
                    </span>

                  </div>

                  <div className="job-tags">

                    <span>
                      {job.employmentType}
                    </span>

                    <span>
                      SmartHire
                    </span>

                  </div>

                  <button
                    type="button"
                    className="apply-button"
                    onClick={() =>
                      navigate(`/jobs/${job.id}`)
                    }
                  >
                    View Details →
                  </button>

                </div>

              ))}

            </div>

            {filteredJobs.length === 0 && (
              <div className="no-jobs">

                <div>🔍</div>

                <h2>
                  No jobs found
                </h2>

                <p>
                  Try another job title, company or location.
                </p>

              </div>
            )}

          </>

        )}

      </section>

    </main>
  )
}

export default Jobs

