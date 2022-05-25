import axios from 'axios';//library to make our calls {courseListData, courseDetailsData}

export const hostUrl ='https://golf-course-finder.p.rapidapi.com'
//get list of courses from rapid api   Rancho park =>Latitude: 34.0454302 Longitude: -118.4206915
export const getGolfCourses = async ( radius = 5, lat, lng ) => {
  try {
      const { data } = await axios.get( 'https://golf-course-finder.p.rapidapi.com/courses', {
    params: {radius: 5, lat, lng},
     headers: {
      'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_GETGOLF_API_KEY
    }
  } )
  console.log(data.courses)
  return data
  } catch ( err ) {
    console.log(err)
  }
}




export const getCourseDetails = async ( name, zip ) => {
  try {
    const courseData= await axios.get( 'https://golf-course-finder.p.rapidapi.com/course/details', {
    params: {
      name: name,
      zip: zip,
    },
    headers: {
      'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_GETGOLF_API_KEY
    }
  } )
  return courseData

  } catch ( err ) {
    console.log(err)
  }
}




