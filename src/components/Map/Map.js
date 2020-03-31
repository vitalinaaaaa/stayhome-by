import React, { memo, Component } from 'react'
import L from 'leaflet';
import { Map as LMap, Marker, Popup, TileLayer } from 'react-leaflet'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      markers: props.markers,
      id: 'map',
      defaultPosition: [53.878684, 30.332915],
    }
  }

  render() {
    const position = this.state.defaultPosition;

    return (
      <LMap center={position} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.markers.map(marker => {
          const icon = L.divIcon({
            className: 'avatar-box',
            html: `<div class="avatar" style="background-size: cover; background-image:url('/kazbek.jpg')"></div>`
          })
          icon.options.iconSize = [70, 70]

          return (
            <Marker onclick={() => { this.props.onSelectMarker(marker) }} icon={icon} className="avatar-box" key={marker.id} position={position}>
              <Popup onClose={() => { this.props.onCloseMarker() }}>
                <div className="popup-company-name">{marker.name}</div>
                <div className="popup-donation-amount">{marker.donateAmount} BYN  <span className="popup-donate-users">{marker.donateCount} <span className=" popup fa fa-user"></span></span></div>
                <div className="popup-status-text">На грани закрытия</div>
              </Popup>
            </Marker>
          )
        })}
      </LMap>
    )
  }
}

export default memo(Map)
