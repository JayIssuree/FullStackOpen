const Persons = ({contacts}) => contacts.map(contact => <p> {contact.name} {contact.number} </p>)

export default Persons