import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import {courseListData, courseDetailsData } from './API/api.js';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const[rating, setRating] = useState('')
  const [ type, setType ] = useState( 'courses' );
  const [ coords, setCoords ] = useState( {} );
  const [ radius, setRadius ] = useState( "5" )

  const [ courses, setCourses ] = useState( [] );
  const [ autocomplete, setAutocomplete ] = useState( null );
  const [ childClicked, setChildClicked ] = useState( null );
  const [ isLoading, setIsLoading ] = useState( false );
 const [filteredCourses, setFilteredCourses] = useState([]);

  //display users location
  useEffect( () => {
    navigator.geolocation.getCurrentPosition( ( { coords: { latitude, longitude } } ) => {
      setCoords( { lat: latitude, lng: longitude } );
    } );
  }, [] );
   useEffect(() => {
    const filtered = courses.filter((course) => Number(course.rating) > rating);

    setFilteredCourses(filtered);
  }, [rating]);

    useEffect(() => {
    if (coords) {
      setIsLoading(true);

      courseListData(coords.lat, coords.lng, radius=5)

        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [coords, type]);


  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };




    const onLoad = ( autoC ) => setAutocomplete( autoC );

    return (
      <>
        <CssBaseline />
        <Header onPlaceChanged={ onPlaceChanged } onLoad={ onLoad } />
        <Grid container spacing={ 3 } style={ { width: '100%' } }>
          <Grid item xs={ 12 } md={ 4 }>
            <List
              isLoading={ isLoading }
              childClicked={ childClicked }
              type={ type }
           courses={filteredCourses.length ? filteredCourses : courses}

              setType={ setType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 8 } style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
            <Map
              setChildClicked={ setChildClicked }
              setCoords={ setCoords }
              setRadius={ setRadius }
              coords={ coords }
              courses={ filteredCourses.length?filteredCourses:courses }
             
            />
          </Grid>
        </Grid>
      </>
    );
  };


export default App
