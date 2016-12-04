const router = require('express').Router();
const randomGen = require('random-seed');

//generate an 8-character alphanumeric seed string 
const maxVal = Math.pow(36,8)-1;
let seed = Math.floor(Math.random()*maxVal).toString(36);
let r = randomGen(seed);

const starGen = require('../../generator/star');
const star = starGen(r.random);

const getSystem = (req, res) => {
  res.json({system:process.env.npm_package_version, meta:{rand:star.mass(), seed:seed}})
}

const getPlanet = (req, res) => {
  res.json({planet:null})  
}

router.get('/system', getSystem);
router.get('/planet', getPlanet);

module.exports = router;