
// This component is used to display the weather in a card

import {useContext, useEffect} from "react"
import WeatherContext from "../context/WeatherContext";
import Spinner from "./Spinner";
import { v4 as uuid } from 'uuid';

function DisplayWeather() {

  // getting state, functions from the global context 
  const {weatherData,loading,city,fetchWeather, futureForecast} = useContext(WeatherContext);

  // fetching data only when the user enters a new city in the input field

  useEffect(() =>{
    fetchWeather();
  }, [city])
  
  // When the data has been fetched, display the weather of the particular location
  if(!loading){
    return (
      // card will display all the weather information
      <div className="card">

        <div className="location_info">
          <h3>{weatherData.region}</h3>
        </div>

        <div className="main_weather">
          <h3>{weatherData.currentConditions.temp.c}<sup className="main_exponent">&deg;C</sup></h3>
          <img src={weatherData.currentConditions.iconURL} alt="" />
        </div>

        <div className="general_weather">
          <div className="day_weather">
            <p>Max temp of day: {weatherData.next_days[0].max_temp.c}<sup className="general_exponent">&deg;C</sup></p>
            <p>Min temp of day: {weatherData.next_days[0].min_temp.c}<sup className="general_exponent">&deg;C</sup></p>
            <p>Last Updated: {weatherData.currentConditions.dayhour} (local time)</p>
          </div>

          <div className="hourly_description">
            <p>Description: {weatherData.currentConditions.comment}</p>
            <p>Humidity: {weatherData.currentConditions.humidity}</p>
            <p>Precipitation: {weatherData.currentConditions.precip}</p>
          </div>
        </div>

        <div className="weather_flex">
          {futureForecast.map((weatherDay) =>{
            return (
            <ul className="future_weather">
              <li key={uuid()}>{weatherDay.day}</li>
              <li key={uuid()}><img src={weatherDay.iconURL} alt=""/></li>
              <li key={uuid()}>{weatherDay.max_temp.c}<sup className="celsius">&deg;C</sup> | {weatherDay.min_temp.c}<sup className="celsius">&deg;C</sup></li>
            </ul>
          )})}
          
        </div>
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
