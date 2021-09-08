import './index.css'

const SalaryRangeItem = props => {
  const {salaryRangeDetails, onChangeRadio} = props
  const {salaryRangeId, label} = salaryRangeDetails
  const onClickRadio = event => {
    onChangeRadio(event)
  }
  return (
    <li className="list-item">
      <input
        type="radio"
        name="salary"
        value={salaryRangeId}
        id={salaryRangeId}
        className="radio-button"
        onClick={onClickRadio}
      />
      <label htmlFor={salaryRangeId} className="label">
        {label}
      </label>
    </li>
  )
}
export default SalaryRangeItem
