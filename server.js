const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const axios = require('axios');
require('dotenv').config();
const api_key = process.env.api_key;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api', function (req, res, next) {
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/madred?api_key=${api_key}`)
    .then(response => {
      res.send(response.data);
    })
});

app.get(`/api/:summonerName`, function (req, res, next) {
  let summonerName = req.params.summonerName
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`)
    .then(response => {
      res.send(response.data);
    })
});

app.get(`/api/match/:summonerName`, function (req, res, next) {
  let summonerName = req.params.summonerName
  let gameId;
  let participantId;
  axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/TYzVZrekY-4Jnc-eYHcHK79rCTX-kYSDx8KPYoDIAxKU2Q?endIndex=3&api_key=${api_key}`)
    .then(response => {
      gameId = response.data.matches[0].gameId;
    })
    .then(function () {
      axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${api_key}`)
        .then(response => {
          let participants = response.data.participantIdentities;
          for (let i = 0; i < participants.length; i++) {
            if (participants[i].player.accountId === "TYzVZrekY-4Jnc-eYHcHK79rCTX-kYSDx8KPYoDIAxKU2Q") {
              participantId = participants[i].participantId;
              break;
            }
          }
          console.log(participantId)
          res.send(participantId.toString())
        })
    })
});

app.get(`/apasdfasdf`, function (req, res, next) {
  let summonerName = req.params.summonerName
  let gameId;
  let participant;
  axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/TYzVZrekY-4Jnc-eYHcHK79rCTX-kYSDx8KPYoDIAxKU2Q?endIndex=3&api_key=${api_key}`)
    .then(response => {
      gameId = response.data.matches[0].gameId;
    })
    .then(function () {
      axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${api_key}`)
        .then(response => {
          let participants = response.data.participantIdentities;
          for (let i = 0; i < participants.length; i++) {
            if (participants[i].player.accountId === "TYzVZrekY-4Jnc-eYHcHK79rCTX-kYSDx8KPYoDIAxKU2Q") {
              participant = participants[i]
              break;
            }
          }
          console.log(participant)
          res.send(participant)
        })
    })
});

app.post('/', function (req, res, next) {
  // Handle the post for this route
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
