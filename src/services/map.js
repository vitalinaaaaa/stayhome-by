import Leaflet from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import { getApi } from '@services/api'
import endpoints from '@config/endpoints'

import {
  API_BASE_URL,
  MAP_INITIAL_ZOOM,
  MAP_MAX_ZOOM,
  MAP_MAX_CLUSTERING_ZOOM,
  MAP_CLUSTER_S_MAX,
  MAP_CLUSTER_M_MAX
} from '@config/constants'
import { MAP_ACCESS_TOKEN, MAP_STYLE } from '@config/keys'

let map = null
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

export function initMap(id, location, loadMarkers) {
  map = Leaflet.map(id, {
    center: location,
    zoom: MAP_INITIAL_ZOOM,
    maxZoom: MAP_MAX_ZOOM
  })

  Leaflet.mapboxGL({
    accessToken: MAP_ACCESS_TOKEN,
    style: MAP_STYLE
  }).addTo(map)

  map.addLayer(markers, { chunkedLoading: true })

  map.on('zoom', function(event) {
    let center = map.getCenter();
    let radius = getRadius();
    let zoom = event.target.getZoom();
    loadMarkers({"center":[center.lat, center.lng], "radius":radius, "zoom":zoom})
  });

  map.on('moveend', function(event) {
    let center = map.getCenter();
    let radius = getRadius();
    let zoom = event.target.getZoom();
    loadMarkers({"center":[center.lat, center.lng], "radius":radius, "zoom":zoom})
  })
}

export function getRadius() {
  var bounds = map.getBounds();
  var northWest = bounds.getNorthWest();
  var northEast = bounds.getNorthEast();
  var distance = northWest.distanceTo(northEast);

  return distance / 2;
}

export function createPeopleLayer(items) {
  markers.clearLayers()
  items.forEach(item => {

    if (item.coordinates !== undefined) {
      const count = item.count
      const icon = Leaflet.divIcon({
        className: 'cluster-box',
        html: `<div class="cluster cluster-${getSize(count)}">${count}</div>`
      })
      icon.options.iconSize = [48, 48]

      markers.addLayer(new Leaflet.marker(new Leaflet.LatLng(item.coordinates[0], item.coordinates[1]), { icon }))
    } else {
      const text = item.message
        ? String(item.message).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
        : ''

      const icon = Leaflet.divIcon({
        className: 'avatar-box',
        html: `<div class="avatar" style="background-image:url('${API_BASE_URL}${item.atlas}'); background-position:-${item.x}px -${item.y}px;"></div>
              ${text ? `<span class="message">${text}</span>` : ''}`
      })
      icon.options.iconSize = [48, 48]

      markers.addLayer(new Leaflet.marker(new Leaflet.LatLng(item.lat, item.long), { icon }))
    }

  })
}
