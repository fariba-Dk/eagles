import axios from 'axios';//library to make our calls {courseListData, courseDetailsData}

export const hostUrl ='https://golf-course-finder.p.rapidapi.com'

//get list of courses from rapid api   Rancho park =>Latitude: 34.0454302 Longitude: -118.4206915
export const courseListData = async (radius = 5, lat, lng) => {
  const { data } = await axios.get( 'https://golf-course-finder.p.rapidapi.com/courses', {
    params: {radius, lat, lng},
     headers: {
      'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_GETGOLF_API_KEY
    }
  } )
  return data
}

export const courseDetailsData = async ( name, zip ) => {
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
}

export const getWeatherData = async (lat, lng) => {

      const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lng },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      });

      return data;
  };



