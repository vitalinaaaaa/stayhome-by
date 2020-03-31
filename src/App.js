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
  const [initialLocation, setInitialLocation] = useState([53.878684, 30.332915])

  useEffect(() => {
    getApi(endpoints.markers)
      .then(result => {
        setMarkers(result.length > 0 ? result : [{"id":3,"atlas":"/images/avatars_part_0.jpg","x":96,"y":0,"lat":53.909151,"long":30.330195,"message":"Ура!"}])
        setInitialLocation(initialLocation)
      })
      .catch(err => {
        // TODO handle error
        console.error(err)
      })
  }, [])
  
  return (
    <>
      <Header count={markers.length} />
      {initialLocation ? (
        <Map
          location={initialLocation}
          markers={markers}
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
