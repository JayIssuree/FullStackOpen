import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchValue, setNewSearchValue] = useState('')
  const [shownContacts, setNewShownContacts] = useState(persons)

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