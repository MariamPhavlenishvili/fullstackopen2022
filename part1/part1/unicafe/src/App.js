import React, { useState } from "react"

// Header
const Header = ({ title }) => {
  return (
      <h1>{title}</h1>
  )
}

// Buttons for submitting data
const Button = ({handleClick, title}) => {
  return (
      <button onClick={handleClick}> { title } </button>
  )
}

// displays single statistic
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

// Statistics info
const Statistics = ({ data : { good, neutral, bad } }) => {
  const total = good + neutral + bad;
  const average = good < 0 || bad < 0 ? 0 : ((good - bad) / total).toFixed(2);
  const positive = good < 0 ? "0%" : Math.round((good / total) * 100) + "%";

  if (total === 0) {
      return (
          <div>
              <p><strong>No feedback given</strong></p>
          </div>
      )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="total" value ={total} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title={'give feedback'}/>
      <Button handleClick={() => setGood(good + 1)} title={"good"}/>
      <Button handleClick={() => setNeutral(neutral + 1)} title={"neutral"}/>
      <Button handleClick={() => setBad(bad + 1)} title={"bad"}/>
      <Header title={'statistics'}/>
      <Statistics data={{ good, neutral, bad }}/>
    </div>
  )
}

export default App