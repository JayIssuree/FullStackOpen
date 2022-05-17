require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.static('build'))

const cors = require('cors');
var morgan = require('morgan');
morgan.token('body', (req, res) => JSON.stringify(req.body))

const Contact = require('./models/contact')

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());

app.get('/api/persons', (req, res) => {
    Contact.find({})
        .then(result => res.json(result))
});

app.get('/info', (req, res) => {
    Contact.find({})
        .then(result => {
            const numberOfPeople = result.length;
            const date = Date();
            const numberOfPeopleHTML = `<p> Phonebook has info for ${numberOfPeople} people </p>`;
            const dateHTML = `<p> ${date} </p>`;
            return(numberOfPeopleHTML + dateHTML);
        })
        .then(HTML => res.send(HTML))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Contact.findById(id)
        .then(result => {
            if(result){
                res.json(result)
            } else {
                res.sendStatus(404)
            }
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Contact.deleteOne({_id: id})
        .then(result => res.sendStatus(204))
        .catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
    const newContact = new Contact({
        name: req.body.name,
        number: req.body.number
    });
    newContact.save()
        .then(result => res.json(result))
});

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const newNumber = req.body.number
    Contact.findByIdAndUpdate(id, {number: newNumber}, {new: true})
        .then(result => {
            return res.json(result)
        })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
