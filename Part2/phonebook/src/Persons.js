const Persons = ({contacts}) => contacts.map((contact, index) => <p key={index + 1}> {contact.name} {contact.number} </p>)

export default Persons