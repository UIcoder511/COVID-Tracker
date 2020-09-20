import React, { useContext, useEffect, useState } from 'react'
import CanvasJSReact from "./Config/canvasjs.react";
import the from '@material-ui/core/styles/defaultTheme';
// import defaultTheme from '@material-ui/core/styles/defaultTheme';

import CountryContext from "./Context/CountryContext";
import axios from "axios";

import { nameConvert } from './Util'

const CanReact = CanvasJSReact
// const CanJS = CanReact.CanvasJS;

let curdate = new Date()
curdate.setDate(curdate.getDate() - 1)
let yesterday = curdate.getDate();


function LineGraph() {

    const { open, selectedStats, globalTimeline, country } = useContext(CountryContext);



    const [timelinedata, settimelinedata] = useState([])



    const getGraphData = (gtimeline) => {

        const data = gtimeline.filter(gl => {
            // console.log(gl)
            if (!gl.Country) {
                const day = gl.date.split('-')
                return (parseInt(day[2]) % 10) === 0 || parseInt(day[2]) === yesterday
            }
            else {
                const day = gl.Date.split('-')
                return ((parseInt(day[1]) % 10) === 0) || parseInt(day[1]) === yesterday
            }

        })
            .map(d => {
                console.log(d)
                if (!d.Country) {
                    return {
                        x: new Date(d.date),
                        y: d[nameConvert(selectedStats)]
                    }
                }
                else {
                    return {
                        x: new Date(d.Date),
                        y: d[selectedStats]
                    }
                }


            })
        // console.log(data)
        settimelinedata(data)

    }

    useEffect(() => {
        // console.log(globalTimeline)
        if (open) {
            if (country.Country_Region === 'Global') {
                // console.log('here')
                getGraphData(globalTimeline)

            }
            else {
                const getCountryTimeline = {
                    query: `{
                    timelineCountry(country:"${country.Code}") {
                        Country
                        Date
                        Confirmed
                        Recovered
                        Deaths   
                      }
                }`,
                };

                axios.post('https://api-corona.azurewebsites.net/graphql', getCountryTimeline)
                    .then((response) => {
                        // console.log(response.data.data.timelineCountry)
                        getGraphData(response.data.data.timelineCountry)
                        // settimelinedata(response.data.data.country.Summary);
                        //console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            }

        }







    }, [country, globalTimeline, selectedStats])

    const options = {
        animationEnabled: true,
        theme: 'dark1',

        backgroundColor: "#424242",
        // fontColor: 'red',
        // colorSet: 'primary',
        title: {
            text: selectedStats,
            fontFamily: the.typography.fontFamily,
            // fontSize: '2rem'
            fontSize: 20,
        },
        axisX: {
            valueFormatString: "MMM"
        },

        data: [{
            yValueFormatString: "#,###",
            xValueFormatString: "DD MMMM YYYY",
            lineColor: the.palette.primary.main,
            type: "spline",
            // dataPoints: [
            //     { x: new Date(2017, 0, 1), y: 25060 },
            //     { x: new Date(2017, 0, 2), y: 25060 },
            //     { x: new Date(2017, 0, 3), y: 25060 },
            //     { x: new Date(2017, 0, 4), y: 25060 },
            //     { x: new Date(2017, 1, 5), y: 27980 },
            //     { x: new Date(2017, 2, 21), y: 42800 },
            //     { x: new Date(2017, 3, 15), y: 32400 },
            //     { x: new Date(2017, 4, 12), y: 35260 },
            //     { x: new Date(2017, 5, 10), y: 33900 },
            //     { x: new Date(2017, 6, 2), y: 40000 },
            //     { x: new Date(2017, 7, 19), y: 52500 },
            //     { x: new Date(2017, 8, 6), y: 32300 },
            //     { x: new Date(2017, 9, 7), y: 42000 },
            //     { x: new Date(2017, 10, 5), y: 37160 },
            //     { x: new Date(2017, 11, 1), y: 38400 }
            // ]
            dataPoints: timelinedata
        }]
    }

    return (
        <div>
            {timelinedata && <CanReact.CanvasJSChart options={options} />}
        </div>
    )
}

export default LineGraph
