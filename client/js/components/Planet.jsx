import React from 'react';

class Planet extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.drawPlanet();
  }

  drawPlanet() {
    // playing around with scaling factors
    const size = 50 + (Math.log(0.1 + this.props.planet.size) * 15);
    const temperature = Math.floor(this.props.planet.tempEff);
    const red = Math.min(255, Math.max(temperature - 300, 0));
    const blue = Math.max(255 - temperature, 0);
    const green = Math.max(0, 255 - Math.abs(300 - temperature));
    const ctx = this.canvas.getContext('2d');
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = `rgb(${red},${green},${blue})`;
    ctx.arc(100, 100, size, 0, Math.PI * 2, false);
    ctx.fill();
  }

  render() {
    return (
      <li className="planet">
        <canvas
          ref={(c) => { this.canvas = c; }}
          className="planet-image" width={200} height={200}
        />
        <div className="planet-info">
          <div>Mass: {this.props.planet.mass.toPrecision(3)} Earth masses</div>
          <div>Size: {this.props.planet.size.toPrecision(3)} Earth radii</div>
          <div>Gravity: {this.props.planet.gravity.toPrecision(3)} Earth gravity</div>
          <div>Orbit: {this.props.planet.orbit.sMA.toPrecision(3)} AU</div>
          <div>Temperature: {this.props.planet.tempEff.toFixed(0)} K</div>
        </div>
      </li>
    );
  }
};

module.exports = Planet;
