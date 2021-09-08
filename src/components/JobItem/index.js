import {Link} from 'react-router-dom'

import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-container">
        <div className="job-header">
          <div className="job-org-role-container">
            <img src={companyLogoUrl} alt="company logo" className="job-logo" />
            <div className="job-role-container">
              <h1 className="job-role">{title}</h1>
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
      </li>
    </Link>
  )
}
export default JobItem
