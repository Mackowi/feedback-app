import spinner from '../assets/Loading_icon.gif'

function Spinner() {
  return (
    <img
      src={spinner}
      alt='Loading...'
      style={{
        background: 'none',
        width: '100px',
        margin: 'auto',
        display: 'block',
      }}
    />
  )
}
export default Spinner
