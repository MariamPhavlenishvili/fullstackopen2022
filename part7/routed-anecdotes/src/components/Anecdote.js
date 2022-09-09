import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))
    return (
      <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see {anecdote.info}</p>
      </div>
    )
}

export default Anecdote