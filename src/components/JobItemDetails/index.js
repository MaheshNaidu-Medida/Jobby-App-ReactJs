import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Header from '../Header'

import './index.css'

const apiStatusConst = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConst.loading,
    fetchedData: {},
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobDetailsApi()
  }

  getJobDetailsApi = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      }

      const similarJobsData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        apiStatus: apiStatusConst.success,
        similarJobsData,
        fetchedData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  getJobTitle = async id => {
    let tentativeTitle
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      tentativeTitle = 'No Title'
    } else {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const url =
        'https://apis.ccbp.in/jobs?employment_type=&minimum_package=&search='
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const {jobs} = data
        const currentJobItem = jobs.find(each => {
          if (each.id === id) {
            return true
          }
          return false
        })
        const {title} = currentJobItem
        tentativeTitle = title
      } else {
        tentativeTitle = 'No Title'
      }
    }
    return tentativeTitle
  }

  retryJobItemApi = () => {
    this.setState({apiStatus: apiStatusConst.loading}, this.getJobDetailsApi)
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSkillItem = skill => {
    const {imageUrl, name} = skill
    return (
      <li className="skill-item">
        <img src={imageUrl} alt={name} className="skill-logo" />
        <p className="skill">{name}</p>
      </li>
    )
  }

  renderLifeAtCompany = lifeAtCompany => {
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="life-at-company-container">
        <p className="life-at-company-description">{description}</p>
        <img
          src={imageUrl}
          alt="life at company"
          className="life-at-company-image"
        />
      </div>
    )
  }

  renderSimilarJobItem = jobItem => {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      id,
      location,
      rating,
      title,
    } = jobItem

    return (
      <li key={id} className="similar-job-item">
        <div className="job-header">
          <div className="job-org-role-container">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
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
        </div>
        <h1 className="job-description-heading">Description</h1>

        <p className="description">{jobDescription}</p>

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
        </div>
      </li>
    )
  }

  renderItem = () => {
    const {fetchedData} = this.state
    const {similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = fetchedData

    const title = this.getJobTitle(id)
    return (
      <>
        <Header />
        <div className="job-item-bg-container">
          <div className="job-item-container">
            <div className="job-header">
              <div className="job-org-role-container">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
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
            <div className="description-container">
              <h1 className="job-description-heading">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                className="link"
                rel="noreferrer"
              >
                Visit
                <FaExternalLinkAlt className="link-icon" />
              </a>
            </div>
            <p className="description">{jobDescription}</p>

            <h1 className="headings">Skills</h1>
            <ul className="skill-container">
              {skills.map(eachSkill => this.renderSkillItem(eachSkill))}
            </ul>
            <h1 className="headings">Life at Company</h1>
            {this.renderLifeAtCompany(lifeAtCompany)}
          </div>

          <div className="similar-jobs-container">
            <h1 className="headings">Similar Jobs</h1>
            <ul className="similar-jobs-list">
              {similarJobsData.map(each => this.renderSimilarJobItem(each))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <>
      <Header />
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
          onClick={this.retryJobItemApi}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.loading:
        return this.renderLoader()
      case apiStatusConst.success:
        return this.renderItem()
      case apiStatusConst.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderContent()
  }
}

export default JobItemDetails
