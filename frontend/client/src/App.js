import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import {courseListData, courseDetailsData, getWeatherData } from './API/api.js';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [type, setType] = useState('courses');
  const [ coords, setCoords ] = useState( {} );
  const [radius, setRadius] = useState("5")
  const [ courses, setCourses ] = useState( [] );
  const [course, setCourse] = useState({})
  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [ isLoading, setIsLoading ] = useState( false );

   const [weatherData, setWeatherData] = useState([])

  //display users location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  const onPlaceChanged = ( coords ) => {

    setCoords( coords );
    if ( coords.lat && coords.lng && radius ) {

      setIsLoading( true )//display loading

      // getWeatherData(coords.lat, coords.lng)
      //   .then( ( data ) => setWeatherData( data ) );

      courseListData( radius, coords.lat, coords.lng )

        .then( ( data ) => {

          setCourses( data.courses )
        } )
        .catch( ( err ) =>
          console.log( err ) )
        .finally( () => {
          setIsLoading( false );//once loaded it sets to false
        }
        )
    }
  }




  const onLoad = (autoC) => setAutocomplete(autoC);

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            type={ type }
            courses={courses}
            setType={setType}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setCoords={ setCoords }
            setRadius={setRadius}
            coords={ coords }
            courses={courses}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
