const Joi = require('joi')

const planningLevelsSchema = Joi.object(
  {
    levelName: Joi.string().required()
  }
).pattern(/FTE_\d{4}$/, Joi.alternatives().try(Joi.number()))

const demSupSchema = Joi.object().keys(
  {
    tableName: Joi.string().required(),
    planningLevels: Joi.array().items(planningLevelsSchema)
  }
)

module.exports = {
  schemas: {
    planningPost: Joi.object().keys(
      {
        planningName: Joi.string().required(),
        planningDemand: Joi.array().items(demSupSchema),
        planningSupply: Joi.array().items(demSupSchema)
      }
    )
  },
  joiValidate: (body, schema) => Joi.validate(body, schema)
}