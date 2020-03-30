import Leaflet from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'

import {
  API_BASE_URL,
  MAP_INITIAL_ZOOM,
  MAP_MAX_ZOOM,
  MAP_MAX_CLUSTERING_ZOOM,
  MAP_CLUSTER_S_MAX,
  MAP_CLUSTER_M_MAX
} from '@config/constants'

let map = null

export function initMap(id, location) {
  map = Leaflet.map(id, {
    center: location,
    zoom: MAP_INITIAL_ZOOM,
    maxZoom: MAP_MAX_ZOOM
  })

  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

}

export function createPeopleLayer(items) {
  function getSize(count) {
    if (count <= MAP_CLUSTER_S_MAX) {
      return 's'
    }

    if (count <= MAP_CLUSTER_M_MAX) {
      return 'm'
    }

    return 'l'
  }

  const markers = Leaflet.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    disableClusteringAtZoom: MAP_MAX_CLUSTERING_ZOOM,
    iconCreateFunction: cluster => {
      const count = cluster.getChildCount()

      return Leaflet.divIcon({
        className: 'cluster-box',
        html: `<div class="cluster cluster-${getSize(count)}">${count}</div>`
      })
    }
  })

  items.forEach(item => {
    const icon = Leaflet.divIcon({
      className: 'avatar-box',
      html: `<div class="avatar" style="background-image:url('${API_BASE_URL}${item.atlas}'); background-position:-${item.x}px -${item.y}px;"></div>`
    })
    icon.options.iconSize = [48, 48]
    const marker = new Leaflet.marker(new Leaflet.LatLng(item.lat, item.long), { icon });
   
    var popup = Leaflet.popup()
    .setContent(`<div style="background-size:79680px; background-image:url('${API_BASE_URL}${item.atlas}'); background-position:-${item.x * 16.6}px -${item.y * 16.6}px;"></div>`);
    marker.bindPopup(popup);
    markers.addLayer(marker);
  })

  map.addLayer(markers, { chunkedLoading: true })
}
