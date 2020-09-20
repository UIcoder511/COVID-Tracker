import { Card, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useReducer, useState } from "react";
import CovidMap from "./Components/CovidMap";
import global from "./global.svg";
import "./App.css";
import SelectCountry from "./Components/SelectCountry";
import Stats from "./Components/Stats";

import CountryContext from "./Components/Context/CountryContext";
import { isoToPosUtil } from "./Components/Util";
import Axios from "axios";
// import config from "./Components/Config/APIconfig";
import TopCasesSide from "./Components/TopCasesSide";
import LineGraph from "./Components/LineGraph";
import Logo from "./Components/Logo";

const getAllCountiesdata = {
  query: `{
    summary{
      countries{
        Code,
        Country_Region,
        Confirmed,
        Deaths,
        Recovered, 
      }
    }
  }`,
};

const getGlobalData = {

  query: `{
                  summary{
                      globalData{
                        Confirmed,
                        Deaths,
                        Recovered,
                        NewDeaths,
                        NewConfirmed,
                        NewRecovered
                      }
                    }
                  }`,

}

const getGlobalTimeline = {

  query: `{
    timeline{
      date,
      confirmed,
      deceased,
      recovered
    }
  }`,

}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    display: "flex",
    margin: "auto",
    padding: theme.spacing(2, 5, 2, 5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 2, 0, 2)
    }
  },
  selectCountry: {
    display: "flex",
    position: 'sticky',
    top: '0',
    zIndex: '10000',
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  paperSelect: {
    padding: theme.spacing(2),
    width: '100%',

    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  map: {
    padding: theme.spacing(2),

    height: "400px",
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      height: "310px"
    },
    [theme.breakpoints.down('xs')]: {
      // padding: theme.spacing(1),
      height: "280px"
    }
  },
  topCountries: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: "400px",
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      height: "310px"
    }
  }
}));



export const initial = {
  Country_Region: "Global",
  img: global,
  Code: 'global'

};



const reducer = (state, action) => {
  switch (action.type) {
    case 'gotApiData':
      return {
        ...state,
        open: true,
        allCountries: action.value.allCountries,
        globalData: action.value.globalData,
        globalTimeline: action.value.globalTimeline
      }
    case 'setSelectedCountry':
      // console.log(action)
      return {
        ...state,
        selectedCountry: action.value
      }


  }
};

function App() {
  // const [countries, setCountries] = useState([]);
  // console.log(Util["in"]);

  const classes = useStyles();

  const initialState = {
    open: false,
    selectedCountry: initial,
    allCountries: [],
    globalData: {},
    globalTimeline: []
  }
  const [selectedStats, setSelectedStats] = useState('Confirmed')

  const [rootState, dispatch] = useReducer(reducer, initialState);

  // const [open, setopen] = useState(false);
  // const [selectedCountry, setselectedCountry] = useState(initial);
  // const [allCountries, setAllCountries] = useState([]);
  // const [globalData, setglobalData] = useState({})

  // console.log(Util[toString()]);


  useEffect(() => {


    Axios.all([
      Axios.post('https://api-corona.azurewebsites.net/graphql', getGlobalData),
      Axios.post('https://api-corona.azurewebsites.net/graphql', getAllCountiesdata),
      Axios.post('https://covid19-graphql.herokuapp.com/', getGlobalTimeline)]
    )
      .then(Axios.spread((data1, data2, data3) => {
        console.log(data2)
        data2 = data2.data.data.summary.countries;
        // console.log('data22', data22)
        data2 = data2.filter(d =>
          d.Code !== 'BU' && d.Code !== 'holy-see' && d.Code !== 'ms-zaandam' && d.Code !== 'west-bank-and-gaza'

        )
        // console.log('data22', d1)
        data2 = data2.map((s) =>
          Object.assign(s, {
            img: `https://www.countryflags.io/${s.Code}/flat/32.png`,
          })
        );
        data2.unshift(initial);

        // console.log(data3);
        // setAllCountries(data22);
        // setglobalData(data1.data.data.summary.globalData);
        // setopen(true);
        dispatch({
          type: 'gotApiData',
          value:
          {
            globalData: data1.data.data.summary.globalData,
            allCountries: data2,
            globalTimeline: data3.data.data.timeline
          }
        });

      }));




  }, []);

  // if (selectedCountry.Country_Region !== "Global") {
  //   console.log(selectedCountry);
  //   var iso2 = selectedCountry.Code.toLowerCase();

  // }


  // useEffect(() => {




  // }, [input])

  return (

    <CountryContext.Provider
      value={{
        country: rootState.selectedCountry,
        // pos: rootState.selectedCountry.Country_Region && rootState.selectedCountry.Country_Region === 'Global' ?
        //   { lat: "51.505", long: "-0.09" } :
        //   isoToPosUtil[rootState.selectedCountry.Code.toLowerCase()],
        globalData: rootState.globalData,
        countries: rootState.allCountries,
        selectedStats: selectedStats,
        globalTimeline: rootState.globalTimeline,
        open: rootState.open
      }}


    >

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <Card className={classes.paper}> */}
            <Logo />
            {/* </Card> */}
          </Grid>

          <Grid item xs={12} className={classes.selectCountry}>
            <Card className={classes.paperSelect}>
              <SelectCountry
                getCountry={(s) => dispatch({ type: 'setSelectedCountry', value: s })}
                open={rootState.open}
                allCountries={rootState.allCountries}
                selectedCountry={rootState.selectedCountry}
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.paper}>
              <Stats getSelectedStats={(s) => setSelectedStats(s)} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Card className={classes.map}>
              <CovidMap
                position={
                  rootState.selectedCountry.Country_Region !== "Global" &&
                    isoToPosUtil[rootState.selectedCountry.Code.toLowerCase()]
                    ? isoToPosUtil[rootState.selectedCountry.Code.toLowerCase()]
                    : { lat: "40.505", long: "0" }
                }
                zoom={rootState.selectedCountry.Country_Region !== "Global" ? 3 : 1}
              // position={{ lat: "51.505", long: "-0.09" }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}  >
            <Card className={classes.topCountries} > <TopCasesSide /> </Card>
          </Grid>
          <Grid item xs={12} >
            <Card className={classes.paper}> <LineGraph /> </Card>
          </Grid>
        </Grid>
      </div>
    </CountryContext.Provider >
  );
}

export default App;
