import { useState, useEffect } from 'react'

// import services
import personService from './services/personInfo'

// import components
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [userInput, setUserInput] = useState({
    newName: '',
    newNumber: ''
  })
  const [searchResult, setSearchResult] = useState('')
  const [message, setMessage] = useState({
    status: null,
    message: null
  })

  // fetch data from json
  useEffect(() => {
    personService
      .getAll()
      .then(usersInfo => {
        setPersons(usersInfo)
      })
  }, [])

  // search person's number
  const searchNumber = (event) => {
    const searchPerson = event.target.value;
    const newPersons = persons.filter(
      (person) =>
        person.name.toLowerCase() !== searchPerson.toLowerCase()
    );

    if (newPersons) {
      setSearchResult('User not found!')
    } else {
      console.log(persons.name === newPersons)
    }
    // setPersonsFilter(newPersons);
  }

  // add new contact or update
  const addName = (event) => {
    event.preventDefault()

    const person = persons.filter((p) => p.name === event.target.name.value)

    if (person.length === 0) {
      const addPerson = {
        name: userInput.newName,
        number: userInput.newNumber
      }
      personService
        .create(addPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setMessage({
            status: 'success',
            message: `Added ${addPerson.name}`
          })
        })
      setTimeout(() => {
        setMessage({
          status: null,
          message: null
        })
      }, 5000)
    }

    if (person.length !== 0) {
      const p = person[0]
      const changedPersonInfo = { ...p, number: event.target.number.value }

      const message = `${changedPersonInfo.name} is already added to phone book, replace old number with a new one?`

      if (window.confirm(message)) {
        personService
          .update(changedPersonInfo.id, changedPersonInfo)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPersonInfo.id ? person : returnedPerson))
            setMessage({
              status: 'success',
              message: `Updated ${changedPersonInfo.name}`
            })
          })
        setTimeout(() => {
          setMessage({
            status: null,
            message: null
          })
        }, 5000)
      }
    }
  }

  // delete contact
  const onDelete = (id) => {
    const person = persons.filter((person) => person.id === id)
    const message = `Delete ${person[0].name}?`

    if (window.confirm(message)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setMessage({
            status: 'error',
            message: `Information of '${person[0].name}' has already removed from server`
          })
          setTimeout(() => {
            setMessage({
              status: null,
              message: null
            })
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const data = {
    addName,
    userInput,
    setUserInput
  }

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter onChange={searchNumber} />
      <h2>Add a new</h2>
      <PersonForm data={data} />
      <h2>Numbers</h2>
      <Persons persons={persons} onDelete={onDelete} />
    </div>
  )
}

export default App