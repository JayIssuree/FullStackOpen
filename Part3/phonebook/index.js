const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
var morgan = require('morgan');
morgan.token('body', (req, res) => JSON.stringify({name: req.body.name, number: req.body.number}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(notes);
});

app.get('/info', (req, res) => {
    const numberOfPeople = notes.length;
    const date = Date();
    const numberOfPeopleHTML = `<p> Phonebook has info for ${numberOfPeople} people </p>`;
    const dateHTML = `<p> ${date} </p>`;
    res.send(numberOfPeopleHTML + dateHTML);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = notes.find(person => person.id === id);
    if(person){
        res.json(person);
    } else {
        res.status(404).send("Person not found");
    };
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(person => person.id != id);
    res.redirect('/api/persons')
});

app.post('/api/persons', (req, res) => {
    const newPerson = {
        id: Math.floor(Math.random() * Number(req.body.id)),
        name: req.body.name,
        number: req.body.number
    };
    if(!newPerson.name || !newPerson.number){
        return res.status(400).send("Missing a name or number");
    } else if(notes.find(person => person.name === newPerson.name)){
        return res.status(400).send("Person already exists");
    };
    notes = notes.concat(newPerson);
    res.redirect('/api/persons');
});

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});