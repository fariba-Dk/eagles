import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';
import { getWeatherData } from './API-CALLS/api'
import { getGolfCourses, getCourseDetails } from './API-CALLS/api';
import Header from './components/header/Header';
import List from './components/courses/CourseList';
import Map from './components/map/Map';

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

  //this sets the user's location RIGHT WHEN
  useEffect( () => {
    navigator.geolocation.getCurrentPosition( ( { coords: { latitude, longitude } } ) => {
      setCoords( { lat: latitude, lng: longitude } );
    } );
  }, [] );

  useEffect( () => {
    const filtered = courses.filter( ( course ) => Number( course.rating ) > rating );

    setFilteredCourses( filtered );
  }, [ type ] );

  useEffect( () => {
    if ( radius ) {
      setIsLoading( true );

      getGolfCourses( radius, String(coords.lat), String(coords.lng ))//getGolfCourses = async (radius, lat, lng)
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
    // const lat = autocomplete.getGolfCourses().geometry.location.lat();
    // const lng = autocomplete.getGolfCourses().geometry.location.lng();

    setCoords( {lat:latLng.lat, lng:latLng.lng } );
  };


  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            courses={filteredCourses.length ? filteredCourses : courses}
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



// import React, { useState, useEffect, createRef } from 'react';
// import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
// import useStyles from './courseListStyle';
// import CourseDetails from './CourseDetails'

// const List = ({ courses, type, setType, rating, setRating, childClicked, isLoading }) => {
//   const [elRefs, setElRefs] = useState([]);
//   const classes = useStyles();

//   useEffect(() => {
//     setElRefs((refs) => Array(courses.length).fill().map((_, i) => refs[i] || createRef()));
//   }, [courses]);

//   return (
//     <div className={classes.container}>
//       <Typography variant="h4">Golf Courses around you</Typography>
//       {isLoading ? (
//         <div className={classes.loading}>
//           <CircularProgress size="5rem" />
//         </div>
//       ) : (
//           <>
//             {/* scroll down form */}
//           <FormControl className={classes.formControl}>
//             <InputLabel id="type">Search here ⛳️</InputLabel>
//             <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
//               <MenuItem value="courses">Golf Courses</MenuItem>
//               <MenuItem value="parks">Parks</MenuItem>
//               <MenuItem value="attractions">Attractions</MenuItem>
//             </Select>
//           </FormControl>

//             {/* scroll down ratings */}
//           <FormControl className={classes.formControl}>
//             <InputLabel id="rating">Ratings</InputLabel>
//             <Select id="rating" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)}>
//               <MenuItem value="">Rating</MenuItem>
//               <MenuItem value="3">Above 3.0</MenuItem>
//               <MenuItem value="4">Above 4.0</MenuItem>
//               <MenuItem value="4.5">Above 4.5</MenuItem>
//             </Select>
//             </FormControl>

//             {/* container */}
//           <Grid container spacing={3} className={classes.list}>
//             {courses?.map((course, i) => (
//               <Grid ref={elRefs[i]} key={i} item xs={12}>
//                 <CourseDetails selected={Number(childClicked) === i} refProp={elRefs[i]} course={course} />
//               </Grid>
//             ))}
//           </Grid>
//         </>
//       )}
//     </div>
//   );
// };

// export default List;


// import useStyles from './courseListStyle'
// import React, { useState, useEffect, createRef } from 'react';
// import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
// import CourseDetails from './CourseDetails'


// const CourseList = ({ courses, type, setType, rating, setRating, childClicked, isLoading }) => {
//   const [elRefs, setElRefs] = useState([]);
//   const classes = useStyles();

//   useEffect(() => {
//     setElRefs((refs) => Array(courses.length).fill().map((_, i) => refs[i] || createRef()));
//   }, [courses]);

//   return (
//     <div className={classes.container}>
//       <Typography variant="h4">Golf Courses By You</Typography>
//       {isLoading ? (
//         <div className={classes.loading}>
//           <CircularProgress size="5rem" />
//         </div>
//       ) : (
//           <>
//             {/* type select form */}
//           <FormControl className={classes.formControl}>
//             <InputLabel id="type">Menu</InputLabel>
//             <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
//               <MenuItem value="courses">Golf Courses</MenuItem>
//               <MenuItem value="tournaments">Tournaments</MenuItem>
//               <MenuItem value="videos">Videos</MenuItem>
//             </Select>
//             </FormControl>

//           {/* rating select form */}

//           <FormControl className={classes.formControl}>
//             <InputLabel id="rating">Rating</InputLabel>
//             <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
//               <MenuItem value="">All</MenuItem>
//               <MenuItem value="3">Above 3.0</MenuItem>
//               <MenuItem value="4">Above 4.0</MenuItem>
//               <MenuItem value="4.5">Above 4.5</MenuItem>
//             </Select>
//             </FormControl>

//             {/* Container of each card = course details */}

//           <Grid container spacing={3} className={classes.list}>
//             {courses?.map((place, i) => (
//               <Grid ref={elRefs[i]} key={i} item xs={12}>
//                 <CourseDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
//               </Grid>
//             ))}
//           </Grid>
//         </>
//       )}
//     </div>
//   );
// };

// export default CourseList;

// import React, { useState, useEffect } from 'react'
// import { CssBaseline, Grid } from '@material-ui/core';
// import { getGolfCourses, getCourseDetails } from './API-CALLS/api';
// import Header from './components/header/Header';
// import List from './components/courses/CourseList';
// import Map from './components/map/Map';

// const App = () => {
//   const [ type, setType ] = useState( 'courses' );
//   const [ rating, setRating ] = useState( '' );

//   const [ coords, setCoords ] = useState( {} );
//   const [ radius, setRadius ] = useState( );

//   const [ golfCourses, setGolfCourses ] = useState( {} )
//   const [ courseDetails, setCourseDetails ] = useState( {} )

//   const [ filteredCourses, setFilteredCourses ] = useState( [] );
//   const [ courses, setCourses ] = useState( [] );

//   const [ autocomplete, setAutocomplete ] = useState( null );
//   const [ childClicked, setChildClicked ] = useState( null );
//   const [ isLoading, setIsLoading ] = useState( false );

//   //this sets the user's location RIGHT WHEN
//   useEffect( () => {
//     navigator.geolocation.getCurrentPosition( ( { coords: { latitude, longitude } } ) => {
//       setCoords( { lat: latitude, lng: longitude } );
//     } );
//   }, [] );

//   useEffect( () => {
//     const filtered = courses.filter( ( course ) => Number( course.rating ) > rating );

//     setFilteredCourses( filtered );
//   }, [ type ] );

//   useEffect( () => {
//     if ( radius ) {
//       setIsLoading( true );

//       getGolfCourses( radius, String(coords.lat), String(coords.lng ))//getGolfCourses = async (radius, lat, lng)
//         .then( ( data ) => {
//           console.log( data, coords )
//           setCourses( data.filter( ( course ) => course.name && course.num_reviews > 0 ) );
//           setFilteredCourses( [] );
//           setRating( '' );
//           setIsLoading( false );
//         } ).catch( err => console.log( err ) )
//     }
//   }, [])

//   const onLoad = (autoC) => setAutocomplete(autoC);

//   const onPlaceChanged = (latLng) => {
//     console.log('App.onPlaceChange', latLng)
//     // const lat = autocomplete.getGolfCourses().geometry.location.lat();
//     // const lng = autocomplete.getGolfCourses().geometry.location.lng();

//     setCoords( {lat:latLng.lat, lng:latLng.lng } );
//   };


//   return (
//     <>
//       <CssBaseline />
//       <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
//       <Grid container spacing={3} style={{ width: '100%' }}>
//         <Grid item xs={12} md={4}>
//           <List
//             isLoading={isLoading}
//             childClicked={childClicked}
//             courses={filteredCourses.length ? filteredCourses : courses}
//             type={type}
//             setType={setType}
//             rating={rating}
//             setRating={setRating}
//           />
//         </Grid>
//         <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Map
//             setChildClicked={setChildClicked}
//             setRadius={setRadius}
//             setCoords={setCoords}
//             coords={coords}
//             courses={filteredCourses.length ? filteredCourses : courses}

//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default App;
