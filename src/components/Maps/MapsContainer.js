import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Control from 'react-leaflet-control';

class MapsContainer extends Component {
  //reference: https://www.azavea.com/blog/2016/12/05/getting-started-with-react-and-leaflet/

  constructor(props) {
    super(props);
    this.zoomLevel = 13;
    this.state = { currentZoomLevel: this.zoomLevel };
    this.handleZoomLevelChange = this.handleZoomLevelChange.bind(this);
    this.handleUpPanClick = this.handleUpPanClick.bind(this);
    this.handleRightPanClick = this.handleRightPanClick.bind(this);
    this.handleLeftPanClick = this.handleLeftPanClick.bind(this);
    this.handleDownPanClick = this.handleDownPanClick.bind(this);
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });
  }

  handleZoomLevelChange(newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  //example events to handle:
  handleUpPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([0, -100]);
    window.console.log('Panning up');
  }
  handleRightPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([100, 0]);
    window.console.log('Panning right');
  }
  handleLeftPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([-100, 0]);
    window.console.log('Panning left');
  }
  handleDownPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([0, 100]);
    window.console.log('Panning down');
  }

  render() {
    const position = [39.7589, -84.1916];
    window.console.log('this.state.currentZoomLevel ->', this.state.currentZoomLevel);

    return(
    <Grid>
      <Row>
        <Col>
          <Map
            ref={(m) => {this.leafletMap = m; }}
            center={position}
            zoom={this.zoomLevel}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Control position="topright">
              <div
                style={{
                  backgroundColor: 'black',
                  padding: '5px',
                }}
              >
                <div style={{ marginLeft: '37px' }}>
                  <button onClick={this.handleUpPanClick}>
                    Pan up
                  </button>
                </div>
                <div>
                  <button onClick={this.handleLeftPanClick}>
                    Pan left
                  </button>
                  <button onClick={this.handleRightPanClick}>
                    Pan right
                  </button>
                </div>
                <div style={{ marginLeft: '30px' }}>
                  <button onClick={this.handleDownPanClick}>
                    Pan down
                  </button>
                </div>
              </div>
            </Control>

            <Marker position={position}>
              <Popup>
                <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
              </Popup>
            </Marker>
          </Map>
        </Col>
      </Row>

    </Grid>
    )
  }
}

// Determine which state to map into container's props
function select(state){
  return {

  };
}

export default connect(
  select, {

  } // comma delimited list of actionCreators
)(MapsContainer);
