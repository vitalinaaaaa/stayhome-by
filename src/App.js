import React, { useEffect, useState } from 'react'

import AddButton from '@components/AddButton'
import Header from '@components/Header'
import Info from '@components/Info'
import Loading from '@components/Loading'
import Map from '@components/Map'

import { getApi } from '@services/api'
import endpoints from '@config/endpoints'

function App() {
  const [markers, setMarkers] = useState([])
  const [initialLocation, setInitialLocation] = useState(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    loadMarkers("")
  }, [])
  
  function loadMarkers(params) {
    getApi(endpoints.markers, params)
        .then(result => {
          setMarkers(result.markers)
          setInitialLocation(result.location)
          setTotalCount(result.count)
        })
        .catch(err => {
          // TODO handle error
          console.error(err)
        })
  }

  return (
    <>
      <Header count={totalCount} />
      {initialLocation ? (
        <Map
          location={initialLocation}
          markers={markers}
          loadMarkers={loadMarkers}
        />
      ) : (
        <Loading />
      )}
      <Info />
      <AddButton />
    </>
  )
}

export default App
