import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import { iconExisting, iconRemoved } from './Icons';
import { connect } from 'react-redux';
import * as testData from './testdata.json';
import { useHistory } from 'react-router-dom';
import './PinMap.css';

class PinMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPin: null,
    };
  }

  render() {
    console.log('this is printing the symbols object', this.props.symbols.data);
    if (this.props.symbols.data) {
      return (
        <Map center={[38, -96]} zoom={5}>
          {this.props.symbols.data.map((monument) => (
            <MarkerButton key={monument.id} monument={monument} />
          ))}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>
      );
    }
    return null;
  }
}

function MarkerButton(props) {
  const history = useHistory();

  function handleClick(id) {
    history.push('/detail/' + id);
  }
  if (props.monument.removed) {
    return (
      <Marker
        position={[props.monument.latitude, props.monument.longitude]}
        onClick={() => handleClick(props.monument.id)}
        icon={iconRemoved}
      />
    );
  } else {
    return (
      <Marker
        position={[props.monument.latitude, props.monument.longitude]}
        onClick={() => handleClick(props.monument.id)}
        icon={iconExisting}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    symbols: state.symbols, //should render test api for now
  };
}
function mapDispatchToProps(dispatch) {
  return {
    //if any dispatch functions are needed but it should be fetched and in state from app.js
  };
}

const PinMap = connect(mapStateToProps, mapDispatchToProps)(PinMapComponent);

export default PinMap;
//@carly to do: move this attribution somewhere else
// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
