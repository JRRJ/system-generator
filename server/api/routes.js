const router = require('express').Router();
const randomGen = require('random-seed');

// generate an 8-character alphanumeric seed string
const maxVal = (36 ** 8) - 1;
const seed = Math.floor(Math.random() * maxVal).toString(36);
const r = randomGen(seed);

const Star = require('../../generator/Star');
const StarSystem = require('../../generator/StarSystem');

const getStar = (req, res) => {
  res.json(
    { meta: { seed, version: process.env.npm_package_version },
      star: new Star(r.random) });
};

const getSystem = (req, res) => {
  res.json(
    { meta: { seed, version: process.env.npm_package_version },
      system: new StarSystem(r.random).system });
};

const getPlanet = (req, res) => {
  res.json({ planet: null });
};

router.get('/star', getStar);
router.get('/system', getSystem);
router.get('/planet', getPlanet);

module.exports = router;
