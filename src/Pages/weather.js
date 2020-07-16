import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import API from '../Utils/API';



function Weather() {

    const [search, setSearch] = useState();
    const [weather, setWeather] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        citySearch(search)
    }

    const citySearch = search => {
        async function fetchData() {


            const searchRes = await API.getWeather(search)

            const uvRes = await API.getUV(searchRes.data.coord.lat, searchRes.data.coord.lon)

            const fiveDayRes = await API.getFiveDay(searchRes.data.coord.lat, searchRes.data.coord.lon)

            console.log(fiveDayRes.data)
            setWeather(weather => (

                {
                    ...weather,
                    name: searchRes.data.name,
                    temp: searchRes.data.main.temp,
                    humidity: searchRes.data.main.humidity,
                    wind: searchRes.data.wind.speed,
                    icon: `https://openweathermap.org/img/w/${searchRes.data.weather[0].icon}png`,
                    uvIndex: uvRes.data.value
                    // fiveday:


                }
            )
            )
        }
        fetchData()
    }




    return (
        <Container>
            <h1>What's the weather?</h1>
            <Grid container spacing={3} justify={"space-evenly"}>
                <Grid item md={3} xs={12}>
                    <h1>Search here</h1>
                    <input id="citySearch"
                        onChange={(event, value) => setSearch(document.getElementById("citySearch").value)} />
                    <button onClick={handleSubmit}>Search Cities</button>
                </Grid>

                <Grid item md={6} xs={12}>
                    <h1>Results</h1>


                    <div>
                        <p>{weather.name}</p>
                        <p>{weather.temp}</p>
                        <p>{weather.humidity}</p>
                        <p>{weather.wind}</p>
                        <p>{weather.uvIndex}</p>
                        <img src={weather.icon} />

                    </div>


                </Grid>
            </Grid>

        </Container>
    )
}

export default Weather
                    //         icon: `https://openweathermap.org/img/w/${icon}png`,
