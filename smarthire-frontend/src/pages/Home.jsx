import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            🚀 Smart Hiring. Better Careers.
          </div>

          <h1>
            Build Your
            <span> Future </span>
            With SmartHire
          </h1>

          <p>
            Discover the right opportunities, connect with recruiters,
            and take the next step toward your dream career.
          </p>

          <div className="hero-buttons">
            <Link to="/jobs" className="btn primary-btn">
              Explore Jobs →
            </Link>

            <Link to="/login" className="btn secondary-btn">
              Get Started
            </Link>
          </div>

          <div className="hero-stats">

            <div className="stat-item">
              <strong>4</strong>
              <span>Live Jobs</span>
            </div>

            <div className="stat-item">
              <strong>2</strong>
              <span>Hiring Roles</span>
            </div>

            <div className="stat-item">
              <strong>24/7</strong>
              <span>Career Access</span>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="floating-card card-one">
            <span>💼</span>

            <div>
              <strong>New Opportunity</strong>
              <small>Java Developer</small>
            </div>
          </div>

          <div className="hero-circle">

            <div className="hero-icon">
              🎯
            </div>

            <h3>
              Your Career,
              <br />
              Your Choice.
            </h3>

            <p>
              Find opportunities that match your skills.
            </p>

          </div>

          <div className="floating-card card-two">

            <span>✓</span>

            <div>
              <strong>Application</strong>
              <small>Successfully Submitted</small>
            </div>

          </div>

        </div>

      </section>


      {/* Features Section */}
      <section className="features-section">

        <div className="section-heading">

          <span>WHY SMARTHIRE?</span>

          <h2>
            Everything You Need
            <br />
            For Your Career Journey
          </h2>

          <p>
            SmartHire makes the recruitment process simpler for both
            candidates and recruiters.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🔎
            </div>

            <h3>
              Find Right Jobs
            </h3>

            <p>
              Search and discover opportunities based on your skills,
              location and career goals.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ⚡
            </div>

            <h3>
              Easy Applications
            </h3>

            <p>
              Apply for jobs quickly and keep track of your application
              status from one place.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🤝
            </div>

            <h3>
              Connect With Recruiters
            </h3>

            <p>
              Help recruiters discover talented candidates and manage
              the hiring process efficiently.
            </p>

          </div>

        </div>

      </section>


      {/* CTA Section */}
      <section className="cta-section">

        <div>

          <span>
            READY TO START?
          </span>

          <h2>
            Your Next Opportunity
            <br />
            Could Be One Click Away.
          </h2>

        </div>

        <Link
          to="/jobs"
          className="cta-button"
        >
          Find Your Job →
        </Link>

      </section>

    </main>
  )
}

export default Home
