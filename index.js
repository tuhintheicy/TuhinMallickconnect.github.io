const { connectDatabase } = require("./controllers/mongo.js")
const { Client } = require("./controllers/models.js")
const express = require('express');

// path is not installed using node.js, it is a built in node module
const path = require('path');

// used to configure .env file to store secret keys
const dotenv = require('dotenv');
dotenv.config()

// creating an instance of the express app
const app = express();

// if PORT is defined inside .env file use that else use port 3000
const port = process.env.PORT || 3000

// used to setup the directory where html files are stores
// in case of a view engine, we could have used app.set() and set views directory
const viewsPath = path.join(__dirname + "/public/html")

// defining we are going to use json format to transfer data
// in previous versions we could have used body-parser
// without this, req.body can not be parsed
app.use(express.json());

// setting up path from where to serve the static files
// static files such as frontend javascript, css, images needs to be served
// from subdirectories of /static directory for the frontend to consume
app.use('/static', express.static(path.join(__dirname, 'public')))


// creating different routes to get different html files served
app.get("/", function (req, res) {
    // setting up the status code to be 200, i.e. success
    // other status codes can be 
    // 3xx type - for redirection
    // 4xx type - for client side error
    // 5xx type - for server side error
    res.status(200);
    // we could have used a callback function which takes the error
    // as argument and handle if file could not be found or could not be read
    res.sendFile(`${viewsPath}/index.html`)
})

app.get("/about", function (req, res) {
    res.status(200);
    res.sendFile(`${viewsPath}/about.html`)
})

app.get("/blogs", function (req, res) {
    res.status(200);
    res.sendFile(`${viewsPath}/blogs.html`)
})

app.get("/contacts", function (req, res) {
    res.status(200);
    res.sendFile(`${viewsPath}/contacts.html`)
})

app.get("/services", function (req, res) {
    res.status(200);
    res.sendFile(`${viewsPath}/services.html`)
})

app.post("/contact-me-form-submitted", async function (req, res) {
    const body = req.body
    const newClient = new Client({ ...body })
    try {
        const insertedClient = await newClient.save();
        res.status(201).json(insertedClient)
    } catch (err) {
        if (err.code === 11000) {
            console.log(err);
            console.log(err.code);
            res.status(409).send('email already exists');
        } else {
            console.log(err)
            res.status(500).send();
        }
    }
})



// starting the server, the callback function takes err as the argument
app.listen(port, async function (err) {
    if (err) {
        // if there is an error we show server could not be started
        console.log("could not start server");
    } else {
        // there is no error so server started
        console.log("server started at port ", port)
        // establish connection with database
        await connectDatabase();
    }
})