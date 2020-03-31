import React, { memo, useEffect } from 'react'

import { createPeopleLayer, initMap } from '@services/map'

import styles from './Map.module.css'
import { marker } from 'leaflet';

const ID = 'map'

function Map({ location, markers }) {
  useEffect(() => {
    initMap(ID, location)
    createPeopleLayer(markers)
  }, [])

  return (
    <div className={styles['map-box']}>
      <div
        className={styles.map}
        id={ID}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}

export default memo(Map)
