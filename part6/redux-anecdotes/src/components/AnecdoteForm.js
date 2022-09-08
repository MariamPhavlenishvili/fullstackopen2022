import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { createNotification } from "../reducers/notificationReducer";


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = async (e) => {
        e.preventDefault()
        dispatch(create(e.target.anecdote.value))
        dispatch(createNotification(`New anecdote added: ${e.target.anecdote.value}`, 5));
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div> 
                    <input name="anecdote"/>
                </div>
                <button type="submit"> create </button>
            </form>
        </div>
    )
}

export default AnecdoteForm