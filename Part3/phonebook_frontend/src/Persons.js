const Persons = ({contacts, deleteContact}) => {
    return(
        contacts.map((contact, index) => <p key={index + 1}> {contact.name} {contact.number} <button onClick={() => deleteContact(contact.id)}> delete </button> </p>)
    )
}

export default Persons