const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.connect(url)
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: (num) => {
      if(num.indexOf('-') === 2 || num.indexOf('-') === 3){
        num = num.split('-')
        if(num.length !== 2){
          return false
        } else {
          return num[0].length + num[1].length > 7
        }
      } else if(num.includes('-')){
        return false
      }
      return true
    }
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)