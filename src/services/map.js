import Leaflet from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'

import { API_BASE_URL, MAP_INITIAL_ZOOM, MAX_MAX_ZOOM, MAP_CLUSTER_S_MAX, MAP_CLUSTER_M_MAX } from '@config/constants'
import { MAP_ACCESS_TOKEN, MAP_STYLE } from '@config/keys'

let map = null

export function initMap(id, location) {
  map = Leaflet.map(id, {
    center: location,
    zoom: MAP_INITIAL_ZOOM,
    maxZoom: 20
  })

  Leaflet.mapboxGL({
    accessToken: MAP_ACCESS_TOKEN,
    style: MAP_STYLE
  }).addTo(map)
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
    disableClusteringAtZoom: MAX_MAX_ZOOM,
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
      html: `<div class="avatar" style="background-image:url('${API_BASE_URL}${item.atlas}'); background-position:-${item.x}px -${item.y}px;" />`
    })
    icon.options.iconSize = [48, 48]

    markers.addLayer(new Leaflet.marker(new Leaflet.LatLng(item.lat, item.long), { icon }))
  })

  map.addLayer(markers, { chunkedLoading: true })
}
