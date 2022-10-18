import spinner from "../assets/spinner.gif"

function Spinner() {
  return (
    <div className="spinner_image">
      <img src={spinner} alt="Loading..." />
    </div>
  )
}

export default Spinner
