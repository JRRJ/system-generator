const SubstellarBody = require('./SubstellarBody');
const Moon = require('./Moon');

// not using this at all right now:
// upper limits
const tempClassification = {
  freezing: 223,
  cold: 273,
  temperate: 323,
  hot: 373,
  burning: Infinity,
};
const sizeClassification = {
  mercurian: 0.1,
  subterran: 0.5,
  terran: 2,
  superterran: 10,
  neptunian: 50,
  jovian: 4000,
  brownDwarf: 25000,
};

// will need to change the overall organization of system generation,
// right now may generate entire planet that gets tossed out if outside limit;

class Planet extends SubstellarBody {
  constructor(rng = Math.random, cfg) {
    super();
    this.setMass(rng);
    this.setSize(rng);
    this.setGravity();
    this.orbit = {};
    this.setOrbit(rng, cfg.minOrbit, cfg.eccMod);
    this.setTemp(cfg.luminosity);
    this.addMoons(rng);
  }
  // generates a number between 4000 and 0.004 Earth masses
  setMass(rng) {
    this.mass = 4 * (10 ** (((rng() + rng()) * 3) - 3));
  }

  // effective temperature
  setTemp(luminosity) {
    this.tempEff = 277 * (luminosity ** 0.25) / (this.orbit.sMA ** 0.5);
  }

  addMoons(rng) {
    this.moons = [];
    // depends on mass and orbit.
    const moonCount =
      Math.floor((rng() * 8) + (2 * Math.log10(this.mass))
      - (5 - (4 * Math.log10(Math.min(this.orbit.sMA, 10)))));
    let minOrbit = 0;
    for (let i = 0; i < moonCount; i += 1) {
      const moon = new Moon(rng, { planetMass: this.mass });
      this.moons.push(moon);
      minOrbit = moon.orbit.sMA;
    }
  }

}

module.exports = Planet;
