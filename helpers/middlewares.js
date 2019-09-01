const Cache = require('../services/cache')
const { joiValidate } = require('../services/validationSchemas')

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

  validate: schema => (req, res, next) => {
    const { body } = req
    const { error } = joiValidate(body, schema)

    if (error)
      return res
        .status(BadRequest.code)
        .send(error.details.map(d => d.message).join(', ') || BadRequest.message)

    next()
  }
}