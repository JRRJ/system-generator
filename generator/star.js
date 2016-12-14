/**
 * Star class
 * Currently a very simple approximation.
 * More accurate model in development.
 *
 */
class Star {

  constructor(rng = Math.random) {
    this.setInitMass(rng);
    this.mass = this.massInit;
    this.setAgeMax();
    this.setAge(rng);
    this.setType();
    this.setLuminosity();
    this.radius = null;
    this.temperature = null;
    this.setClass();
  }

  /**
   * Generate random solar mass based on Kroupa IMF
   * See section 2.3 from Kroupa et al. 2011:
   * "The stellar and sub-stellar IMF of simple and composite populations"
   * (Note: This IMF might underestimate brown dwarfs.)
   *
   * @param {function} rng - The random variable function
   * @param {number} forceRandomVal - Value between 1 and 0, for testing purposes only
   * @return {number} A random solar mass between ~0.01 and ~147
   */
  setInitMass(rng, forceRandomVal) {
    const randomVal = forceRandomVal || rng();
    const k = 1 / 5.087405; // scaling factor
    const r = [0.186945 * k, 3.00753 * k, 1.89293 * k]; // probability range for each power law
    if (randomVal <= r[0]) {
      this.massInit = ((0.7 / k) * (randomVal + (k * 0.05687))) ** (1 / 0.7);
    } else if (randomVal <= r[0] + r[1]) {
      this.massInit = (-(0.3 / k) * (randomVal - r[0] + (k * -7.1113))) ** -(1 / 0.3);
    } else {
      this.massInit = (-(1.3 / k) * (randomVal - (r[0] + r[1]) + (k * -1.8941))) ** -(1 / 1.3);
    }
  }
  /**
   * Loose approximation of stellar lifespan based on mass.
   *
   * @return {number} duration of star's lifespan in billions of years
   */
  setAgeMax() {
    this.ageMax = 10 * (this.mass ** -2.3);
  }
  /**
   * Nonlinear age generator, slight bias towards newer stars
   * Need more research to come up with better method.
   *
   * @return {number} star's actual age in billions of years,
   *    between 0 and 13
   */
  setAge(rng) {
    this.age = (Math.exp(rng()) - 1) * 7.5657;
  }

  setType() {
    if (this.age > this.ageMax) {
      // star is a post-stellar object
      if (this.mass < 15) {
        this.type = 'White Dwarf';
        this.mass *= 0.2;
      } else if (this.mass < 28) {
        this.type = 'Neutron Star';
        this.mass *= 0.1;
      } else {
        this.type = 'Black Hole';
        this.mass *= 0.1;
      }
    } else if (this.age > this.ageMax * 0.9) {
      // star is a giant star
      this.type = 'Giant';
      this.mass = this.massInit;
    } else {
      // star is in main sequence
      this.type = 'Main Sequence';
      this.mass = this.massInit;
    }
  }
  // set luminosity based on basic mass-luminosty relation
  setLuminosity() {
    let k = 0;
    let a = 0;
    if (this.type === 'Black Hole' || this.type === 'Neutron Star') {
      this.luminosity = 0;
    } else {
      if (this.mass < 0.43) {
        k = 0.23;
        a = 2.3;
      } else if (this.mass < 2) {
        k = 1;
        a = 4;
      } else if (this.mass < 20) {
        k = 1.5;
        a = 3.5;
      } else {
        k = 3200;
        a = 1;
      }
      this.luminosity = k * (this.mass ** a);
    }
    // really, really loose approximations
    if (this.type === 'White Dwarf') {
      this.luminosity *= 0.01;
    } else if (this.type === 'Giant') {
      this.luminosity *= 1000;
    }
  }

  // another temporary simplification
  setClass() {
    const subClassification = (val, lower, upper) =>
      Math.floor(10 * (1 - ((val - lower) / (upper - lower))));

    if (this.type === 'Main Sequence') {
      if (this.mass < 0.075) {
        this.class = `L${subClassification(this.mass, 0, 0.075)}V`;
      } else if (this.mass < 0.5) {
        this.class = `M${subClassification(this.mass, 0.075, 0.5)}V`;
      } else if (this.mass < 0.8) {
        this.class = `K${subClassification(this.mass, 0.5, 0.8)}V`;
      } else if (this.mass < 1.1) {
        this.class = `G${subClassification(this.mass, 0.8, 1.1)}V`;
      } else if (this.mass < 1.6) {
        this.class = `F${subClassification(this.mass, 1.1, 1.6)}V`;
      } else if (this.mass < 2.7) {
        this.class = `A${subClassification(this.mass, 1.6, 2.7)}V`;
      } else if (this.mass < 18) {
        this.class = `B${subClassification(this.mass, 2.7, 18)}V`;
      } else if (this.mass < 150) {
        this.class = `O${subClassification(this.mass, 18, 150)}V`;
      }
    // c
    } else if (this.type === 'Giant') {
      this.class = 'M2III';
    } else if (this.type === 'White Dwarf') {
      this.class = 'DA2';
    } else if (this.type === 'Neutron Star') {
      this.class = 'X';
    } else if (this.type === 'Black Hole') {
      this.class = 'Z';
    }
  }

}

module.exports = Star;
