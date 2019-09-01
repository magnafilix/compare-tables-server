const redis = require('../index')
const util = require('util')

class Cache {
  constructor() {
    this.cache = redis
    this.ttl = 60 * 60 * 1 // 1 hour
  }

  get(key) {
    const getAsync = util.promisify(this.cache.get).bind(this.cache)

    return getAsync(key)
      .then(value => value)
      .catch(err => err)
  }

  set(key, value) {
    return this.cache.setex(key, this.ttl, JSON.stringify(value))
  }

  delete(key) {
    return this.cache.del(key)
  }
}

module.exports = new Cache()