const Star = require('./Star');
const Planet = require('./Planet');

// This function randomly generates a hierarchical depiction of
// a multiple star system represented as nested arrays.
// e.g. for Alpha Centauri: [["A", "B"], "Proxima"]
// or Castor: [[["Aa", "Ab"], ["Ba", "Bb"]], ["Ca", "Cb"]]

const hierarchyBuilder = (arr, rng = Math.random) => {
  const hierarchy = [];
  hierarchy.push(arr[0]);
  hierarchy.push(arr[1]);
  const coin = () => Math.round(rng());
  for (let i = 2; i < arr.length; i += 1) {
    let flip = coin();
    let node = hierarchy;
    let end = false;
    // go deeper into the hierarchy until finished
    while (!end) {
      if (Array.isArray(node[flip])) {
        node = node[flip];
        flip = coin();
      } else {
        end = true;
      }
    }
    node[flip] = [node[flip], arr[i]];
  }
  // console.log(JSON.stringify(hierarchy));
  return hierarchy;
};

class StarSystem {

  constructor(rng = Math.random) {
    this.system = this.makeSystem(rng);
  }

  starQuantity(rng) {
    let stars = 1;
    while (stars < 8) {
      if (stars < 3) {
        if (rng() > 0.25) { break; }
      } else if (rng() > 0.15) { break; }
      stars += 1;
    }
    return stars;
  }

  randomBinaryOrbit(rng, minOrbit) {
    // need to find trend of actual binary eccentricities, but for now this works
    const eccentricity = rng() ** 3;
    // for ternary systems and beyond, if the binary seperation is already very large,
    // reduce the orbit probability range of the 
    // up to 1 au min orbit, up to 10000x actual orbit.
    // 1 au to 1000 au, up to 10^(4-log10(min orbit))
    // over 1000 au orbit, up to 10x actual orbit.
    const minOrbitFactor = Math.min(Math.max(4 - Math.log10(minOrbit), 1), 4);
    let sMA;
    if (minOrbit) {
      sMA = minOrbit * (10 ** (rng() * minOrbitFactor)) / (1 - eccentricity);
    } else {
      sMA = 10 ** ((rng() * 5) - 2);
    }
    return { sMA, eccentricity };
  }

  // Based on Jamie et at 2012
  // "Regions of Dynamical Stability for Discs and Planets
  //     in Binary Stars of the Solar Neighborhood"
  // (function might be moved out to general library later)
  stabilityRegions(m1, m2, sMA, ecc) {
    const q = m2 / (m1 + m2);
    const q1 = m1 / m2;
    const q2 = m2 / m1;
    const rEgg = qi => 0.49 * (qi ** (2 / 3)) /
          ((0.6 * (qi ** (2 / 3))) + Math.log(1 + (qi ** (1 / 3))));
    const rI = qi => rEgg(qi) * sMA * (0.733 * ((1 - ecc) ** 1.2) * (q ** 0.07));
    const r1 = rI(q1);
    const r2 = rI(q2);
    const rcb = 1.93 * sMA * ((1 + (1.01 * (ecc ** 0.32))) * ((q * (1 - q)) ** 0.043));
    return { r1, r2, rcb };
  }

  makeSystem(rng) {
    const stars = [];
    const numStars = 3//this.starQuantity(rng);
    if (numStars === 1) {
      return { star: new Star(rng) };
    }
    for (let i = 0; i < numStars; i += 1) {
      stars.push(new Star(rng));
    }
    const hierarchy = hierarchyBuilder(stars.sort((a, b) => a.mass > b.mass), rng);
    const hierarcyFormatter = (element) => {
      if (Array.isArray(element)) { // barycenter
        const bc = { barycenter: {} };
        const bcA = bc.barycenter.A = hierarcyFormatter(element[0]);
        const bcB = bc.barycenter.B = hierarcyFormatter(element[1]);
        let minOrbit = 0;
        if (bcA.innerLimit) minOrbit += bcA.innerLimit;
        if (bcB.innerLimit) minOrbit += bcB.innerLimit;
        bc.orbit = this.randomBinaryOrbit(rng, minOrbit * 3);
        bc.mass = bcA.mass + bcB.mass;
        const { r1, r2, rcb } =
          this.stabilityRegions(bcA.mass, bcB.mass, bc.orbit.sMA, bc.orbit.eccentricity);
        bcA.outerLimit = r1;
        bcB.outerLimit = r2;
        bc.innerLimit = rcb;
        return bc;
      } // star
      return { star: element, mass: element.mass };
    };
    return hierarcyFormatter(hierarchy);
  }
  /*
  testQuantities() {
    const test = [];
    for (let i = 0; i < 100000; i += 1) {
      test.push(starQuantity());
    }
    return test.reduce((quantities, val) => {
      if (quantities[val - 1]) {
        quantities[val - 1] += 1;
      } else {
        quantities[val - 1] = 1;
      }
      return quantities;
    }, []).map(val => val ? val / 1000 : 0);
  }
  */
}

module.exports = StarSystem;
