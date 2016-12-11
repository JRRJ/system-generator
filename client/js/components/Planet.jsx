import React from 'react';

const Planet = props => (
  <li className="planet">
    <div>Size: {props.planet.size.toPrecision(3)} Earth radii</div>
    <div>Gravity: {props.planet.gravity.toPrecision(3)} Earth gravity</div>
    <div>Temperature: {props.planet.tempEff.toPrecision(3)} K</div>
  </li>
);

module.exports = Planet;
