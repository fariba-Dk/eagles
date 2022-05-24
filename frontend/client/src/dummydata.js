


import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  return (
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
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
{
    "course_details": {
        "html_attributions": [],
        "result": {
            "formatted_address": "Rancho Park, Los Angeles, CA, USA",
            "name": "Rancho Park",
            "photos": [
                {
                    "height": 1024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104614620111381777334\">Nick Spinner</a>"
                    ],
                    "photo_reference": "Aap_uECCJA8hOjy7bzATXxGmvj0154erqJaj73cOeR_g5YddXSZGth2Fl5nSm1PUGceLpRa7XbvDcQTLygUBZh50jDQfd72Z0spI-3uDNBBEPTP4Io1emXQF3axAEIf9HNIJcfCHZZOWjrugQxJeG4_36nOE8TUh43qBEUx0gSWPjVkGZpT4",
                    "width": 768
                },
                {
                    "height": 1536,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/105256742653071468071\">Sebastio Soares Soares</a>"
                    ],
                    "photo_reference": "Aap_uEBCG3ZMYQvBAOWM-b6q1IWYEr7YaQe9EAR-soVfcWwOB1LS4U84YBlyaw7ouNhvXnc4R1w-CaQLlIJGGuRMJyPvNJByMIcTQnxWUTVybDxCx7HvP3gk67qB5p_r7Lq00H54uODcZ2gyBEaTrzyDuSER0O5KtRjviaFsrxA57EvfbmR9",
                    "width": 2560
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/100801458895808301972\">Daniel Martinez</a>"
                    ],
                    "photo_reference": "Aap_uECc6B3qGB7HxeRkBFkMezrZcL0oxY5YLeebwpL2SmfKtN5HCNz3miCAeJyZ7W7Wg5ipR2zeti9qvgQ8DpPCVbbV6FCqxhiVseFE8UP4EJ6waL7ctGwSScUFVN-BbJOeylu-PLhV9oOMA5SHVkl0bb_sN6DYzynqqKsW7sfAkTgn9oUu",
                    "width": 4032
                },
                {
                    "height": 1006,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/107075303547171942364\">Jonathan Zacharias</a>"
                    ],
                    "photo_reference": "Aap_uECotoirwdvk-3vzU6kyDgBkIxI_q4pTQBG3QxSKYqQqL3l8iCv0r9GH2Hib-82bzBJscR2At9Nc35DXWWNNGhEKJfJgZTlhl735d4Z3z9gmQrqnVSJJrLfA8RTXFTWMemHRgU81bzgtbjymDpAHnVdl7qo3NCGXBnrdsLdoIbU4jwaI",
                    "width": 566
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/100801458895808301972\">Daniel Martinez</a>"
                    ],
                    "photo_reference": "Aap_uEDyFKTg7tOgvMgZhe6OcKwdX5AQSqp3dydk2j8mtYR00PQIH-aZfppGLDZKHwFUwIMwFXkzQxG8_LzTm_itqNNF4DxvICl1sYgK-KbypHEMUKm5H-uh1Q5owGs7j6JoKexafzj_VijnfZcY_T9n-2uwDfXha5lI8kXtkKVMAokefa-F",
                    "width": 4032
                },
                {
                    "height": 3264,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/107507384795524930938\">Marisol Perez</a>"
                    ],
                    "photo_reference": "Aap_uECiw8-GME29Nv2rr95VVJR3WCOhqRHcSrvZGj_BMSrWNRh-NiUiHGXhWREAlk7ThIMYNfuJ0TNOojUx23maIXPfIm7msVEckKm7q-Ki-rzjAYAcGVhV3wyjxv4RgXEsMqYSj1l1Pr1c8MG3PQdSoaHGVB-DmqZdv7NvKgXYC0wq69uo",
                    "width": 1836
                },
                {
                    "height": 1003,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/107075303547171942364\">Jonathan Zacharias</a>"
                    ],
                    "photo_reference": "Aap_uEArH67N1WVvvaLKPk6U1pri3FCkuzKGvK3dUP4AfmgXLHrCppPewaIljh8-O0Ir96rDy6LxlBkhJILwTeKlf0zC7wHWIbXP0S2HYPBrYK9Mz73W_RGySoLHgZbxKopd-kQ8-FD4mxDMp-69yV2gHdOTnXZpq1sRlA7KnK9DIqNGMtYo",
                    "width": 564
                }
            ],
            "url": "https://maps.google.com/?q=Rancho+Park,+Los+Angeles,+CA,+USA&ftid=0x80c2bbbe2735bb73:0x5bd2d134fc8b7f5a"
        },
        "status": "OK"
    }
}
