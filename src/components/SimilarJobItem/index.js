import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    title,
  } = similarJobDetails

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
            <h1 className="job-role">{title}</h1>
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

export default SimilarJobItem
