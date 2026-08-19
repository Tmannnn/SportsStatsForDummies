require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const ODDSApiKey = process.env.ODDS_API_KEY;
const BALLDONTLIEApiKey = process.env.BALLDONTLIE_API_KEY;

app.use(cors())

// when you run node index.js, it calls to the computer with the 8080, then once the app listens it outputs the console log
app.listen(8080, () =>{
    console.log('server listening on port 8080')
    console.log("ODDSAPI Key:", ODDSApiKey);
    console.log("BALLISLIFEAPI Key:", BALLDONTLIEApiKey);
})

// calling the nbaodds api in order to get the info for these
app.get("/nba-odds", async (req, res) => {
    try{
        //console.log("nbaodds got hit");
        const url = `https://api.the-odds-api.com/v4/sports/basketball_nba/odds?regions=us&markets=h2h,spreads,totals&oddsFormat=american&apiKey=${ODDSApiKey}`;
        //console.log("Starting API request");

        const response = await fetch(url, {
        signal: AbortSignal.timeout(10000)
        });
        //console.log("Response received");
        //console.log("Status:", response.status);
        //console.log("OK:", response.ok);

        const data = await response.json();

        //console.log("JSON parsed successfully");
        //console.log("API response:", data);
        if(!response.ok){
            return res.status(response.status).json(data);
        }
        res.json(data);
    }
    catch(error){
        console.error("Error requesting odds: ", error);
        res.status(500).json({
            error: "Could not retrieve NBA odds",
        });
    }
});
// calling this gets in order to get the leaderbaord from balldontlie api
app.get("/nba-leaderboard", async (req, res) => {
    try {
      const response = await fetch(
        "http://localhost:5001/nba-standings"
      );
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      res.json(data);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Could not retrieve NBA leaderboard"
      });
    }
  });
// routing function
/*
    if someone is making a GET request with the route /, then run this function
*/