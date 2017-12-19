import React, { Component } from 'react';
import './App.css';
import frameData from './data/samus.json'

// let _ = require('lodash');

class FrameTableRow extends Component {
  render() {
    return <tr className="Frame-Table-Row">
      <td>Hello</td>
      <td>world</td>
    </tr>
  }
}

class FrameTable extends Component {
  render() {
    return <table className="table Frame-Table">
      <thead>
        <tr>
          <th>Move</th>
          <th>Total frames</th>
          <th>Active</th>
          <th>Damage</th>
        </tr>
      </thead>
      <tbody>
        <FrameTableRow />
      </tbody>
    </table>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Frames</h1>
        </header>
        <h1 className="display-3">Samus</h1>
        <FrameTable />
      </div>
    );
  }
}

export default App;
