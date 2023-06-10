import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'

function About() {
  return (
    <Card>
      <div className='about'>
        <h1>About This Project</h1>
        <p>This is a React app to leave feedback of a product or service</p>
      </div>

      <p>
        <Link to='/'>Back To Home</Link>
      </p>
    </Card>
  )
}
export default About
