import React from "react";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

// import Config from "./Config/APIconfig";

// import global from "../global.svg";

// import axios from "axios";
import { CircularProgress } from "@material-ui/core";

import { initial } from "../App";


export const useStyles = makeStyles(theme => ({
  root: {
    width: "40%",
    [theme.breakpoints.down('sm')]: {

      width: "60%"
    },
    [theme.breakpoints.down('xs')]: {

      width: "100%"
    }
  },
  img: {
    width: '20px',
    height: '20px',
    objectFit: 'none',
    marginRight: "0.5rem",
    borderRadius: '999px'
  },
  option: {},
}));

function SelectCountry({ selectedCountry, getCountry, open, allCountries }) {
  // const [allCountries, setCountries] = useState([]);

  // const initial = {
  //   Country_Region: "Global",
  //   img: global,
  // };

  //const [allCountries, setCountries] = useState([initial]);
  //const [selectedCountry, setSelectedCountry] = useState(initial);
  const classes = useStyles();

  // useEffect(() => { }, []);

  // useEffect(() => {
  //   console.log('called')
  //   ;
  // }, [selectedCountry]);

  return (
    <>
      {console.log('renderSee')}
      <Autocomplete
        className={classes.root}
        // value={}
        // fullWidth
        //  className={classes.autocomp}
        id="selectedCountry-select"
        // style={{ width: 300 }}
        options={allCountries}
        // value={}
        onChange={(e, v) => getCountry(v)}
        // open={open}
        // inputValue="global"
        // getOptionSelected={(o, v) => o.selectedCountry === v.selectedCountry}
        disableClearable
        defaultValue={initial}
        loading={!open}
        classes={{
          option: classes.option,
        }}
        // autoHighlight
        getOptionLabel={(option) => option.Country_Region}
        renderOption={(option) => (
          <>
            <img src={option.img} className={classes.img} onError={(e) => e.target.src = 'https://via.placeholder.com/32/000000/text=""'} />
            {option.Country_Region}
            {/* <span>{countryToFlag(option.code)}</span> */}
            {/* {option.selectedCountry} ({option.code}) +{option.phone} */}
          </>
        )}

        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a Country"
            // placeholder="ss"
            variant="outlined"

            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  {/* {console.log(selectedCountry)} */}
                  <img src={selectedCountry.img} className={classes.img} onError={(e) => e.target.src = 'https://via.placeholder.com/32/000000/text=""'} />
                  {/* {selectedCountry.img} */}
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: (
                <React.Fragment>
                  {!open ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
}

export default SelectCountry;
