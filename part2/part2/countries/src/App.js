import axios from "axios";
import React, { useState, useEffect } from "react";
import Content from "./components/Content";

// import components
import Filter from "./components/Filter";


function App() {
  const [countries, setCountries] = useState('');
  const [allCountries, setAllCountries] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)

      })
  }, [])

  const handleFilter = (event) => {
    const searchedData = event.target.value
    const filteredCountries = () => allCountries.filter(country =>
      country.name.common.toLowerCase().includes(searchedData.toLowerCase()))
    setCountries(filteredCountries)
  }

  return (
    <div>
      <Filter onChange={handleFilter} />
      <Content filteredData={countries} setCountries={setCountries} />
    </div>
  );
}

export default App;
