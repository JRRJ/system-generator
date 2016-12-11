import React from 'react';

import Planet from './Planet';

const Planets = props => (
  <div>
    {props.planets.length > 0 ? "Planets:" : ""}
    <ul className='planets'>
      {props.planets.map(planet => <Planet planet={planet} key={planet.orbit.sMA}/>)}
    </ul>
  </div>
);

module.exports = Planets;
