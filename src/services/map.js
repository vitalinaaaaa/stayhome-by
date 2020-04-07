import Leaflet from 'leaflet'
import * as PIXI from 'pixi.js'
import BezierEasing from 'bezier-easing'
import 'leaflet-pixi-overlay/L.PixiOverlay.min'

import { API_BASE_URL, MAP_INITIAL_ZOOM, MAP_MIN_ZOOM, MAP_MAX_ZOOM } from '@config/constants'
import { MAP_ACCESS_TOKEN, MAP_STYLE } from '@config/keys'

let map = null

export function initMap(id, location) {
  map = Leaflet.map(id, {
    center: location,
    zoom: MAP_INITIAL_ZOOM,
    minZoom: MAP_MIN_ZOOM,
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
  var easing = BezierEasing(0, 0, 0.25, 1);
  let loader = PIXI.Loader.shared
  let atlas_url = `${API_BASE_URL}/images/atlas.json`
  loader.add(atlas_url);
  loader.load(function(loader, resources) {
    let sheet = PIXI.Loader.shared.resources[atlas_url].spritesheet
    var pixiContainer = new PIXI.Container();
    var markerSprites = [];
    var zoomChangeTs = null;

    var pixiLayer = (function() {
      var doubleBuffering = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      var initialScale;

      return Leaflet.pixiOverlay(function(utils, event) {
        var zoom = utils.getMap().getZoom();
        var container = utils.getContainer();
        var renderer = utils.getRenderer();
        var project = utils.latLngToLayerPoint;
        var getScale = utils.getScale;
        var invScale = 1 / getScale();

        if (event.type === 'add') {
          items.forEach(function(marker) {
            var coords = project([marker.lat, marker.long]);
            var markerSprite = new PIXI.Sprite(sheet.textures[marker.atlas]);
            markerSprite.x = coords.x;
            markerSprite.y = coords.y;
            markerSprite.anchor.set(0.5, 0.5);
            initialScale = invScale / 10 * 4;
            markerSprite.scale.set(initialScale);
            markerSprites.push(markerSprite);
            const mask = new PIXI.Graphics();
            markerSprite.addChild(mask);

            mask.beginFill(0xff0000);
            mask.drawCircle(0, 0, 24);
            markerSprite.mask = mask;

            const border = new PIXI.Graphics();
            markerSprite.addChild(border);

            border.lineStyle(2, 0x18adcb);  //(thickness, color)
            border.drawCircle(0, 0, 23);   //(x,y,radius)
            border.endFill(); 
            container.addChild(markerSprite);
          });
        }

        if (event.type === 'zoomanim') {
          var targetZoom = event.zoom;
          console.log(zoom);

          if (targetZoom >= 14 || zoom >= 14) {
            zoomChangeTs = 0;
            var targetScale = targetZoom >= 14 ? 1 / getScale(event.zoom) : initialScale;

            markerSprites.forEach(function(markerSprite) {
              markerSprite.currentScale = markerSprite.scale.x;
              markerSprite.targetScale = targetScale;
            });
          }

          return;
        }

        if (event.type === 'redraw') {
          var delta = event.delta;
          
          if (zoomChangeTs !== null) {
            var duration = 17;
            zoomChangeTs += delta;
            var lambda = zoomChangeTs / duration;

            if (lambda > 1) {
              lambda = 1;
              zoomChangeTs = null;
            }

            lambda = easing(lambda);
            markerSprites.forEach(function(markerSprite) {
              markerSprite.scale.set(markerSprite.currentScale + lambda * (markerSprite.targetScale - markerSprite.currentScale));
            });
          }
        }

        renderer.render(container);
      }, pixiContainer, {
        doubleBuffering: doubleBuffering,
        destroyInteractionManager: true
      });
    })();
    
    pixiLayer.addTo(map);

    var ticker = new PIXI.Ticker();
    ticker.add(function(delta) {
      pixiLayer.redraw({type: 'redraw', delta: delta});
    });
    ticker.start();
    map.on('zoomanim', pixiLayer.redraw, pixiLayer);
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
