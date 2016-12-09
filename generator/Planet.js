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
// right now may generate entire planet that gets tossed out if outside roche limit;

class Planet {
  constructor(rng = Math.random, cfg) {
    console.log(cfg);
    this.setMass(rng);
    this.setSize(rng);
    this.gravity = this.mass / (this.size ** 2);
    this.orbit = {};
    this.setOrbit(rng, cfg.minOrbit, cfg.eccMod);
    this.setTemp(cfg.luminosity);
  }
  // generates a number between 4000 and 0.004 Earth masses
  setMass(rng) {
    this.mass = 4 * (10 ** (((rng() + rng()) * 3) - 3));
  }

  setSize(rng) {
    if (this.mass > 200) {
      this.size = 22.6 * (this.mass ** -0.0886);
    } else if (this.mass > 1) {
      this.size = this.mass ** 0.5;
    } else {
      this.size = this.mass ** 0.29;
    }
    this.size *= (0.5 + ((rng() + rng()) / 2));
  }

  setOrbit(rng, prevOrbit, eccMod) {
    this.orbit.eccentricity = eccMod * (rng() ** 3);
    if (prevOrbit === 0) {
      this.orbit.sMA = (rng() / 2) + 0.01;
    } else {
      this.orbit.sMA = (prevOrbit * ((rng() * 1.5) + 1.05)) / (1 - this.orbit.eccentricity);
    }
  }

  // effective temperature
  setTemp(luminosity) {
    this.tempEff = 277 * (luminosity ** 0.25) / (this.orbit.sMA ** 0.5);
  }
}

module.exports = Planet;
