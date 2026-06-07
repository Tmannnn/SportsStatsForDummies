const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

// when you run node index.js, it calls to the computer with the 8080, then once the app listens it outputs the console log
app.listen(8080, () =>{
    console.log('server listening on port 8080')
})

// routing function
/*
    if someone is making a GET request with the route /, then run this function
*/
app.get('/', (req, res) =>{
    res.send('Hello from our server!')
})