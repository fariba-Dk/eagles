import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';
import { getGolfCourses, getCourseDetails } from '../src/API/api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { useJsApiLoader } from '@react-google-maps/api'

const App = () => {
  const [ type, setType ] = useState( 'courses' );
  const [ rating, setRating ] = useState( '' );

  const [ coords, setCoords ] = useState( {} );
  const [ radius, setRadius ] = useState( );

  const [ golfCourses, setGolfCourses ] = useState( {} )
  const [ courseDetails, setCourseDetails ] = useState( {} )

  const [ filteredCourses, setFilteredCourses ] = useState( [] );
  const [ courses, setCourses ] = useState( [] );

  const [ autocomplete, setAutocomplete ] = useState( null );
  const [ childClicked, setChildClicked ] = useState( null );
  const [ isLoading, setIsLoading ] = useState( false );


    const libraries = [ "places" ]

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries
  })
  //this sets the user's location RIGHT WHEN
  useEffect( () => {
    navigator.geolocation.getCurrentPosition( ( { coords: { latitude, longitude } } ) => {
      setCoords( { lat: latitude, lng: longitude } );
    } );
  }, [] );

  useEffect( () => {
    if ( radius ) {
      setIsLoading( true );

      getGolfCourses(coords)//getGolfCourses = async (radius, lat, lng)
        .then( ( data ) => {
          console.log( data, coords )
          setCourses( data.filter( ( course ) => course.name && course.num_reviews > 0 ) );
          setFilteredCourses( [] );
          setRating( '' );
          setIsLoading( false );
        } ).catch( err => console.log( err ) )
    }
  }, [])

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = (latLng) => {
    console.log('App.onPlaceChange', latLng)
    setCoords( {lat:latLng.lat, lng:latLng.lng } );
  };

   if ( loadError ) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }
  return !isLoaded ? <></> : (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={ childClicked }
            courses={courses}
            //courses={filteredCourses.length ? filteredCourses : courses}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setRadius={setRadius}
            setCoords={setCoords}
            coords={coords}
            courses={filteredCourses.length ? filteredCourses : courses}

          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import { CssBaseline, Grid } from '@material-ui/core';
// import { useJsApiLoader } from '@react-google-maps/api'

// import {courseListData, courseDetailsData } from './API/api.js';
// import Header from './components/Header/Header';
// import List from './components/List/List';
// import Map from './components/Map/Map';

// let radius;

// const App = () => {
//   const [ rating, setRating ] = useState( '' )
//   const [ type, setType ] = useState( 'courses' );
//   const [ coords, setCoords ] = useState(null);//its alwayse truth
//   const [ radius, setRadius ] = useState('5')
//   const [ courses, setCourses ] = useState( [] );
//   const [ autocomplete, setAutocomplete ] = useState( null );
//   const [ childClicked, setChildClicked ] = useState( null );
//   const [ isLoading, setIsLoading ] = useState( false );
//   const [ filteredCourses, setFilteredCourses ] = useState( [] );

//   const libraries = [ "places" ]

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
//     libraries
//   })
//   //display users location
//   useEffect( () => {
//     navigator.geolocation.getCurrentPosition( ( { coords: { latitude, longitude } } ) => {
//       setCoords( { lat: latitude, lng: longitude } );
//     } );
//   }, [] );


//   useEffect( () => {
//       console.log('this is coords from app _____=++++>', coords)
//     if (coords) {//this means is always true so we make sure all 3 is there
//       setIsLoading(true);

//       courseListData()

//         .then( ( data ) => {
//           console.log('----------> course list data from app filter', data)
//           setCourses(data.filter((course) => course.name && course.num_reviews > 0));
//           setFilteredCourses([]);
//           setRating('');
//           setIsLoading(false);
//         });
//     }
//   }, [radius, coords]);


//   const onPlaceChanged = () => {
//     const lat = autocomplete.getCourses().geometry.location.lat();
//     const lng = autocomplete.getCourses().geometry.location.lng();

//     setCoords({ lat, lng });
//   };

//   const onLoad = ( autoC ) => setAutocomplete( autoC );

//   if ( loadError ) {
//     return <div>Map cannot be loaded right now, sorry.</div>
//   }
//   return !isLoaded ? <></> : (
  //replace empty tags with loading

//       <>
//         <CssBaseline />

//         <Header onPlaceChanged={ onPlaceChanged } onLoad={ onLoad } />
//         <Grid container spacing={ 3 } style={ { width: '100%' } }>
//           <Grid item xs={ 12 } md={ 4 }>
//             <List
//               isLoading={ isLoading }
//               childClicked={ childClicked }
//               type={ type }
//               courses={ filteredCourses.length ? filteredCourses : courses }
//               setType={ setType }
//             />
//           </Grid>
//           <Grid item xs={ 12 } md={ 8 } style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
//             <Map
//               setChildClicked={ setChildClicked }
//               setCoords={ setCoords }
//               setRadius={ setRadius }
//               coords={ coords }
//               courses={ filteredCourses.length?filteredCourses:courses }

//             />
//           </Grid>
//         </Grid>
//       </>
//   );
// };


// export default App
