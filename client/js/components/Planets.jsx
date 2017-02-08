import React from 'react';

import Planet from './Planet';

const Planets = props => (
  <div>
    {props.planets.length > 0 ? `${props.planets.length} 
    Planet${props.planets.length > 1 ? 's' : ''}:` : ''}
    <ul className='planets'>
      {props.planets.map(planet => <Planet planet={planet} key={planet.orbit.sMA}/>)}
    </ul>
  </div>
);

module.exports = Planets;
