
import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';


const Map = ({ coordinates, setCoordinates, coords, setCoords, setChildClicked, courses, details}) => {

  const classes = useStyles();

  return (
    <>
    <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
       defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });

        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {courses.length && courses.map((course, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(course.latitude)}
            lng={Number(course.longitude)}
            key={i}
          >⛳️</div>
        ) ) }

      </GoogleMapReact>
      </div>
  </>

  );
}

export default Map;

