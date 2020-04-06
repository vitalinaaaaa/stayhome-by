import Leaflet from 'leaflet'
import * as PIXI from 'pixi.js'
import 'leaflet-pixi-overlay/L.PixiOverlay.min'

import { API_BASE_URL, MAP_INITIAL_ZOOM, MAP_MAX_ZOOM } from '@config/constants'
import { MAP_ACCESS_TOKEN, MAP_STYLE } from '@config/keys'

let map = null

export function initMap(id, location) {
  map = Leaflet.map(id, {
    center: location,
    zoom: MAP_INITIAL_ZOOM,
    maxZoom: MAP_MAX_ZOOM
  })

  Leaflet.mapboxGL({
    accessToken: MAP_ACCESS_TOKEN,
    style: MAP_STYLE
  }).addTo(map)
}

export function createPeopleLayer(items) {
  // const pixiOverlay = Leaflet.pixiOverlay(function(utils) {
  //   // your drawing code here
  // }, new PIXI.Container())

  let loader = new PIXI.Loader()
  loader.add('marker', `${API_BASE_URL}${items[0].atlas}`);
  loader.load(function(loader, resources) {
    console.log(resources)
    var markerTexture = resources.marker.texture;
    var markerLatLng = [51.5, -0.09];
    var marker = new PIXI.Sprite(markerTexture);
    marker.anchor.set(0.5, 1);

    var pixiContainer = new PIXI.Container();
    pixiContainer.addChild(marker);

    var firstDraw = true;
    var prevZoom;

    var pixiOverlay = Leaflet.pixiOverlay(function(utils) {
      var zoom = utils.getMap().getZoom();
      var container = utils.getContainer();
      var renderer = utils.getRenderer();
      var project = utils.latLngToLayerPoint;
      var scale = utils.getScale();

      if (firstDraw) {
        var markerCoords = project(markerLatLng);
        marker.x = markerCoords.x;
        marker.y = markerCoords.y;
      }

      if (firstDraw || prevZoom !== zoom) {
        marker.scale.set(1 / scale);
      }

      firstDraw = false;
      prevZoom = zoom;
      renderer.render(container);
    }, pixiContainer);

    pixiOverlay.addTo(map);
  });

  // const markers = items.map(item => {
  //   const text = item.message
  //     ? String(item.message).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  //     : ''
  //
  //   const icon = Leaflet.divIcon({
  //     className: 'avatar-box',
  //     html: `<div class="avatar" style="background-image:url('${API_BASE_URL}${item.atlas}'); background-position:-${item.x}px -${item.y}px;"></div>
  //           ${text ? `<span class="message">${text}</span>` : ''}`
  //   })
  //   icon.options.iconSize = [48, 48]
  //
  //   return Leaflet.marker(new Leaflet.LatLng(item.lat, item.long), { icon })
  // })
  //
  // Leaflet.layerGroup(markers).addTo(map)
}
