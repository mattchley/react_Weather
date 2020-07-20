import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import API from '../Utils/API';



function Weather() {

    const [search, setSearch] = useState();
    const [weather, setWeather] = useState({
        name: '',
        temp: '',
        humidity: '',
        wind: '',
        icon: '',
        uvIndex: '',
        fiveDay: []
    });
    const [searched, setSearched] = useState([])

    const handleSubmit = e => {
        e.preventDefault()
        citySearch(search)
    }

    const handleNewSubmit = e => {
        e.preventDefault()
        const newSearch = e.target.getAttribute("name")
        console.log(e)
        citySearch(newSearch)
    }

    const handleDelete = e => {
        e.preventDefault()
        const name = e.target.getAttribute("name");
        setSearched(searched.filter(searched => searched.name !== name))
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
                        key: index.dt,
                        time: index.dt_txt,
                        temp: index.main.temp
                    }
                )
            }


            setSearched([
                ...searched,
                {
                    name: searchRes.data.name
                }
            ])
            setWeather(
                {

                    name: searchRes.data.name,
                    temp: searchRes.data.main.temp,
                    humidity: searchRes.data.main.humidity,
                    wind: searchRes.data.wind.speed,
                    icon: `https://openweathermap.org/img/w/${searchRes.data.weather[0].icon}.png`,
                    uvIndex: uvRes.data.value,
                    fiveDay: fiveDayArray
                }
            )

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
                    <Grid container spacing={1}>
                        {/* need a button to be able to click and search previous */}
                        {searched.length ? (
                            <div>
                                {
                                    searched.map(x =>
                                        <div>

                                            <button
                                                name={x.name}
                                                onClick={handleNewSubmit}
                                            >
                                                {x.name}
                                            </button>
                                            <button
                                                name={x.name}
                                                onClick={handleDelete}
                                            >
                                                Delete
                                                </button>

                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                                <p>Which city will you search?</p>
                            )}
                    </Grid>
                </Grid>
                <Grid item md={10} xs={12}>
                    <h1>Results</h1>
                    {/* make this pretty */}
                    <Grid item md={12} xs={12}>
                        <p>{weather.name}</p>
                        <p>{weather.temp}</p>
                        <p>{weather.humidity}</p>
                        <p>{weather.wind}</p>
                        <p>{weather.uvIndex}</p>
                        <img src={weather.icon} />

                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item md={2} />
                <Grid item md={10} xs={12}>
                    <Grid container spacing={3}>
                        {/* filter out every7 indexs */}
                        {weather.fiveDay.length ? (
                            weather.fiveDay.map(y => (
                                <Grid item xs={2}>
                                    <Card key={y.key}>
                                        <p>{y.time}</p>
                                        <p>{y.temp}</p>
                                    </Card>
                                </Grid>
                            ))) : (
                                <Grid item xs={12}>
                                    <Card>
                                        Five Day Forecast Here
                                    </Card>
                                </Grid>
                            )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Weather
