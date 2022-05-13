import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({countryInformation}) => {

    const [wind, setWind] = useState({})
    const [temp, setTemp] = useState({})
    const [image, setImage] = useState("")

    useEffect(() => {
      const coordinates = countryInformation.capitalInfo.latlng
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${process.env.REACT_APP_OPEN_WEATHER_API}&units=metric`)
        .then(result => {
          setWind(result.data.wind)
          setTemp(result.data.main)
          setImage(`http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`)
        })
    }, [])

    return(
        <div>
            <h1> {countryInformation.name.common} </h1>
            <p> Capital: {countryInformation.capital[0]} </p>
            <p> Area: {countryInformation.area} </p>
            <b> Languages: </b>
            {Object.keys(countryInformation.languages).map((key, index) => <li key={index + 1}> {countryInformation.languages[key]} </li>)}
            <img src={countryInformation.flags.png} alt="Countries flag" />
            <h2> Weather in {countryInformation.capital} </h2>
            Temperature: {temp.temp} Celcius
            <div>
                <img src={image} alt="Weather icon"/>
            </div>
            Wind: {wind.speed} m/s
      </div>
    )

}

export default Country