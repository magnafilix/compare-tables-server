const Planning = require('../models/planning')
const {
  OK,
  Created,
  NoContent,
  BadRequest,
  NotFound,
  UnprocessableEntity,
  InternalServerError
} = require('../constants/httpResponses')

const redis = require('../index')

module.exports = {
  createOne: async (req, res) => {
    try {
      const {
        planningName = '',
        planningDemand = [],
        planningSupply = []
      } = req.body

      if (!planningName || !planningDemand.length || !planningSupply.length)
        return res.status(BadRequest.code).send(BadRequest.message)

      const existingPlanning = await Planning.findOne({ planningName })
      if (existingPlanning)
        return res.status(UnprocessableEntity.code).send(UnprocessableEntity.message)

      return Planning
        .create({ planningName, planningDemand, planningSupply })
        .then(() => res.status(Created.code).send(Created.message))
        .catch(err => res.status(InternalServerError.code).send(err.message || InternalServerError.message))

    } catch (err) {
      throw new Error(err)
    }
  },

  readAll: (req, res) => Planning
    .find()
    .then(plannings => res.status(OK.code).send(plannings))
    .catch(err => res.status(NotFound.code).send(err.message || NotFound.message)),

  readOne: (req, res) => {
    const { id } = req.params

    return redis.get(id, (err, cached) => {
      if (err)
        return res
          .status(InternalServerError.code)
          .send(err.message || InternalServerError.message)

      if (cached)
        return res
          .status(OK.code)
          .send(JSON.parse(cached))

      return Planning
        .findById(id)
        .then(planning => {
          redis.set(id, JSON.stringify(planning), 'EX', 30)
          return res.status(OK.code).send(planning)
        })
        .catch(error => res.status(NotFound.code).send(error.message || NotFound.message))
    })
  },

  updateOne: (req, res) => { },

  deleteOne: (req, res) => {
    const { id = '' } = req.params

    if (!id)
      return res.status(BadRequest.code).send(BadRequest.message)

    return Planning
      .findByIdAndRemove({ _id: id })
      .then(() => res.status(NoContent.code).send(NoContent.message))
      .catch(err => res.status(NotFound.code).send(err.message || NotFound.message))
  }
}