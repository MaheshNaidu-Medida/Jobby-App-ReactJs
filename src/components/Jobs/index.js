import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {IoLocationSharp} from 'react-icons/io5'
import {BsSearch, BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const profileApiStatusConst = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const jobsApiStatusConst = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class Jobs extends Component {
  state = {
    profileApiStatus: profileApiStatusConst.loading,
    jobsApiStatus: jobsApiStatusConst.loading,
    profileDetails: {},
    jobsList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getProfileApi()
    this.getJobsApi()
  }

  getProfileApi = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const fetchedData = await response.json()
    if (response.ok) {
      const profileDetails = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileApiStatus: profileApiStatusConst.success,
        profileDetails,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConst.failure})
    }
  }

  getUpdatedJob = eachJob => {
    const updatedJob = {
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }
    return updatedJob
  }

  getJobsApi = async () => {
    const {employmentType, salaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const empType = employmentType.join()
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salaryRange}&search=${searchInput}`,
      options,
    )
    const fetchedData = await response.json()

    if (response.ok) {
      const jobsList = fetchedData.jobs.map(eachJob =>
        this.getUpdatedJob(eachJob),
      )
      this.setState({jobsApiStatus: jobsApiStatusConst.success, jobsList})
    } else {
      this.setState({jobsApiStatus: jobsApiStatusConst.failure})
    }
  }

  retryProfileApi = () => {
    this.setState(
      {profileApiStatus: profileApiStatusConst.loading},
      this.getProfileApi,
    )
  }

  onClickSearch = () => {
    this.setState({jobsApiStatus: jobsApiStatusConst.loading}, this.getJobsApi)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckbox = event => {
    const {employmentType} = this.state
    const index = employmentType.indexOf(event.target.value)
    if (index === -1) {
      employmentType.push(event.target.value)
      this.setState({employmentType})
    } else {
      employmentType.pop(event.target.value)
      this.setState({employmentType})
    }
  }

  onChangeRadio = event => {
    this.setState({salaryRange: event.target.value})
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailure = () => (
    <div className="profile-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.retryProfileApi}
      >
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-content-container">
        <img src={profileImageUrl} alt="profile" className="profile-icon" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderProfileContent = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case profileApiStatusConst.loading:
        return this.renderLoader()
      case profileApiStatusConst.success:
        return this.renderProfile()
      case profileApiStatusConst.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  retryJobsApi = () => {
    this.setState({jobsApiStatus: jobsApiStatusConst.loading}, this.getJobsApi)
  }

  renderJobItem = jobItem => {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      id,
    } = jobItem

    return (
      <Link to={`/jobs/${id}`} className="link">
        <div className="job-container">
          <div className="job-header">
            <div className="job-org-role-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="job-logo"
              />
              <div className="job-role-container">
                <p className="job-role">{title}</p>
                <div className="job-rating-container">
                  <div className="star-icon-container">
                    <AiFillStar className="star-icon" />
                  </div>

                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>

            <div className="job-loc-type-salary-container">
              <div className="job-location-type-container">
                <div className="job-loc-container">
                  <div>
                    <IoLocationSharp className="location-icon" />
                  </div>
                  <p className="location">{location}</p>
                </div>
                <div className="job-type-container">
                  <div>
                    <BsBriefcaseFill className="brief-case-icon" />
                  </div>
                  <p className="job-type">{employmentType}</p>
                </div>
              </div>
              <div className="job-salary-container">
                <p className="package">{packagePerAnnum}</p>
              </div>
            </div>
          </div>
          <hr className="rule" />
          <h1 className="job-description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </Link>
    )
  }

  renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.retryJobsApi}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobs()
    }

    return jobsList.map(eachJob => this.renderJobItem(eachJob))
  }

  renderJobContent = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsApiStatusConst.loading:
        return this.renderLoader()
      case jobsApiStatusConst.success:
        return this.renderJobs()
      case jobsApiStatusConst.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }

  renderSalaryRanges = () => (
    <ul className="list-container">
      <h1 className="list-heading">Salary Range</h1>
      {salaryRangesList.map(eachItem => (
        <li className="list-item" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            name="salary"
            value={eachItem.salaryRangeId}
            onChange={this.onChangeRadio}
            id={eachItem.salaryRangeId}
            className="radio-button"
          />
          <label htmlFor={eachItem.salaryRangeId} className="label">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderEmpTypes = () => (
    <ul className="list-container">
      <h1 className="list-heading">Type of Employment</h1>
      {employmentTypesList.map(eachItem => (
        <li className="list-item" key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            value={eachItem.employmentTypeId}
            onChange={this.onChangeCheckbox}
            id={eachItem.employmentTypeId}
            name={eachItem.employmentTypeId}
            className="checkbox-button"
          />
          <label htmlFor={eachItem.employmentTypeId} className="label">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderContent = () => {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-spacing-container">
            <div className="first-container">
              <div className="first-search-container">
                <input
                  type="search"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  className="search-input-first"
                />
                <div className="first-search-btn-container">
                  <button
                    type="button"
                    testid="searchButton"
                    className="search-button-first"
                    onClick={this.onClickSearch}
                  >
                    <BsSearch className="search-icon-first" />
                  </button>
                </div>
              </div>
              <div className="menu-container">
                {this.renderProfileContent()}
              </div>
              <hr className="rule" />
              <div className="menu-container">{this.renderEmpTypes()}</div>
              <hr className="rule" />
              <div className="menu-container">{this.renderSalaryRanges()}</div>
            </div>

            <div className="second-container">
              <div className="second-search-container">
                <input
                  type="search"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  className="search-input-second"
                />

                <div className="second-search-btn-container">
                  <button
                    type="button"
                    testid="searchButton"
                    className="search-button-second"
                    onClick={this.onClickSearch}
                  >
                    <BsSearch className="search-icon-second" />
                  </button>
                </div>
              </div>

              {this.renderJobContent()}
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    return this.renderContent()
  }
}
export default Jobs
