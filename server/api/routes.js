const router = require('express').Router();
const randomGen = require('random-seed');

// generate an 8-character alphanumeric seed string
const maxVal = (36 ** 8) - 1;
const seed = Math.floor(Math.random() * maxVal).toString(36);
const r = randomGen(seed);

const starGen = require('../../generator/star');

const star = starGen(r.random);

const getSystem = (req, res) => {
  res.json(
    { meta: { version: process.env.npm_package_version },
      system: { seed, star: star.makeStar() } });
};

const getPlanet = (req, res) => {
  res.json({ planet: null });
};

router.get('/system', getSystem);
router.get('/planet', getPlanet);

module.exports = router;
