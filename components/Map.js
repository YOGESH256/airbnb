import Image from "next/image";
import {React , useState} from 'react';
import ReactMapGL , {Marker, Popup} from 'react-map-gl';
import  getCenter  from 'geolib/es/getCenter';

function Map({searchResults}) {
  const [selectedLocation, setSelectedLocation] = useState({})


const coordinates = searchResults.map((result) => ({

    longitude:result.long,
    latitude: result.lat

}))

const center = getCenter(coordinates)

const [viewport , setViewport] = useState({
width:'100%',
height:'100%',
latitude: center.latitude,
    longitude: center.longitude,
    zoom: 12
})
  return (

<ReactMapGL
mapStyle= 'mapbox://styles/yogeshkhatri/cks1r37s20psg18kczbdx69uf'
mapboxApiAccessToken = {process.env.mapbox_key}
{...viewport}
onViewportChange = {(nextViewport) => setViewport(nextViewport)}
>
{searchResults.map(result => (
  <div key = {result.longitude}>
  <Marker
  longitude = {result.long}
  latitude={result.lat}
  offsetLeft = {-20}
  offsetRight= {-10}
  >
  <p  role = "img"onClick ={() => setSelectedLocation(result)} className = "cursor-pointer text-xl animate-bounce">📌</p>
   </Marker>
   {selectedLocation.long ===result.long ?(
     <Popup
     onClose = {() => setSelectedLocation({})}
     closeonClick = {true}
     longitude = {result.long}
     latitude = {result.lat}

     >
     <div className = "text-sm font-semibold ">
    { result.title}
    </div>
    </Popup>

   ):(
     false
   )}
  </div>
))}
</ReactMapGL>





  )

}

export default Map
