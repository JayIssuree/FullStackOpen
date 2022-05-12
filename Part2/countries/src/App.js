import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [searchBar, setSearchBar] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  
  const handleSearch = (event) => {
    const search = event.target.value
    setSearchBar(search)
    setDisplayedCountries(countries.filter(country => country.name.common.includes(search)))
  }

  const displayCountries = () => {
    const countries = displayedCountries.map((country, index) => <p key={index + 1}> {country.name.common} </p>)
    if(countries.length > 10){
        return(<p> Too many matches, specify another filter </p>)
    } else if(countries.length === 1){
        return displayCountryInformation()
    } else {
        return(countries)
    }
  }

  const displayCountryInformation = () => {
    const country = displayedCountries[0];
    return(
      <div>
        <h1> {country.name.common} </h1>
        <p> Capital: {country.capital[0]} </p>
        <p> Area: {country.area} </p>
        <b> Languages: </b>
        {Object.keys(country.languages).map((key, index) => <li key={index + 1}> {country.languages[key]} </li>)}
        <img src={country.flags.png} alt="Countries flag" />
      </div>
    )
  }

  return(
    <div>
      Find countries: <input value={searchBar} onChange={handleSearch} />
      {displayCountries()}
    </div>
  )
}

export default App