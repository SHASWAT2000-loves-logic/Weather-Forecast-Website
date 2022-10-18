
// This component is used to display the weather in a card

import {useContext, useEffect} from "react"
import WeatherContext from "../context/WeatherContext";
import Spinner from "./Spinner";

function DisplayWeather() {
  const {weatherData,loading,time, date, city,fetchWeather} = useContext(WeatherContext);

  // fetching data only when the user enters a new city in the input field

  useEffect(() =>{
    fetchWeather();
  }, [city])
  
  // When the data has been fetched, display the weather of the particular location
  if(!loading){
    return (
      <div className="card">
        <div className="weather_info">
          <p>{weatherData.name}<sup>{weatherData.sys.country}</sup></p>
          <p>{weatherData.main.temp} </p>
        </div>
        {/* <img src={`http://openweathermap.org/img/wn/${fetchedData.weather[0].icon}.png`} alt="" /> */}
        <p>{date}</p>
        <p>{time}</p>
      </div>
    )
  }

  // While the data is being fetched, we will display Loading... 
  else{
    return (
      <Spinner/>
    )
  }
}

export default DisplayWeather
