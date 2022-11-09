// Import Modules - JOI and Mongoose
const Joi = require('joi')
const mongoose = require('mongoose');

// Create Mongoose Author Schema
const Schema = mongoose.Schema;
const authorSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 30 },
  age: { type: Number, required: true, minLength: 1, maxLength: 130 },
})

// JOI validation for Author
function validateAuthor(Author) {
  const schema = Joi.object({
    id: Joi.any(),
    name: Joi.string().min(2).max(30).required(),
    age: Joi.number().min(1).max(130).required(),
  })
  return schema.validate(Author)
}

// Export Mongoose Model AuthorModel and ValidateAuthor
module.exports.AuthorModel = mongoose.model('Author', authorSchema)
module.exports.validateAuthor = validateAuthor