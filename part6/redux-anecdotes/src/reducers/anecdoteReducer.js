const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
// const sorted = initialState.sort((a,b) => b.votes - a.votes);

const reducer = (state = initialState, action) => {
  state.sort((a,b) => (b.votes - a.votes));

  switch (action.type) {
    case 'UPDATE_VOTES':
      const anecdote = state.filter(anec => anec.id === action.data.id)
      const updated = {...anecdote[0], votes: anecdote[0].votes += 1}
      return [...state];

    case 'CREATE':
      return [...state, action.data]
    case 'BAD':
      return { ...state, bad: state.bad + 1 };
    case 'ZERO':
      return initialState
    default: return state
  }
}

export const updateVotes = (id) => {
  return {
    type: 'UPDATE_VOTES',
    data: { id }
  }
}

export const create = (content) => {
  return {
    type: 'CREATE',
    data: asObject(content)
  }
}

export default reducer