import React from 'react';
import Planets from './Planets';

const Star = props => (
  <div>
    <h3>{props.system.star.class + ' ' + props.system.star.type}</h3>
    <Planets planets={props.system.planets} />
  </div>
);

module.exports = Star;
