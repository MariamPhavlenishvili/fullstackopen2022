import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateVotes(state, action) {
      const updatedAnecdote = action.payload
      const id = updatedAnecdote.id
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );  
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { updateVotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const create = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const update = (anecdote) => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.update(anecdote)
    dispatch(updateVotes(updateAnecdote))
  }
}
