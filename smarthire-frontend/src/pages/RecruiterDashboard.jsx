import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api'
import './RecruiterDashboard.css'

function RecruiterDashboard() {

  const [jobs, setJobs] = useState([])
  const [jobApplications, setJobApplications] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadRecruiterData()
  }, [])

  async function loadRecruiterData() {
    try {
      setLoading(true)
      setError('')

      // Get real jobs from backend
      const jobsData = await apiRequest('/jobs')

      const jobList = Array.isArray(jobsData)
        ? jobsData
        : jobsData?.content || []

      setJobs(jobList)

      // Get applications for each job
      const applicationResults = await Promise.all(
        jobList.map(async (job) => {

          try {
            const data = await apiRequest(
              `/applications/job/${job.id}`
            )

            const applications = Array.isArray(data)
              ? data
              : data?.content || []

            return {
              jobId: job.id,
              applications
            }

          } catch (applicationError) {

            console.error(
              `Unable to load applications for job ${job.id}`,
              applicationError
            )

            return {
              jobId: job.id,
              applications: []
            }
          }
        })
      )

      const applicationMap = {}

      applicationResults.forEach((result) => {
        applicationMap[result.jobId] = result.applications
      })

      setJobApplications(applicationMap)

    } catch (error) {

      console.error(
        'Failed to load recruiter dashboard:',
        error
      )

      setError(
        error.message ||
        'Unable to load recruiter dashboard.'
      )

    } finally {
      setLoading(false)
    }
  }


  const totalApplicants = Object.values(jobApplications)
    .reduce(
      (total, applications) =>
        total + applications.length,
      0
    )


  const pendingReview = Object.values(jobApplications)
    .flat()
    .filter(
      (application) =>
        application.status?.toUpperCase() === 'APPLIED' ||
        application.status?.toUpperCase() === 'PENDING'
    )
    .length


  const interviews = Object.values(jobApplications)
    .flat()
    .filter(
      (application) => {

        const status =
          application.status?.toUpperCase()

        return (
          status === 'INTERVIEW' ||
          status === 'SCHEDULED'
        )
      }
    )
    .length


  const recentJobs = jobs.slice(0, 5)


  function getJobIcon(index) {

    const icons = [
      '☕',
      '💻',
      '🎨',
      '👩‍💻',
      '📄'
    ]

    return icons[index % icons.length]
  }


  function getApplicantCount(jobId) {

    return (
      jobApplications[jobId]?.length || 0
    )
  }


  return (
    <main className="recruiter-dashboard">


      <section className="recruiter-header">

        <div>

          <span className="recruiter-label">
            RECRUITER DASHBOARD
          </span>

          <h1>
            Welcome back, <span>Recruiter! 👨‍💼</span>
          </h1>

          <p>
            Manage your job postings, candidates, and hiring process from one place.
          </p>

        </div>


        <Link
          to="/jobs"
          className="post-job-button"
        >
          + Post New Job
        </Link>

      </section>


      <section className="recruiter-stats">


        <div className="recruiter-stat-card">

          <div className="recruiter-stat-icon blue">
            💼
          </div>

          <div>

            <strong>
              {jobs.length}
            </strong>

            <span>
              Jobs Posted
            </span>

          </div>

        </div>


        <div className="recruiter-stat-card">

          <div className="recruiter-stat-icon purple">
            👥
          </div>

          <div>

            <strong>
              {totalApplicants}
            </strong>

            <span>
              Total Applicants
            </span>

          </div>

        </div>


        <div className="recruiter-stat-card">

          <div className="recruiter-stat-icon orange">
            ⏳
          </div>

          <div>

            <strong>
              {pendingReview}
            </strong>

            <span>
              Pending Review
            </span>

          </div>

        </div>


        <div className="recruiter-stat-card">

          <div className="recruiter-stat-icon green">
            🎯
          </div>

          <div>

            <strong>
              {interviews}
            </strong>

            <span>
              Interviews
            </span>

          </div>

        </div>

      </section>


      <section className="recruiter-content">


        <div className="recruiter-main">


          <div className="recruiter-section-header">

            <div>

              <span>
                JOB MANAGEMENT
              </span>

              <h2>
                Recent Job Postings
              </h2>

            </div>


            <button
              type="button"
              onClick={loadRecruiterData}
            >
              Refresh
            </button>

          </div>


          <div className="job-posting-list">


            {loading && (
              <p>
                Loading recruiter data...
              </p>
            )}


            {error && (
              <p className="login-error">
                {error}
              </p>
            )}


            {!loading &&
              !error &&
              recentJobs.length === 0 && (

                <div className="job-posting-item">

                  <div className="recruiter-job-details">

                    <h3>
                      No jobs found
                    </h3>

                    <p>
                      No job postings are available.
                    </p>

                  </div>

                </div>
              )}


            {!loading &&
              !error &&
              recentJobs.map(
                (job, index) => (

                  <div
                    className="job-posting-item"
                    key={job.id}
                  >

                    <div className="recruiter-job-icon">
                      {getJobIcon(index)}
                    </div>


                    <div className="recruiter-job-details">

                      <h3>
                        {job.title}
                      </h3>

                      <p>
                        {job.company} • {job.location} •{' '}
                        {getApplicantCount(job.id)} Applicants
                      </p>

                    </div>


                    <span className="job-status active">
                      Active
                    </span>

                  </div>

                )
              )}

          </div>

        </div>


        <aside className="recruiter-sidebar">


          <div className="recruiter-profile-card">

            <div className="recruiter-avatar">
              👨‍💼
            </div>

            <h3>
              Recruiter Profile
            </h3>

            <p>
              Recruitment Team
            </p>


            <div className="recruiter-profile-info">

              <span>
                📧
              </span>

              <span>
                Recruiter Account
              </span>

            </div>


            <button
              type="button"
              className="manage-profile-button"
            >
              Manage Profile
            </button>

          </div>


          <div className="hiring-card">

            <span>
              HIRING OVERVIEW
            </span>

            <h3>
              Build your next great team.
            </h3>

            <p>
              Review candidates and find the right talent for your open positions.
            </p>

            <Link to="/jobs">
              Manage Jobs →
            </Link>

          </div>

        </aside>


      </section>

    </main>
  )
}

export default RecruiterDashboard

