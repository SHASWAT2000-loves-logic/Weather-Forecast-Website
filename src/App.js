// The App component consists of the following components -

//1. Form
//2. DisplayWeather

import { WeatherProvider } from "./context/WeatherContext";
import Form from "./components/Form";
import DisplayWeather from "./components/DisplayWeather";
function App() {
  return (
    <WeatherProvider>
      <div id="weather_container">
        <Form />
        <DisplayWeather />
      </div>
    </WeatherProvider>
  );
}

export default App;
