import React, { Component } from 'react';
import './App.css';

import { Button, ListGroup, ListGroupItem, Modal, Table } from 'react-bootstrap';

import frameData from './data/samus.json'
// console.log(frameData)
let _ = require('lodash');

const PROPERTY_ALIAS_MAP = {
  'Total Frames': 'Total',
  'Active': 'Hit',
};
const TABLE_MOVE_PROPERTIES = ['Move', 'Total Frames', 'Active', 'IASA', 'Shield stun',
  'Advantage', 'Damage']

class MoveDataModal extends Component {
  close() {
    this.props.close();
  }

  renderPropertyValue(propName, propValue) {
    if (propValue === null) {
      return propName;
    } else if (typeof propValue === 'object') {
      // Recurse
      return [propName,
        <ul>
          {this.renderProperties(propValue)}
        </ul>
      ];
    } else {
      return propName + ': ' + propValue;
    }    
  }

  renderProperties(data) {
    let renderProperties = this.renderProperties.bind(this);
    let renderPropertyValue = this.renderPropertyValue.bind(this);
    return _.map(data, function(propValue, propName) {
      if (propName == 'Move') {
        return;
      }
      return <li key={propName}>{renderPropertyValue(propName, propValue)}</li>;
    });
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    return <Modal show={this.props.show} onHide={() => this.close()}>
      <Modal.Header closeButton>
        <Modal.Title>{this.props.data.Move}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {this.renderProperties(this.props.data)}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.close()}>Close</Button>
      </Modal.Footer>
    </Modal>
  }
}

class FrameTableRow extends Component {
  getRowEntries() {
    let frameData = this.props.data;
    return this.props.moveProperties.map(function(property) {
      let propertyValue = frameData[property] ||
        frameData[PROPERTY_ALIAS_MAP[property]] ||
        '--';
      return <td key={property}>{propertyValue}</td>;
    });
  }

  openMoveDataModal() {
    this.props.openModal(this.props.data);
  }

  render() {
    return <tr className="frame-table-row" onClick={() => this.openMoveDataModal()}>
      {this.getRowEntries()}
    </tr>
  }
}

class FrameTable extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  getHeaderRow() {
    let headerCells = TABLE_MOVE_PROPERTIES.map(function(property) {
      return <th className="frame-table-header-cell" key={property}>{property}</th>
    });
    return <tr>{headerCells}</tr>;
  }

  openModal(moveProperties) {
    this.setState({
      showModal: true,
      modalData: moveProperties
    });
  }

  getTableRows() {
    let moveProperties = TABLE_MOVE_PROPERTIES;
    let openModal = this.openModal.bind(this);
    return this.props.data.map((move) => <FrameTableRow 
        key={move.Move}
        data={move}
        moveProperties={moveProperties}
        openModal={openModal}
      />
    );
  }

  render() {
    return <div id="table-container">
      <Table striped bordered condensed hover>
        <thead>
          {this.getHeaderRow()}
        </thead>
        <tbody>
          {this.getTableRows()}
        </tbody>
      </Table>
      <MoveDataModal 
        show={this.state.showModal}
        data={this.state.modalData}
        close={() => {this.setState({showModal: false})}}
      />
    </div>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SSBM Website</h1>
        </header>
        <div className="container">
          <h3>Samus Frame Data</h3>
          <h4>Click on a row for more information.</h4>
          <FrameTable data={frameData}/>
        </div>
      </div>
    );
  }
}

export default App;
