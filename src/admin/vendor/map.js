import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, useLoadScript } from '@react-google-maps/api';

const placesLibrary = ['places']

const containerStyle = {
  width: '100%',
  height: '400px'
};

function Map() {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDRbsK-JJBkfxEZ7pVo1_fM1DiZf8ycGzY",
    libraries: placesLibrary
  })

	const [map, setMap] = React.useState(null)
	const [zoomLevel, setZoom] = React.useState(12);
	const [marker, setMarker] = React.useState(null)
	const [position, setPosition] = React.useState({
		lat: 37.772,
		lng: -122.214
	});
  const [searchResult, setSearchResult] = React.useState('')
  const onLoad = React.useCallback(function callback(map) {
	  // This is just an example of getting and using the map instance!!! don't just blindly copy!
		map.setCenter(position);
		map.setZoom(12)
		setMap(map)
  }, [position])

//   const onLoadMarker = marker => {
// 		setMarker(marker)
//     console.log('marker: ', marker)
//   }
const onLoadMarker = React.useCallback(function callback(marker) {
	setMarker(marker)
}, [position])
	// const onLoadMarker = React.useCallback(function callback() {
	// 	// map.Marker.position(position);
	// }, [map, position]);

  const onLoadAutocomplete = (autocomplete) => {
    setSearchResult(autocomplete);
  }

  const onPlaceChanged = () => {
    if (searchResult != null) {
      //variable to store the result
      const place = searchResult.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const center = {
        lat: lat,
        lng: lng
      }
		map.setCenter(center);
		setMap(map);
		setPosition(center);
      //variable to store the name from place details result 
      const name = place.name;
      //variable to store the status from place details result
      const status = place.business_status;
      //variable to store the formatted address from place details result
      const formattedAddress = place.formatted_address;
      // console.log(place);
      //console log all results
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
    //   alert("Please enter text");
    }
  }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
		zoom={zoomLevel}
        onUnmount={onUnmount}
      >
        <Autocomplete
            onPlaceChanged={onPlaceChanged}
            onLoad = {onLoadAutocomplete}>
                <input
                type="text"
                placeholder="Search your location"
                style={{
                    marginTop: `10px`,
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
                }}
            />
        </Autocomplete>
        { /* Child components, such as markers, info windows, etc. */ }
        {/* <></> */}
        <Marker
				draggable={true}
          onLoad={onLoadMarker}
			position={position}
        />
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)