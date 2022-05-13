import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'

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

  const handleShowCountry = (country) => {
    setDisplayedCountries([country])
  }

  const displayCountries = () => {
    const countries = displayedCountries.map((country, index) => <p key={index + 1}> {country.name.common} <button onClick={() => handleShowCountry(country)}> show </button></p>)
    if(countries.length > 10){
        return(<p> Too many matches, specify another filter </p>)
    } else if(countries.length === 1){
        return <Country countryInformation={displayedCountries[0]} />
    } else {
        return(countries)
    }
  }

  return(
    <div>
      Find countries: <input value={searchBar} onChange={handleSearch} />
      {displayCountries()}
    </div>
  )
}

export default App