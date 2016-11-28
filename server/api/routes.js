var router = require('express').Router();

const getSystem = (req, res) => {
  res.json({system:null})
}

const getPlanet = (req, res) => {
  res.json({planets:null})  
}

router.get('/system', getSystem);
router.get('/planet', getPlanet);

module.exports = router;