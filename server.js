// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`Running on server ${port}`);
}




//  send the project data whenever a get request to '/all' is made
app.get('/all', function(req, res) {
  res.send(projectData);
  // console.log(projectData);
})

//Handle post requests to /
app.post('/add', function(req, res) {
  projectData.temperature = req.body.temp;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  projectData.description = req.body.description;
  projectData.name = req.body.name;
  console.log(projectData)
  res.send(projectData)
});

 
