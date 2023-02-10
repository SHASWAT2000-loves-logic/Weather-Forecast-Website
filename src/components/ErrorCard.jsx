
// This component displays the error card in case of invalid user input. This component persists till the user enters a valid city name 

function ErrorCard() {
  return (
    <div className="error_card">No weather information is available for the city you entered. Please try other locations.</div>
  )
}

export default ErrorCard
