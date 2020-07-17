import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import API from '../Utils/API';



function Weather() {

    const [search, setSearch] = useState();
    const [weather, setWeather] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        citySearch(search)
    }

    const citySearch = search => {
        async function fetchData() {
            let fiveDayArray = await []
            const searchRes = await API.getWeather(search)
            const uvRes = await API.getUV(searchRes.data.coord.lat, searchRes.data.coord.lon)
            const fiveDayRes = await API.getFiveDay(searchRes.data.coord.lat, searchRes.data.coord.lon)
            // need a systematic comparison of browser time to array time
            for (let index of fiveDayRes.data.list) {

                fiveDayArray.push(
                    {
                        time: index.dt_txt,
                        temp: index.main.temp
                    }
                )
            }



            setWeather([
                ...weather,
                {

                    name: searchRes.data.name,
                    temp: searchRes.data.main.temp,
                    humidity: searchRes.data.main.humidity,
                    wind: searchRes.data.wind.speed,
                    icon: `https://openweathermap.org/img/w/${searchRes.data.weather[0].icon}.png`,
                    uvIndex: uvRes.data.value,
                    fiveDay: fiveDayArray
                }
            ])
            console.log()
        }
        fetchData()
    }




    return (
        <Container>
            <h1>What's the weather?</h1>
            <Grid container spacing={3}>
                <Grid item md={2} xs={12}>
                    <h1>Search here</h1>
                    <input id="citySearch"
                        onChange={(event, value) => setSearch(document.getElementById("citySearch").value)} />
                    <button onClick={handleSubmit}>Search Cities</button>
                </Grid>
                <Grid item md={10} xs={12}>
                    <h1>Results</h1>
                    {weather.map(x =>
                        <Grid item md={12} xs={12} >

                            <p>{x.name}</p>
                            <p>{x.temp}</p>
                            <p>{x.humidity}</p>
                            <p>{x.wind}</p>
                            <p>{x.uvIndex}</p>
                            <img src={x.icon} />

                        </Grid>
                    )}
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item md={2} />
                <Grid item md={10} xs={12}>
                    <Grid container spacing={3}>
                        {weather.map(x =>
                            x.fiveDay.map(y => (
                                <Grid item xs={2}>
                                    <Card>
                                        <p>{y.time}</p>
                                        <p>{y.temp}</p>
                                    </Card>
                                </Grid>
                            )
                            )

                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}

export default Weather
