const Joi = require("joi");

const noteSchema = Joi.object({
  title: Joi.string().max(500).required(),
  content: Joi.string().max(5000).required()
});

module.exports = noteSchema;