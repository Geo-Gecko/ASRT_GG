// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import ContainedButtons from "./Button";
// import geoLogo from "../Images/geoLogo.png";
// import Callouts from "./Callout";
// import { Link } from "react-router-dom";

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1
//   },
//   title: {
//     flexGrow: 1
//   },
//   spacing: {
//     margin: 10
//   },
//   navigation: {
//     height: 50,
//     width: 120
//   },
//   calloutstyles: {
//     height: 100,
//     width: 120
//   }
// }));

// export default function MenuAppBarOrientation() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <Toolbar>
//         <Typography variant="h6" className={classes.title}>
//           <a
//             href="https://www.geogecko.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img
//               src={geoLogo}
//               alt="geo gecko logo"
//               className={classes.navigation}
//             />
//           </a>
//         </Typography>
//         <Callouts
//           myComponent={
//           <ContainedButtons caption="Home" />
//           }
//           side="bottom"
//           styles={classes.calloutstyles}
//           message="Click on this home button to return on the home page"
//         />
//         <div className={classes.spacing} />
//         <Link to="/orientation" className="btn-link">
//         <ContainedButtons caption="Orientation" />
//         </Link>
//       </Toolbar>
//     </div>
//   );
// }
