import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li key={name} className="skill-item">
      <img src={imageUrl} alt={name} className="skill-logo" />
      <p className="skill">{name}</p>
    </li>
  )
}
export default SkillItem
