const redis = require('../index')

module.exports = {
  cache: (req, res, next) => {
    const { id } = req.params

    return redis.get(id, (err, cached) => {
      if (err)
        return next(err)

      if (cached)
        req.cached = cached
      next()
    })
  }
}