/**
 * 
 * 
 */
const star = (randomFn) => {
  const rng = randomFn || Math.random;

  const s = {}; //container for methods

  /**
   * Generate random solar mass based on Kroupa IMF
   * See section 2.3 from Kroupa et al. 2011:
   * "The stellar and sub-stellar IMF of simple and composite populations"
   * This form of the IMF excludes brown dwarfs.
   * 
   * @param {number} forceRandomVal - Value between 1 and 0, for testing purposes only
   * @return {number} A random solar mass between ~0.01 and ~147
   */
  s.mass = (forceRandomVal) => {
    let randomVal = forceRandomVal || rng();
    let mass = 0;
    const k = 1/5.087405; //scaling factor
    const r = [0.186945*k,3.00753*k,1.89293*k]; //probability range for each power law
    if(randomVal <= r[0]){
      mass = Math.pow((0.7 / k) * (randomVal + k*.05687), (1/0.7));
    } else if (randomVal <= r[0]+r[1]){
      mass = Math.pow(-(0.3 / k) * (randomVal - r[0] + k*-7.1113), -(1/0.3));
    } else {
      mass = Math.pow(-(1.3 / k) * (randomVal - (r[0]+r[1]) + k*-1.8941), -(1/1.3));
    }
    return mass;
  };

  /**
   * Loose approximation of stellar lifespan based on mass.
   *
   * @return {number} duration of star's lifespan in billions of years
   */
  s.lifespan = (starMass) => {
    return 10 * Math.pow(starMass, -2.3);
  }

  /**
   * Create a star object based on the star schema
   *
   * @return {Object}
   */
  s.makeStar = () => {
    starObj = {};
    starObj.mass = s.mass();
    starObj.ageMax = s.lifespan(starObj.mass);
    starObj.age = null;
    starObj.luminosity = null;
    starObj.radius = null;
    starObj.temperature = null;
    starObj.class = null;
    starObj.type = null;
    return starObj;
  }

  return s;
}


/**
 * Generate the number of stars in a star system
 *
 * @return {number} 
 */
const starQuantity = () => {
  let stars = 1;
  return stars;
}

module.exports = star;