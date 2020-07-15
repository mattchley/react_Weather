import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import API from '../Utils/API';



function Weather() {

    const [search, setSearch] = useState();
    const [weather, setWeather] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        citySearch(search)
    }

    const citySearch = search =>{
        API.getWeather(search)
            .then(res => {
                console.log(res.data)
                setWeather(res.data.name)
            })
    }

    return (
        <Container>
            <h1>What's the weather?</h1>
            <Grid container spacing={3} justify={"space-evenly"}>
                <Grid item md={3} xs={12}>
                    <h1>Search here</h1>
                    <input id="citySearch" onChange={(event, value) => setSearch(document.getElementById("citySearch").value)}></input>
                    <button onClick={handleSubmit}>Search Cities</button>
                </Grid>

                <Grid item md={6} xs={12}>
                    <h1>Results</h1>
                    <p>{weather}</p>
                </Grid>
            </Grid>

        </Container>
    )
}

export default Weather