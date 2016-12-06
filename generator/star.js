/**
 * Star generation module
 * Currently doing this in kind of a weird way.
 *
 */
const starModule = (randomFn) => {
  let rng = randomFn || Math.random;

  class Star {
    constructor() {
      this.mass = null;

      this.setInitMass();
      this.mass = this.massInit;
      this.setAgeMax();
      this.setAge();
      this.setType();
      this.luminosity = null;
      this.radius = null;
      this.temperature = null;
      this.class = null;
    }

    /**
     * Generate random solar mass based on Kroupa IMF
     * See section 2.3 from Kroupa et al. 2011:
     * "The stellar and sub-stellar IMF of simple and composite populations"
     * This form of the IMF excludes brown dwarfs.
     *
     * @param {number} forceRandomVal - Value between 1 and 0, for testing purposes only
     * @return {number} A random solar mass between ~0.01 and ~147
     */
    setInitMass(forceRandomVal) {
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
     * @return {number} star's actual age in billions of years
     */
    setAge() {
      this.age = (Math.exp(Math.random()) - 1) * 7.5657;
    }
    setType() {
      if (this.age > this.ageMax) {
        // star is a post-stellar object
        if (this.mass < 15) {
          this.type = 'White Dwarf';
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

  }

  /**
   * Create a star object based on the star schema
   *
   * @return {Object}
   */
  const makeStar = () => new Star();

  const updateRng = (newRng) => {
    rng = newRng;
  };

  return {
    makeStar,
    updateRng,
  };
};

/**
 * Generate the number of stars in a star system
 *
 * @return {number}
 */
// const starQuantity = () => {
//   const stars = 1;
//   return stars;
// };


module.exports = starModule;
