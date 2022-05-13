import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
 }

const create = (concact) => {
    return axios.post(baseUrl, concact)
        .then(response => response.data)
}

const updateNumber = (id, updatedContact) => {
    return axios.put(`${baseUrl}/${id}`, updatedContact)
        .then(response => response.data)
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

const exportedObject = {
    getAll,
    create,
    updateNumber,
    deleteContact
}

export default exportedObject