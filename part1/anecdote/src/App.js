import { useState } from 'react'

const Button = ({ eventHandler, text }) => {
  return (
    <button onClick={eventHandler}> { text } </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [index, setIndex] = useState(0)

  const generateRandomNumber = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 1)));
  }

  const countVotes = () => {
    let updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const mostVoted = () => {
    let mostVotedAnecdote = Math.max(...votes)
    return votes.indexOf(mostVotedAnecdote)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button eventHandler={countVotes} text={"vote"}/>
      <Button eventHandler={generateRandomNumber} text={"next anecdote"}/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted()]}</p>
      <p>has {votes[mostVoted()]} votes.</p>
    </div>
  )
}

export default App
