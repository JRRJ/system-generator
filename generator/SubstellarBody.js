// Superclass for planets and moons

class SubstellarBody {
  constructor() {
    // console.log(cfg);
    this.mass = 0;      // Earth Masses
    this.size = 0;      // Earth Radii
    this.gravity = 0;   // Earth Gravity
    this.density = 0;   // Earth Density
    this.orbit = {};    // {sMA: AU, eccentricity: unitless}
    this.tempEff = 0;   // degrees K
    this.escapeVelocity = 0;   // km/s
    this.ESI = 1;       // unitless
  }

  setSize(rng) {
    if (this.mass > 200) {
      this.size = 22.6 * (this.mass ** -0.0886);
    } else if (this.mass > 1) {
      this.size = this.mass ** 0.5;
    } else {
      this.size = this.mass ** 0.3;
    }
    // 75% to 125%
    this.size *= (0.75 + ((rng() + rng()) / 4));
  }

  setGravity() {
    this.gravity = this.mass / (this.size ** 2);
  }

  setDensity() {
    this.density = this.mass / (this.size ** 3);
  }

  setEscapeVelocity() {
    this.escapeVelocity = Math.sqrt(this.gravity * this.size) * 11.186;
  }

  setOrbit(rng, prevOrbit, eccMod) {
    this.orbit.eccentricity = eccMod * (rng() ** 3);
    if (prevOrbit === 0) {
      this.orbit.sMA = (rng() / 2) + 0.01;
    } else {
      this.orbit.sMA = (prevOrbit * ((rng() * 1.5) + 1.05)) / (1 - this.orbit.eccentricity);
    }
  }

  setESI() {
    const ESIprop = (planetVal, earthVal, weight) =>
      (1 - Math.abs((planetVal - earthVal) / (planetVal + earthVal))) ** (weight / 4);
    this.ESI *= ESIprop(this.size, 1, 0.57);
    this.ESI *= ESIprop(this.density, 1, 1.07);
    this.ESI *= ESIprop(this.escapeVelocity, 11.186, 0.7);
    this.ESI *= ESIprop(this.tempEff, 288, 5.58);
  }

}

module.exports = SubstellarBody;
