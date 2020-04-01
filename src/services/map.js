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
  // if (items.length === 0) {
  //   items.push(
  //     {"id":3,
  //     "atlas":"/images/avatars_part_0.jpg",
  //     "img": "/kazbek.jpg", 
  //     "x":96,
  //     "y":0,
  //     "description": "Помочь нам можно, перечислив деньги на счет NN234234234",
  //     "phone": "+375111111111",
  //     "lat":53.909151,
  //     "long":30.330195,
  //     "name": "Имя Компании",
  //     "address": "Могилев, улица Строителей, д.12, кв.12",
  //     "donateCount": "2",
  //     "donateAmount": "210",
  //     "lastUpdateTime": "12.03.2020",
  //     "instagramLink": "https://www.instagram.com/artyom.yakovlev.52/?hl=ru",
  //     "helpType": 2,
  //   });
  // }

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
    const text = item.message
      ? String(item.message).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      : ''

    const icon = Leaflet.divIcon({
      className: 'avatar-box',
      html: `<div class="avatar" style="background-image:url('${API_BASE_URL}${item.atlas}'); background-position:-${item.x}px -${item.y}px;"></div>
            ${text ? `<span class="message">${text}</span>` : ''}`
    })
    icon.options.iconSize = [48, 48]
    const marker = new Leaflet.marker(new Leaflet.LatLng(item.latitude, item.longitude), { icon });
    var popup = Leaflet.popup()
    .setContent(`
    <div class='company' style="background-size: cover; background-image:url('/kazbek.jpg')">
      <div class="company-info">
        <div class="company-name">${item.name}</div>
        <div class="company-address">${item.address}</div>
      </div>
      <div class="donation-info">
        <div class="number-of-donaters"><span class="fa fa-user"></span> ${item.donateCount}</div>
        <div class="last-update-time">Обновлено ${item.lastUpdateTime}</div>
        <div class="donate-amount"><span class="fa fa-money"></span> ${item.donateCount}р.</div>
      </div>
      <div class="description-info">
        <div>${item.description}</div>
      </div>
      <div class="social-media-info">
        <a href="javascript:void(0);" class="fa fa-instagram"></a>
      </div>
    </div>`);
    marker.bindPopup(popup);
    markers.addLayer(marker);
  })

  map.addLayer(markers, { chunkedLoading: true })
}
