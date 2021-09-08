import './index.css'

const EmploymentTypeItem = props => {
  const {employmentTypeDetails, onChangeCheckbox} = props
  const {employmentTypeId, label} = employmentTypeDetails
  const onClickCheckbox = event => onChangeCheckbox(event)

  return (
    <li className="list-item">
      <input
        type="checkbox"
        value={employmentTypeId}
        onClick={onClickCheckbox}
        id={employmentTypeId}
        name={employmentTypeId}
        className="checkbox-button"
      />
      <label htmlFor={employmentTypeId} className="label">
        {label}
      </label>
    </li>
  )
}
export default EmploymentTypeItem
