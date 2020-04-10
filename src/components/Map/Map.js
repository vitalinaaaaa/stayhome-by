import React, { memo, useEffect } from 'react'

import { createPeopleLayer, initMap } from '@services/map'

import styles from './Map.module.css'

const ID = 'map'
var isLoaded = false

function Map({ location, markers, loadMarkers }) {
  useEffect(() => {
    if (!isLoaded) {
      initMap(ID, location, loadMarkers)
      isLoaded = true
    }

    createPeopleLayer(markers)
  }, [markers])

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
