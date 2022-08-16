import Country from "./Country"

const Content = ({ filteredData, setCountries }) => {
    if (filteredData.length === 0) {
        return;
    }

    if (filteredData.length > 10) {
        return <p> Too many matches, specify another filter </p>
    }

    if (filteredData.length > 2 && filteredData.length <= 10) {
        return (
            <>
                {filteredData.map((country, i) =>
                    <div key={i}> {country.name.common}
                        <button onClick={() => setCountries(country)}>show</button>
                    </div>
                )}
            </>
        )
    } else {
        const country = filteredData.length > 1 ? filteredData[0] : filteredData
        return (
            <Country country={country} />
        )
    }

}

export default Content