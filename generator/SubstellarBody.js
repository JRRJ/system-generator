// Superclass for planets and moons

class SubstellarBody {
  constructor() {
    // console.log(cfg);
    this.mass = 0;
    this.size = 0;
    this.gravity = 0;
    this.orbit = {};
    this.tempEff = 0;
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

  // setEscapeVelocity() {
  //   this.escapeVelocity = this.
  // }

  setOrbit(rng, prevOrbit, eccMod) {
    this.orbit.eccentricity = eccMod * (rng() ** 3);
    if (prevOrbit === 0) {
      this.orbit.sMA = (rng() / 2) + 0.01;
    } else {
      this.orbit.sMA = (prevOrbit * ((rng() * 1.5) + 1.05)) / (1 - this.orbit.eccentricity);
    }
  }

}

module.exports = SubstellarBody;
