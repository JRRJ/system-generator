import React from 'react';

import Moon from './Moon'

const Moons = props => (
  <div>
    {props.moons.length > 0 ? `${props.moons.length} 
    Major Moon${props.moons.length > 1 ? 's' : ''}:` : ''}
    <ul className='planets'>
      {props.moons.map(planet => <Moon planet={planet} key={planet.orbit.sMA}/>)}
    </ul>
  </div>
);

module.exports = Moons;
