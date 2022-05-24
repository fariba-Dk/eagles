import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import CourseDetails from '../Details/CourseDetails.js';
import useStyles from './styles.js';

const List = ({ courses, type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) => Array(courses.length).fill().map((_, i) => refs[i] || createRef()));
  }, [courses]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Golf Courses By You ⛳️</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="courses">Courses</MenuItem>
              <MenuItem value="parks">Parks</MenuItem>
              <MenuItem value="learn">Learn</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {courses?.map((course, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <CourseDetails selected={ Number( childClicked ) === i } refProp={ elRefs[ i ] } course={ course } />
                
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
