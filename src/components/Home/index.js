import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      history.replace('/login')
    } else {
      history.replace('/jobs')
    }
  }

  const renderContent = () => (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="home-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button
            type="button"
            className="find-button"
            onClick={onClickFindJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )

  return renderContent()
}
export default Home
