// Import Modules - JOI, JOI object ID and Mongoose
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');

// Create Mongoose Anime Schema
const Schema = mongoose.Schema;
const animeSchema = new Schema({
  name: {type: String, required: true, minLength: 3, maxLength: 50},
  genre: {type: String, required: true, minLength: 3, maxLength: 50},
  quote: {type: String, required: true, minLength: 3, maxLength: 1000},
  author: {type: Schema.Types.ObjectID, ref: 'Author', required: true},
})

// JOI validation for Anime
function validateAnime(Anime){
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    genre: Joi.string().min(3).max(50).required(),
    quote: Joi.string().min(3).max(1000).required(),
    author: Joi.objectId(),
    id: Joi.any(),
  })
  return schema.validate(Anime)
}

// Export Mongoose Model AnimeModel and ValidateAnime
module.exports.AnimeModel = mongoose.model('Anime', animeSchema)
module.exports.validateAnime = validateAnime
