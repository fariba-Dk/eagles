import React from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import AutoComplete from './AutoComplete'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import useStyles from './styles'


const Header = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyles();

  return (

    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
           ⛳️ Golf'sByU 🏌🏼‍♀️
        </Typography>
        <Box display="flex">
          <Typography variant="h5" className={classes.title}>
             <AutoComplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
        </Typography>
        </Box>
      </Toolbar>
      </AppBar>
  </>
  );
};

export default Header;

// import React from 'react';
// import { Autocomplete } from '@react-google-maps/api';
// import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';

// import useStyles from './styles.js';

// const Header = ({ onPlaceChanged, onLoad }) => {
//   const classes = useStyles();

//   return (
//     <AppBar position="static">
//       <Toolbar className={classes.toolbar}>
//         <Typography variant="h5" className={classes.title}>
//            ⛳️ Golf'sByU ⛳️
//         </Typography>
//         <Box display="flex">
//           <Typography variant="h6" className={classes.title}>
//             Search Location or Course Name 🏌🏼‍♀️
//           </Typography>
//           <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
//             <div className={classes.search}>
//               <div className={classes.searchIcon}>
//                 <SearchIcon />
//               </div>
//               <InputBase placeholder="⛳️..⛳️" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
//             </div>
//           </Autocomplete>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

// // git branch -M main
// // git push -u origin main
