import { Grid, makeStyles, Paper, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import CountryContext from "./Context/CountryContext";


import axios from "axios";
import Numeral from "numeral";

import { ReactComponent as VirusSVG } from './virus1.svg'
import { grey, red, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    gap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    boxSizing: 'border-box',
    color: theme.palette.text.secondary,
    // backgroundColor: grey[800],
    cursor: 'pointer',
    height: '110px',
    display: 'flex',
    justifyContent: 'center',
    gap: '0.7rem',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',

    // height: '100px',
    [theme.breakpoints.down('sm')]: {
      gap: '0.3rem',
      // flexDirection: 'column',
      // alignItems: 'center',
      padding: theme.spacing(1, 1)
    },
    [theme.breakpoints.down('xs')]: {
      // gap: '0.3rem',
      flexDirection: 'column',
      alignItems: 'center',
      // padding: theme.spacing(1, 1)
    }

  },
  new: {
    '&::before': {
      content: '+'
    },
  },
  SVGPaper: {
    width: '5rem',
    [theme.breakpoints.down('sm')]: {
      width: '3.5rem'
    },
    [theme.breakpoints.down('xs')]: {
      width: '3.2rem'
    }
  },
  paperConfirmed: {
    fill: red[500]
  },
  paperDead: {
    fill: grey[500]
  },
  paperRecovered: {
    fill: green[500]
  },
  selectedConfirmed: {
    borderBottom: `${red[500]} solid 0.2rem`
  },
  selectedRecovered: {
    borderBottom: `${green[500]} solid 0.2rem`
  },
  selectedDeaths: {
    borderBottom: `${grey[500]} solid 0.2rem`
  },
  Cases: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& span:nth-child(1)': {
      fontSize: '12px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '11px'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '10px'
      },

    },

    '& span:nth-child(2)': {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      [theme.breakpoints.down('sm')]: {
        fontSize: '15px'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '13px'
      },


    },
    '& span:nth-child(3)': {

      fontWeight: theme.typography.fontWeightRegular,
      fontSize: '12px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '11px'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '10px'
      },

    }

  }
}));

function Stats({ getSelectedStats }) {
  const usetheme = useTheme();
  const isXs = useMediaQuery(usetheme.breakpoints.down('xs'), {
    defaultMatches: true
  })
  const isSm = useMediaQuery(usetheme.breakpoints.down('sm'), {
    defaultMatches: true
  })

  const classes = useStyles();
  const [countryStats, setcountryStats] = useState([]);

  const [selectStats, setSelectStats] = useState('Confirmed');

  const context = useContext(CountryContext);

  useEffect(() => {


    if (context.country.Country_Region !== 'Global') {
      let countrydata = {
        query: `{
                  country(country:"${context.country.Code}")
                  {
                    Summary{
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

      axios.post('https://api-corona.azurewebsites.net/graphql', countrydata)
        .then((response) => {
          setcountryStats(response.data.data.country.Summary);
          //console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });

    }
    else {
      setcountryStats(context.globalData);
    }


  }, [context]);


  useEffect(() => {

    // console.log(selectStats)
    getSelectedStats(selectStats)

  }, [selectStats])

  return (
    <div>
      <Grid container spacing={isXs ? 1 : (isSm ? 2 : 4)} >
        <Grid item xs={4}>
          <Paper className={selectStats === 'Confirmed' ? `${classes.paper} ${classes.selectedConfirmed}` : classes.paper} onClick={() => setSelectStats('Confirmed')} >
            {/* <img src={VirusSVG} className={classes.svg} /> */}
            <VirusSVG className={`${classes.paperConfirmed} ${classes.SVGPaper}`} />
            <div className={classes.Cases}>
              <span>Total Cases</span>
              <span>{Numeral(countryStats.Confirmed).format()}</span>
              <span className='new__cases'>{Numeral(countryStats.NewConfirmed).format()}</span>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={selectStats === 'Recovered' ? `${classes.paper} ${classes.selectedRecovered}` : classes.paper} onClick={() => setSelectStats('Recovered')}>
            <VirusSVG className={`${classes.paperRecovered} ${classes.SVGPaper}`} />
            <div className={classes.Cases}>
              <span>Total Recovered</span>
              <span>{Numeral(countryStats.Recovered).format()}</span>
              <span className='new__cases'>{Numeral(countryStats.Recovered).format()}</span>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={selectStats === 'Deaths' ? `${classes.paper} ${classes.selectedDeaths}` : classes.paper} onClick={() => setSelectStats('Deaths')}>
            <VirusSVG className={`${classes.paperDead} ${classes.SVGPaper}`} />
            <div className={classes.Cases}>
              <span>Total Deaths</span>
              <span>{Numeral(countryStats.Deaths).format()}</span>
              <span className='new__cases'>{Numeral(countryStats.NewDeaths).format()}</span>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stats;
