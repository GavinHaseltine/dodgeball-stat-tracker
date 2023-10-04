const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  console.log("in tournament GET", req.body)

  let queryText = `SELECT * FROM "tournament"`
  pool.query(queryText)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((error) => {
      res.sendStatus(500)
    });
});

router.post('/', (req, res) => {
  // console.log('in tournament POST', req.body);

  const { 
    name, 
    organizer, 
    location, 
    startDate, 
    ballType, 
    courts, 
    description, 
    url } = req.body
    
    const queryValues = [name, organizer, location, ballType, description, startDate, courts, url]

    const queryText = `
      INSERT INTO "tournament" (
        "tournament_name", 
        "tournament_organizer",
        "location",
        "ball_type",
        "description",
        "start_date",
        "courts",
        "url"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `

  pool.query(queryText, queryValues)
  .then( response => {
    res.sendStatus(200)
  })
  .catch( error => {
    console.log('error in create tournament pool query', error)
    res.sendStatus(500)
  })
})

router.post('/participants', (req, res) => {

  console.log('in tournament/participants POST', req.body)

  // Creating queryValues by 
  const queryValues = []
  req.body.map( index => {
    queryValues.push(index.teamID);
    queryValues.push(index.tournamentURL);
  })
  console.log('queryValues:', queryValues);

  const createPlaceholders = (array) => {
    const rowsNeeded = array.length / 2;

    let stringToReturn = ``

    // Looping over queryValues to add ($1, $2), etc.
    for (let i = 0; i < rowsNeeded; i++) {
      stringToReturn = stringToReturn + `($${ 1 + (i * 2)}, $${2 + (i * 2)}),`
    }
    // Removing last comma
    stringToReturn = stringToReturn.slice(0, -1);
    return stringToReturn;
  }
  const placeholders = createPlaceholders(queryValues)
  console.log('placeholders:', placeholders)

  const queryText = `
    INSERT INTO "participants" (
      "team_id",
      "tournament_url"
    )
    VALUES ${placeholders}
    ;
  `
   
  pool.query(queryText, queryValues)
  .then( response => {
    console.log('success in pool create participants');
    res.sendStatus(200);
  })
  .catch( error => {
    console.log('error in pool query crete participants', error);
    res.sendStatus(500);
  })
  

  
})

module.exports = router;