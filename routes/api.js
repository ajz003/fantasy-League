var express = require('express');
var router = express.Router();
const axios = require('axios');
const api_key = process.env.api_key;
const bodyParser = require('body-parser');
var APIUtils = require('../common/APIUtils');

router.get('/', function (req, res, next) {
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/madred?api_key=${api_key}`)
    .then(response => {
      res.send(response.data);
    })
});

// Gets Summoner data
router.get(`/:summonerName`, function (req, res, next) {
  console.log(req.body)
  let summonerName = req.params.summonerName
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`)
    .then(response => {
      res.send(response.data);
    })
});

// Gets Summoner accountId
router.get(`/:summonerName/accountId`, function (req, res, next) {
  let summonerName = req.params.summonerName
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`)
    .then(response => {
      res.send(response.data.accountId);
    })
});

router.get(`/match/:summonerName`, function (req, res, next) {
  let summonerName = req.params.summonerName
  let gameId;
  let participantId;
  let accountId;
  let playerGameData;

  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`)
    .then(response => {
      accountId = response.data.accountId;
      axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=3&api_key=${api_key}`)
        .then(response => {
          gameId = response.data.matches[0].gameId;
        })
        .then(function () {
          axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${api_key}`)
            .then(response => {
              let participants = response.data.participants;
              let participantsIdentities = response.data.participantIdentities;
              for (let i = 0; i < participantsIdentities.length; i++) {
                if (participantsIdentities[i].player.accountId === accountId) {
                  participantId = participantsIdentities[i].participantId;
                  break;
                }
              }

              for (let i = 0; i < participants.length; i++) {
                if (participants[i].participantId === participantId) {
                  playerGameData = participants[i];
                  break;
                }
              }

              console.log(playerGameData, "playerGameData")

              let stats = playerGameData.stats;

              res.send(APIUtils.calculatePlayerScore(stats).toString())
            })
        })
    })
});

router.get(`/apasdfasdf`, function (req, res, next) {
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

router.post('/', function (req, res, next) {
  // Handle the post for this route
});


module.exports = router;