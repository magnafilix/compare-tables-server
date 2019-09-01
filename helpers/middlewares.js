const Cache = require('../services/cache')
const { schemas, joiValidate } = require('../services/validationSchemas')

const {
  BadRequest,
  NotFound
} = require('../constants/httpResponses')

module.exports = {
  cache: (req, res, next) => {
    const { method, params: { id = '' } } = req

    Cache
      .get(id)
      .then(cached => {
        if (cached && method === 'GET')
          return res.send(JSON.parse(cached))

        req.cached = cached
        next()
      })
      .catch(err => res.status(NotFound.code).send(err.message || NotFound.message))
  },

  validate: (req, res, next) => {
    const { body } = req
    const { error } = joiValidate(body, schemas.planningPost)

    if (error)
      return res
        .status(BadRequest.code)
        .send(error.details || BadRequest.message)

    next()
  }
}