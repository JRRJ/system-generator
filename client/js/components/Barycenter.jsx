import React from 'react';
import Star from './Star';
import Planets from './Planets';

const Barycenter = (props) => {
  const a = props.system.barycenter.A;
  const b = props.system.barycenter.B;

  let aElem = a.star ? <Star system={a} /> :
  <Barycenter system={a} />;
  let bElem = b.star ? <Star system={b} /> :
  <Barycenter system={b} />;

  return (
    <div className="barycenter">
      {aElem}
      {bElem}
      <div>
        <div>Orbit: {props.system.orbit.sMA.toFixed(3)} AU</div>
        <div>Period: {props.system.orbit.period.toFixed(3)} Years</div>
      </div>
      <Planets planets={props.system.planets} />
    </div>
  );
};

module.exports = Barycenter;
