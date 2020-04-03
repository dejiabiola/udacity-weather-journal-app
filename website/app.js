/* Global Variables */

// Create a new date instance dynamically with JS
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

const apiKey = "&appid=1c99b7dbe2469eebf9caea877d515b0a";

let d = new Date();
let newDate = d.getMonth()+' '+ getMonth(d.getDate())+' '+ d.getFullYear();

function getMonth(month) {
  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthArray[month - 1];
}


//Async function that will make get request to the weather api and return the weather object
const getWeatherData = async function(baseURL, apiKey, zipCode) {
  url = baseURL + zipCode + apiKey;
  const response = await fetch(url);

  try {
    const weatherObject = await response.json();
    console.log(weatherObject);
    if (weatherObject.cod === '404') {
      errorDisplay('status code error');
      return; 
    }
    return weatherObject;
  } catch(error) {
    console.log("error", error);
  }
}

// Async function that will make post request to the node server and add data to the app
const postData = async function(url = '', data = {}) {
  
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  try {
    const weatherObject = await response.json();
    return weatherObject;
  } catch(error) {
    console.log('error', error);
  }
}

// Check for errors and displays them in the error box
function errorDisplay(error) {
  const ErrorDiv = document.getElementById('error-container');
  if (error === 'empty input box') {
    ErrorDiv.innerHTML = "<p id='error-text'>You have not entered a zip code</p>";
  } else if (error === 'status code error') {
    ErrorDiv.innerHTML = "<p id='error-text'>You have entered an invalid zip code</p>";
  }
  ErrorDiv.style.visibility = "visible";
}


function clickHandler() {
  const userResponse = document.getElementById('feelings').value;
  const zipCode = document.getElementById('zip').value;

  if (!zipCode) {
    errorDisplay('empty input box');
    return;
  } else {
    const ErrorDiv = document.getElementById('error-container');
    ErrorDiv.style.visibility = "hidden";
  }
  
  getWeatherData(baseURL, apiKey, zipCode).then(function(data) {
    postData('/add', {
      'temp': data.main.temp,
      'date': newDate,
      'userResponse': userResponse,
      'name': data.name,
      'description': data.weather[0].description
    })
  }).then(function(data) {
    updateUi();
  })
}

// Update UI with values in the weather data object from the backend node server
const updateUi = async function() {
  const response = await fetch('all');

  try {
    const data = await response.json();
    
    const date = document.getElementById('date');
    const temp = document.getElementById('temp');
    const content = document.getElementById('content');
    date.innerHTML = "<p id=date-text>Today's date is " + data.date + "</p>"
    temp.innerHTML = "<p id=temp-text>The current temperature in " + data.name + " is " + data.temperature + " fahrenheit</p>"
    content.innerHTML = "<p id=content-text>Today, you are feeling " + data.userResponse + "</p>"
  } catch(error) {
    console.log('error', error);
  }
}

// Click Event listener will call the get function once user clicks on generate button 
document.getElementById('generate').addEventListener('click', clickHandler)