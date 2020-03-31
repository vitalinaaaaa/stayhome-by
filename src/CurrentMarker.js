import React, { Component } from 'react'


class CurrentMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { marker } = this.props;

    return (
      <div className="currentMarkerDetails">

      </div>
    )
  }
}

export default CurrentMarker
