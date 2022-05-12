import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchValue, setNewSearchValue] = useState('')
  const [shownContacts, setNewShownContacts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
        setNewShownContacts(response.data)
      })
  }, [])

  const addContact = (event)  => {
    event.preventDefault()
    if(!persons.filter(person => person.name === newName).length > 0){
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewShownContacts(shownContacts.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearchValue(event.target.value)
    if(event.target.value.length !== 0){
      setNewShownContacts(persons.filter(person => person.name.includes(newSearchValue)))
    } else {
      setNewShownContacts(persons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearchValue} onChange={handleSearchChange} />
      <h3> Add a new </h3>
      <PersonForm 
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
        formSubmit={addContact}
      />
      <h2>Numbers</h2>
      <Persons contacts={shownContacts}/>
    </div>
  )
}

export default App