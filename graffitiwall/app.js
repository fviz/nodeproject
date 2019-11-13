// The address we defined in server.js for loading the data from data.json
const url = "/graffitiwall/getdata";

// Reference to the h2 in the HTML file where we want to display our graffitiText
const graffitiElement = document.querySelector(".graffitiText");

// Ask the server for the current text in data.json
axios.get(url)
    .then((data) => {
        // Set the content of the h2 to be the data we received from the server
        graffitiElement.innerHTML = data.data.graffitiText;
    })
    .catch(error=>console.log(error));