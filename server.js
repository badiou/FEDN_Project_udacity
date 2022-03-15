// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser=require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors')
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));



//Route to get all data
app.get('/',(req,res)=>{
    //res.send(projectData)
});

//Route for post data
app.post('/add',(req,res)=>{
    let newData=req.body;
    let newEntry={
        temp:newData.temp,
        date:newData.date,
        content:newData.content
    }
    projectData.push(newEntry);
    res.send(projectData);
})

// create a port
const port=8000;
// Setup Server
const server=app.listen(port,()=>{
    console.log('Server running');
    console.log(`Running on localhost: ${port}`);
});


