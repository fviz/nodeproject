// Import the library we installed with npm install express
const express = require('express');

// Import the file system library used to write the JSON file
const fs = require('fs');

// Initialize the webserver
const app = express();
// Use app.use to serve folders as websites.
// localhost:9999/ shows website in folder tomato
app.use("/", express.static('./tomato'));

// localhost:9999/grapes shows website in folder grapes
app.use("/grapes", express.static('./grapes'));

// localhost:9999/graffitiwall shows website in folder graffitiwall
app.use("/graffitiwall", express.static('./graffitiwall'));

// When the user submits the form on the website, the server gets a request.
// We use the data from the request to update our data.json file.
app.get("/updategraffiti", (request, response) => {
    // Get the new text from the parameter, which is named the same way as
    // the text field in the HTML file.
    let newGraffitiText = request.param('newGraffitiText');

    // Create the structure of the file
    let newJSON = {
        graffitiText: newGraffitiText
    };

    // Convert the structure into simple text
    let newJSONString = JSON.stringify(newJSON);

    // Overwrite the file
    fs.writeFileSync('./data.json', newJSONString);

    // Send user back to homepage
    response.redirect("/graffitiwall");
});

// When the user loads the website, the website asks the server for the
// current graffiti text, saved in the data.json file
app.get("/graffitiwall/getdata", (request, response) => {

    // We send the entire json file to the browser
    response.sendFile(__dirname + "/data.json");
});

// Wait for connections on port 9999
app.listen(9999);