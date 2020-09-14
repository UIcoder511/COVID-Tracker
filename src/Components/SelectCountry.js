import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

import Config from "./Config/APIconfig";

import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "50%",
  },
  option: {},
});

const data = {
  query: `{
      countriesCode {
        Country
      }
  }`,
};

function SelectCountry() {
  const [open, setopen] = useState(false);
  const [countries, setCountries] = useState([]);
  const initial = { Country: "Global" };
  const [country, setCountry] = useState(initial);
  const classes = useStyles();

  useEffect(() => {
    axios(Config(data))
      .then(function (response) {
        response.data.data.countriesCode.unshift(initial);
        const data = response.data.data.countriesCode;
        setCountries(data);
        setopen(true);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <Autocomplete
        className={classes.root}
        // value={}
        // fullWidth
        //  className={classes.autocomp}
        id="country-select"
        // style={{ width: 300 }}
        options={countries}
        onChange={(e, v) => setCountry(v)}
        // open={open}
        // inputValue="global"
        // getOptionSelected={(o, v) => o.Country === v.Country}
        disableClearable
        defaultValue={open ? countries[0] : { Country: "Global" }}
        loading={!open}
        classes={{
          option: classes.option,
        }}
        // autoHighlight
        getOptionLabel={(option) => option.Country}
        renderOption={(option) => (
          <>
            {option.Country}
            {/* <span>{countryToFlag(option.code)}</span> */}
            {/* {option.country} ({option.code}) +{option.phone} */}
          </>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            // placeholder="ss"
            variant="outlined"
            defaultValue="India"
            InputProps={{
              ...params.InputProps,
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
