// import { circleMarker } from "leaflet";
// import {  } from "leaflet";
import React, { useContext } from "react";
import Numeral from "numeral";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  Circle
} from "react-leaflet";
import CountryContext from "./Context/CountryContext";

// import "leaflet/dist/leaflet.css";
import th from '@material-ui/core/styles/defaultTheme';
import { multiplier, isoToPosUtil } from "./Util";
import { useStyles } from "./SelectCountry";
import { createMuiTheme, responsiveFontSizes, ThemeProvider, Typography } from "@material-ui/core";

let fonttheme = createMuiTheme();
fonttheme = responsiveFontSizes(fonttheme);

function CovidMap({ position, zoom }) {
  const classes = useStyles();
  console.log(position);
  const { lat, long } = position;
  const { globalData, countries, selectedStats } = useContext(CountryContext);

  // useEffect(() => {
  //   // multiplier()
  //   // console.log(th)
  // }, [])

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Map center={[lat, long]} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        />

        {
          countries.filter(country => {
            if (isoToPosUtil[country.Code.toLowerCase()] === undefined)
              return false
            else
              return true
          }).map(country => {
            const latlong = isoToPosUtil[country.Code.toLowerCase()];
            // console.log(JSON.stringify(position) + " " + JSON.stringify(latlong))
            return (
              <Circle key={country.Country_Region} center={[latlong.lat, latlong.long]} stroke={th.palette.primary.light} fillColor={JSON.stringify(position) === JSON.stringify(latlong) ? th.palette.secondary.main : th.palette.primary.main} radius={multiplier(globalData[selectedStats], country[selectedStats])} >
                <Popup>
                  <ThemeProvider theme={fonttheme}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
                      <img src={country.img} className={classes.img} />
                      <Typography variant='subtitle2' style={{ alignSelf: 'center' }} >{country.Country_Region}</Typography>

                    </div>
                    <div className="confirmed">
                      <Typography variant='caption'>Confirmed : </Typography>
                      <Typography variant='caption'>{Numeral(country.Confirmed).format()}</Typography>
                    </div>
                    <div className="recovered">
                      <Typography variant='caption'>Recovered : </Typography>
                      <Typography variant='caption'>{Numeral(country.Recovered).format()}</Typography>
                    </div>
                    <div className="deaths">
                      <Typography variant='caption'>Deaths : </Typography>
                      <Typography variant='caption'>{Numeral(country.Deaths).format()}</Typography>
                    </div>
                  </ThemeProvider>
                </Popup>
              </Circle>
            )
            // console.log(isoToPosUtil[country.Code.toLowerCase()] + ' ' + country.Code)
          }

          )


        }




        {/* <CircleMarker center={[lat, long]} fillColor="blue" radius={20} /> */}
      </Map>
    </div>
  );
}

export default CovidMap;
