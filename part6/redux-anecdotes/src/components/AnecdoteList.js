import { useSelector, useDispatch } from 'react-redux'
import { update } from '../reducers/anecdoteReducer'
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {

    const anecdotes = useSelector(state => 
        state.filter
            ? state.anecdotes.filter((anecdote) => 
              anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
            : state.anecdotes
    )

    const dispatch = useDispatch()

    const votes = (anecdote) => {
        dispatch(update(anecdote))
        dispatch(createNotification(`You voted '${anecdote.content}'`, 5));
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => votes(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
    
}

export default AnecdoteList