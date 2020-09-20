
import { makeStyles, Paper } from '@material-ui/core';
import React, { useContext } from 'react'

import { useStyles } from "./SelectCountry";
import Numeral from "numeral";

import CountryContext from "./Context/CountryContext";

const useStyles2 = makeStyles((theme) => ({
    title: {
        textAlign: "center",
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between'

    },
    paper: {
        padding: theme.spacing(1),
        // textAlign: "center",
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.text.secondary,
        '& span': {
            fontSize: '12px'
        },
        '& span:nth-child(3)': {
            marginLeft: 'auto'
        }
    }
}))

function TopCasesSide() {
    const { countries, selectedStats } = useContext(CountryContext);


    const classes = useStyles2();
    const imgcss = useStyles();



    return (
        <>

            <div className={classes.title}>Top Countries</div>
            {
                countries && [].concat(countries)
                    .sort((a, b) => a[selectedStats] < b[selectedStats] ? 1 : -1)
                    .slice(0, 7)
                    .map((country, i) =>
                        <Paper key={i} className={classes.paper}>
                            <img src={country.img} className={imgcss.img} />
                            <span>{country.Country_Region}</span>
                            <span>{Numeral(country[selectedStats]).format()}</span>


                        </Paper>)




                // context.countries ? console.log([].concat(context.countries).sort((a, b) => a.Confirmed < b.Confirmed ? 1 : -1)) : null
            }
        </>
    )
}

export default TopCasesSide
