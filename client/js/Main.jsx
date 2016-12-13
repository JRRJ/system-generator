import React from 'react';
import getSystem from './utilities/network';

import Star from './components/Star';
import Barycenter from './components/Barycenter';

import '../css/style.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meta: { seed: 'n/a' }, system: {} };
    // based on recs in docs for react/jsx-no-bind
    this.newSystem = this.newSystem.bind(this);
  }
  componentWillMount() {
    this.newSystem();
  }
  newSystem() {
    getSystem().then((system) => {
      console.log(system);
      this.setState(system);
    });
  }
  render() {
    let firstChild = <div />;
    if (this.state.system.star) {
      firstChild = <Star system={this.state.system} />;
    } else if (this.state.system.barycenter) {
      firstChild = <Barycenter system={this.state.system} />;
    }
    return (
      <div>
        <h1>{this.state.meta.seed}</h1>
        <button onClick={this.newSystem}>New System</button>
        {firstChild}
      </div>
    );
  }
}

module.exports = Main;
