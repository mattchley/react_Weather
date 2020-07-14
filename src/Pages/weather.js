import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import API from '../Utils/API';



function Weather() {
    useEffect(() => {
        API.getWeather('San Diego')
        .then(res =>{
            console.log(res.data)
        })
    }, [])

    return (
        <Container>
            <h1>What's the weather?</h1>
            <Grid container spacing={3} justify={"space-evenly"}>
                <p>here</p>
            </Grid>

        </Container>
    )
}

export default Weather