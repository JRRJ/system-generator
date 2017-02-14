const SubstellarBody = require('./SubstellarBody');

class Moon extends SubstellarBody {
  constructor(rng = Math.random, cfg) {
    super();
    this.setMass(rng, cfg.planetMass);
    this.setOrbit(rng, cfg.minOrbit, cfg.eccMod);
    this.setSize(rng);
    this.setGravity();
    this.tempEff = cfg.planetTemp;
    this.setDensity();
    this.setEscapeVelocity();
    this.setESI();
  }
  // generates value for moon mass between planet's mass down to 0.0001 Earth Masses
  setMass(rng, planetMass) {
    const planetMassMod = (rng() * (3 + Math.log10(planetMass))) - 3;
    this.mass = 10 ** ((rng() * (4 + planetMassMod)) - 4);
  }
}

module.exports = Moon;
