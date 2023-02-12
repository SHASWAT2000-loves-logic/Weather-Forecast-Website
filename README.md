
# Project Description

This repo contains the code for my Weather Forecast website

## Features

1. Enter a city name and find out the current weather at that place along with the maximum and minimum temperature of the day.
2. Check other weather properties like description by a weather icon, precipitation and wind speed.
3. Check weather forecast for the next 5 days. 
4. A toggle button to get the temperature in degree Celsius and degree Fahrenheit (default unit).
5. Error notification in case of no input or invalid user input. 

### Project link - https://weather-forecast-lyart.vercel.app/

### Motivation for the project

To learn how to use REST API in a React app and handle events in React for interactivity in the website.

### Major takeaways from the project

1. How to use context API by using Context Provider.
2. How to extensively use hooks like useState, useEffect, useContext
3. How to store all images in a folder in an object and then import it to use them in the img tag.  
4. How to fetch data from 3rd party REST API using async/await    

### Technologies used

HTML, CSS, JavaScript

### Frameworks/Libraries

React

### Commit history

**First major commit (10/4/2022)** - Created the blueprint for the UI, global context provider and displayed current weather. 

**Second major commit (10/18/2022)** - Added the loader for user experience (UX), added functionality of displaying weather data information about a location according to user input.

**Third major commit (10/19/2022)** - Completed the UI, which shows the current weather and predicted weather for the next 5 days.  

**Fourth major commit (10/20/2022)** - Added user input validation, error message, unique keys to list items

**Fifth major commit (10/23/2022)** - Added functionality of conversion to degree Fahrenheits by using toggle switch

**Final commit (11/1/2022)** - Updated the code to accomodate the fetched weather information from the Meteosource API and deployed the website on Vercel. 

**Update (02/10/2023)** - Reduced repeating code and created a card to be displayed in case of invalid user input. 

### 3rd party API used 

Meteosource API - It has a free tier that provides current weather and the weather forecast for the upcoming days. It has a maximum limit of 10 API calls per minute and 400 API calls per day 

### React packages used

1. uuid - For generating unique values that will be passed as keys to list items

2. celsius-to-fahrenheit - converts temperature from degree celsius to fahrenheit

### Media Queries

None 

### Issues/Bugs 

1. **OpenWeatherMap API (resolved)** - The free version of OpenWeatherMap API doesn't contain the data for weather forecast of upcoming days and its weather icons are not clear at all. Because of this, I switched to Weather DB which has more useful data that can be used.  

2. **WeatherDB API occasionally doesn't work (as of October 25 2022) (resolved)** - WeatherDB API wasn't consistently working every time, and this led to 404 error. So I switched to Meteosource API, which provides its services 24 hours a day and is fully supported across all browsers. 

3. **Environment variable for API key is not being recognized by Github (resolved)** - This was mostly a deploying problem related to Vercel rather than Github. I created an environment variable in Vercel and the application started working smoothly.  

### How to further improve this website

1. Have a dropdown of suggestions of cities related to the one that the user is inputting. 
2. Add media queries 

# Getting Started with this project

To run the code on your machine, clone this repository

## Available Scripts

In the project directory, you can type the following in your terminal:

### `npm start`

Runs the app in the development mode
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes



