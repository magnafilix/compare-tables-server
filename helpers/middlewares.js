const Cache = require('../services/cache')

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
      .catch(err => next(err))
  }
}