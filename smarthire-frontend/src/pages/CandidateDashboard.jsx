import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api'
import './CandidateDashboard.css'
function CandidateDashboard() {

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadApplications()
  }, [])

  async function loadApplications() {
    try {
      setLoading(true)
      setError('')

      /*
       * Candidate ID 8 is the profile created for the
       * currently logged-in SmartHire Test account.
       */
      const applicationData = await apiRequest(
        '/applications/candidate/8'
      )

      const applicationList = Array.isArray(applicationData)
        ? applicationData
        : applicationData?.content || []

      /*
       * Get job details for every application.
       */
      const applicationsWithJobs = await Promise.all(
        applicationList.map(async (application) => {

          try {
            const job = await apiRequest(
              `/jobs/${application.jobId}`
            )

            return {
              ...application,
              job
            }

          } catch (jobError) {
            console.error(
              `Unable to load job ${application.jobId}`,
              jobError
            )

            return {
              ...application,
              job: null
            }
          }
        })
      )

      setApplications(applicationsWithJobs)

    } catch (error) {
      console.error('Failed to load applications:', error)

      setError(
        error.message || 'Unable to load applications.'
      )

    } finally {
      setLoading(false)
    }
  }


  const totalApplications = applications.length


  const pendingApplications = applications.filter(
    (application) => {

      const status = application.status?.toUpperCase()

      return (
        status === 'PENDING' ||
        status === 'APPLIED'
      )
    }
  ).length


  const shortlistedApplications = applications.filter(
    (application) =>
      application.status?.toUpperCase() === 'SHORTLISTED'
  ).length


  const interviewApplications = applications.filter(
    (application) => {

      const status = application.status?.toUpperCase()

      return (
        status === 'INTERVIEW' ||
        status === 'SCHEDULED'
      )
    }
  ).length


  const recentApplications = applications.slice(0, 5)


  function getStatusClass(status) {

    const normalizedStatus = status?.toLowerCase()

    if (normalizedStatus === 'shortlisted') {
      return 'shortlisted'
    }

    if (
      normalizedStatus === 'pending' ||
      normalizedStatus === 'applied'
    ) {
      return 'pending'
    }

    return ''
  }


  function getApplicationIcon(index) {

    const icons = [
      '☕',
      '💻',
      '🎨',
      '👩‍💻',
      '📄'
    ]

    return icons[index % icons.length]
  }


  return (
    <main className="candidate-dashboard">

      <section className="dashboard-header">

        <div>

          <span className="dashboard-label">
            CANDIDATE DASHBOARD
          </span>

          <h1>
            Welcome back, <span>Candidate! 👋</span>
          </h1>

          <p>
            Track your applications and discover your next career opportunity.
          </p>

        </div>


        <Link
          to="/jobs"
          className="dashboard-action"
        >
          Browse Jobs →
        </Link>

      </section>


      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="stat-icon blue">
            📄
          </div>

          <div>

            <strong>
              {totalApplications}
            </strong>

            <span>
              Total Applications
            </span>

          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon orange">
            ⏳
          </div>

          <div>

            <strong>
              {pendingApplications}
            </strong>

            <span>
              Pending
            </span>

          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon green">
            ✓
          </div>

          <div>

            <strong>
              {shortlistedApplications}
            </strong>

            <span>
              Shortlisted
            </span>

          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon purple">
            💼
          </div>

          <div>

            <strong>
              {interviewApplications}
            </strong>

            <span>
              Interviews
            </span>

          </div>

        </div>

      </section>


      <section className="dashboard-content">

        <div className="dashboard-main">

          <div className="dashboard-section-header">

            <div>

              <span>
                RECENT ACTIVITY
              </span>

              <h2>
                My Applications
              </h2>

            </div>


            <button onClick={loadApplications}>
              Refresh
            </button>

          </div>


          <div className="application-list">

            {loading && (
              <p>
                Loading applications...
              </p>
            )}


            {error && (
              <p className="login-error">
                {error}
              </p>
            )}


            {!loading &&
              !error &&
              recentApplications.length === 0 && (

                <div className="application-item">

                  <div className="application-details">

                    <h3>
                      No applications yet
                    </h3>

                    <p>
                      Browse jobs and apply for your first opportunity.
                    </p>

                  </div>

                </div>
              )}


            {!loading &&
              !error &&
              recentApplications.map(
                (application, index) => (

                  <div
                    className="application-item"
                    key={application.id}
                  >

                    <div className="application-company">
                      {getApplicationIcon(index)}
                    </div>


                    <div className="application-details">

                      <h3>
                        {application.job?.title ||
                          `Job #${application.jobId}`}
                      </h3>

                      <p>
                        {application.job?.company ||
                          'Company'}{' '}
                        •{' '}
                        {application.job?.location ||
                          'Location'}
                      </p>

                    </div>


                    <span
                      className={`status ${getStatusClass(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>

                  </div>

                )
              )}

          </div>

        </div>


        <aside className="dashboard-sidebar">

          <div className="profile-card">

            <div className="profile-avatar">
              👩‍💻
            </div>

            <h3>
              Candidate Profile
            </h3>

            <p>
              Complete your profile to increase your chances of getting noticed.
            </p>


            <div className="profile-progress">

              <div className="progress-top">

                <span>
                  Profile Completion
                </span>

                <strong>
                  75%
                </strong>

              </div>


              <div className="progress-bar">

                <div></div>

              </div>

            </div>


            <button className="profile-button">
              Complete Profile
            </button>

          </div>


          <div className="quick-action-card">

            <span>
              READY FOR YOUR NEXT MOVE?
            </span>

            <h3>
              Find a job that matches your skills.
            </h3>

            <Link to="/jobs">
              Explore Jobs →
            </Link>

          </div>

        </aside>

      </section>

    </main>
  )
}

export default CandidateDashboard

