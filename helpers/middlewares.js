const Cache = require('../services/cache')

module.exports = {
  cache: async (req, res, next) => {
    const { id } = req.params

    Cache
      .get(id)
      .then(cached => {
        req.cached = cached
        next()
      })
      .catch(err => next(err))
  }
}