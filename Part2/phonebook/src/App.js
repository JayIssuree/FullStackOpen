import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import PhonebookService from './PhonebookService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchValue, setNewSearchValue] = useState('')
  const [shownContacts, setNewShownContacts] = useState([])

  useEffect(() => {
    PhonebookService.getAll()
      .then(result => {
        setPersons(result)
        setNewShownContacts(result)
      })
  }, [])

  const addContact = (event)  => {
    event.preventDefault()
    if(!persons.filter(person => person.name === newName).length > 0){
      PhonebookService.create({name: newName, number: newNumber})
        .then(result => {
            setPersons(persons.concat(result))
            setNewShownContacts(shownContacts.concat(result))
          })
      setNewName('')
      setNewNumber('')
    } else {
      updateNumber()
    }
  }

  const updateNumber = () => {
    const foundPerson = persons.find(person => person.name === newName)
    if(window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)){
      PhonebookService.updateNumber(foundPerson.id, {name: newName, number: newNumber})
        .then(response => {
          setPersons(persons.map(person => person.id !== foundPerson.id ? person : response))
          setNewShownContacts(persons.map(person => person.id !== foundPerson.id ? person : response))
          setNewName('')
          setNewNumber('')
        })
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

  const handleDelete = (contactId) => {
    const person = persons.find(person => person.id === contactId)
    if(window.confirm(`Do you want to delete ${person.name}?`)){
      PhonebookService.deleteContact(contactId)
      setPersons(persons.filter(person => person.id !== contactId))
      setNewShownContacts(shownContacts.filter(person => person.id !== contactId))
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
      <Persons contacts={shownContacts} deleteContact={handleDelete} />
    </div>
  )
}

export default App