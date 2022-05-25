import React,{useState, useEffect} from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { courseListData, courseDetailsData } from '../../API/api.js';

import useStyles from './styles.js';

//course is passed as props from the List component
const CourseDetails = ({ course, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={ { height: 350 } }
        images={ course.photo ? course.photo.images.large.url : 'https://www.pebblebeach.com/content/uploads/pbgl-7thhole-wave-bartkeagy-1-1067x600.jpg'} alt={ "image" }
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{course.name}</Typography>
        <Box display="flex" justifyContent="space-between"></Box>
        { course?.map( ( { name } ) => ( <Chip key={ name } size="small" label={ name } className={ classes.chip } /> ) ) }
        {course.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            {course.address}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(course.web_url, '_blank')}>
          Click
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(course.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseDetails;




