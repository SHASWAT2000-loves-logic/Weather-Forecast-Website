
// This component is used to display the weather in a card component

import {useContext, useEffect, useState} from "react"
import WeatherContext from "../context/WeatherContext";
function DisplayWeather() {
  const {fetchedData,loading,time, date, fetchWeather} = useContext(WeatherContext);

  // fetching data

  useEffect(() =>{
    fetchWeather();
  }, [])

  // When the data has been fetched, show the weather
  if(!loading){
    return (
      <div className="card">
        <p>{date}</p>
        <p>{time}</p>
        <p>{fetchedData.main.temp}</p>
      </div>
    )
  }

  // While the data is being fetched, we will display Loading... 
  else{
    return (
      <h1>Loading ...</h1>
    )
  }
}

export default DisplayWeather
