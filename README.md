
**Project Description** - This repo contains the code to the Weather Forecast Website that can be used to check the current weather and the weather forecast for the upcoming 5 days at different locations in the world. When the user enters a city name, they will be able to check the local temperature, maximum temperature, minimum temperature of the day along with the general description of the weather like cloudy/windy/misty, wind speed and precipitation. Additionally, they will be able to see the predicted weather for the next 5 days. There is also a toggle button that allows the user to check the weather in degree Fahrenheits as the default weather is shown in degree Celsius.  

**Technologies used** - HTML, CSS, JavaScript

**Frameworks/Libraries** - React

**3rd party API used** - Meteosource API - It has a free tier that provides current weather and the weather forecast for the upcoming days. 

**React packages used** - 

1. uuid - For generating unique values that will be passed as keys to list items

2. celsius-to-fahrenheit - converts temperature from degree celsius to fahrenheit

**Commit history** - 

**First major commit (4/10/2022)** - Created the blueprint for the UI, global context provider and displayed current weather. 

**Second major commit (18/10/2022)** - Added the loader for user experience (UX), added functionality of displaying weather data information about a location according to user input.

**Third major commit (19/10/2022)** - Completed the UI, which shows the current weather and predicted weather for the next 5 days.  

**Fourth major commit (20/10/2022)** - Added user input validation, error message, unique keys to list items

**Fifth major commit (23/10/2022)** - Added functionality of conversion to degree Fahrenheits by using toggle switch

**Final commit (23/10/2022)** - Updated the UI and deployed the website on Vercel. 

**Issues/Bugs** - 

1. **OpenWeatherMap API** - The free version of OpenWeatherMap API doesn't contain the data for weather forecast of upcoming days and its weather icons are not clear at all. Because of this, I switched to Weather DB which has more useful data that can be used.  

2. **WeatherDB API not working any longer (October 25 2022)** - WeatherDB API stopped working, so I switched to Meteosource API, which has a free tier that allows 10 calls/minute and 400 calls/day 

# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


