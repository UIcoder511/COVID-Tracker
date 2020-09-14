import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import "./App.css";
import SelectCountry from "./Components/SelectCountry";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    display: "flex",
    margin: "auto",
    padding: theme.spacing(5, 0, 0, 0),
  },
  selectCountry: {
    display: "flex",
    justifyContent: "center",
  },
}));

function App() {
  // const [countries, setCountries] = useState([]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Grid container>
        <Grid item xs={12}>
          Logo
        </Grid>
      </Grid> */}
      <Grid container spacing={3}>
        <Grid item xs={1} />

        <Grid item xs={10} className={classes.selectCountry}>
          <SelectCountry />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
}

export default App;
