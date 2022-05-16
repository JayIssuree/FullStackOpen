import axios from 'axios'
const baseUrl = "/api/persons"

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
 }

const create = (contact) => {
    return axios.post(baseUrl, contact)
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