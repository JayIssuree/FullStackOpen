const PersonForm = ({nameValue, onNameChange, numberValue, onNumberChange, formSubmit}) => {
    
    return(
        <form>
            <div>name: <input value={nameValue} onChange={onNameChange} /></div>
            <div>number: <input value={numberValue} onChange={onNumberChange} /></div>
            <button onClick={formSubmit} type="submit">add</button>
        </form>
    )
}

export default PersonForm