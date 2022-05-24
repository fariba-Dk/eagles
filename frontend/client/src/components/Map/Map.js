import React, {useCallback,useState} from 'react';
import { Paper, Typography } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import '../../index.css'
import useStyles from '../Map/styles';


const Map = ({ coords, setCoords, setChildClicked, courses, details, weatherData}) => {

  const classes = useStyles();
  const { isLoaded, loadError } = useLoadScript( {
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,

  } );

  if ( loadError ) return "Error loading maps"
  if ( !isLoaded ) return "Loading Maps..."

  return (
    <>
    <div className={classes.mapContainer}>
      <GoogleMapReact
        defaultCenter={ coords }
        id="map"
        center={coords}
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        options={''}
        // onClick={ onMapClick }
        onChange={ ( e ) => {
            setCoords( { lat: e.center.lat, lng: e.center.lng } )
          } }
        onChildClick={(child) => setChildClicked(child)}
        >{ courses?.map( ( course, i ) =>(
          <div className={classes.markerContainer}
            lat={coords.lat}
            lng={coords.lng }
            key={i}
          >⛳️</div>
        ) ) }

      </GoogleMapReact>
      </div>
  </>

  );
}

export default Map;


// import React from 'react';
// import GoogleMapReact from 'google-map-react';
// import { Paper, Typography, useMediaQuery } from '@material-ui/core';
// import Rating from '@material-ui/lab/Rating';

// import mapStyles from './styles';
// import useStyles from './styles.js';

// //pass coords as setter function as props
// const Map = ( { coords, courses, setCoords, setChildClicked, weatherData } ) => {

//   const classes = useStyles();

//   return (
//     <div className={ classes.mapContainer }>

//       <GoogleMapReact
//         bootstrapURLKeys={ { key: process.env.REACT_APP_GOOGLE_MAP_API_KEY } }
//         defaultCenter={ coords }
//         center={ coords }
//         defaultZoom={ 14 }
//         margin={ [ 50, 50, 50, 50 ] }
//         options={ { disableDefaultUI: true, zoomControl: true, styles: mapStyles } }
//         onChange={ ( e ) => {
//         setCoords( { lat: e.center.lat, lng: e.center.lng } );

//         } }
//         onChildClick={ ( child ) => setChildClicked( child ) }
//       >
//         { courses && courses.map( ( course, i ) => (
//           <div
//             className={ classes.markerContainer }
//             lat={ coords.lat }
//             lng={ course.lng }
//             key={ i }
//           > ⛳️ <Paper elevation={ 3 } className={ classes.paper }>
//               <Typography className={ classes.typography } variant="subtitle2" gutterBottom> { course.name }</Typography>
//               <image
//                 className={ classes.pointer }
//                 src={ course.photo ? course.photo.images.large.url : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthehenebrys.com%2Fpurchase-pebble-beach%2Fserenity-pebble-beach-california&psig=AOvVaw070ZS8Iwgtfx2UmgOsVzdv&ust=1653454200024000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMiz9IOr9_cCFQAAAAAdAAAAABAM' }
//               />
//               <Rating name="read-only" size="small" value={ course.rating } readOnly />
//             </Paper>
//         ))}

//           </div>
//         ) ) }
//       </GoogleMapReact>
//     </div>


// )}

// export default Map;
