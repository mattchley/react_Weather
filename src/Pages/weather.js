import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import API from '../Utils/API';



function Weather() {

    const [search, setSearch] = useState();
    const [weather, setWeather] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        citySearch(search)
    }

    const citySearch = search => {
        API.getWeather(search)
            .then(res => {
                console.log(res.data)
                let name = res.data.name;
                let temp = res.data.main.temp
                let humidity = res.data.main.humidity
                let wind = res.data.wind.speed;
                let icon = res.data.weather[0].icon;
                let iconURL = `https://openweathermap.org/img/w/${icon}png`

                setWeather([
                    ...weather,
                    {
                        
                        name: name,
                        temp: temp,
                        humidity: humidity,
                        wind: wind,
                        iconURL: iconURL
                    }
                ])

                //  //    UV is a seperate call, Variables here
                //  let lat = res.coord.lat;
                //  let lon = res.coord.lon;
                //  let uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=3a92bc0a0ca29575a3569a00c0268022&lat=${lat}&lon=${lon}`;
                // setWeather(res.data)
            })
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

                    {weather.map(x =>
                        <div>
                            <p>{x.name}</p>
                            <p>{x.temp}</p>
                            <p>{x.humidity}</p>
                            <p>{x.wind}</p>
                            <img src={x.iconURL} />
                        </div>
                    )}

                </Grid>
            </Grid>

        </Container>
    )
}

export default Weather