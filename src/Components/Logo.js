import { Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { ReactComponent as VirusSVG } from './virus1.svg'
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logotext: {
        fontFamily: '"Josefin Sans", sans-serif',
        fontSize: '2rem',
        color: theme.palette.text.secondary
    },
    SVG: {
        width: '3.5rem',
        fill: red[500],

    },
    red: {
        color: red[500]
    }
}));

function Logo() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant="h3" color="initial" className={classes.logotext} >C</Typography>
            <VirusSVG className={classes.SVG} />
            <Typography variant="h3" color="initial" className={`${classes.logotext}`} >VID-</Typography>
            <Typography variant="h3" color="initial" className={`${classes.logotext} ${classes.red}`} >19</Typography>
        </div>
    )
}

export default Logo
