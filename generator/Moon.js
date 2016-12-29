const SubstellarBody = require('./SubstellarBody');

class Moon extends SubstellarBody {
  constructor(rng = Math.random, cfg) {
    super();
    this.setMass(rng, cfg.planetMass);
  }
  // generates value for moon mass between planet's mass down to 0.0001 Earth Masses
  setMass(rng, planetMass) {
    const planetMassMod = (rng() * (3 + Math.log10(planetMass))) - 3;
    this.mass = 10 ** ((rng() * (4 + planetMassMod)) - 4);
  }
}

module.exports = Moon;
