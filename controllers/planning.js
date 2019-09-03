const Planning = require('../models/planning')
const Cache = require('../services/cache')
const {
  OK,
  Created,
  NoContent,
  BadRequest,
  NotFound,
  UnprocessableEntity,
  InternalServerError
} = require('../constants/httpResponses')

module.exports = {
  createOne: async (req, res) => {
    try {
      const {
        planningName = '',
        planningDemand = [],
        planningSupply = []
      } = req.body

      const planningExists = await Planning.findOne({ planningName })
      if (planningExists)
        return res
          .status(UnprocessableEntity.code)
          .send(UnprocessableEntity.message)

      return Planning
        .create({ planningName, planningDemand, planningSupply })
        .then(() => res.status(Created.code).send(Created.message))
        .catch(err => res.status(InternalServerError.code).send(err.message || InternalServerError.message))

    } catch (err) {
      res
        .status(InternalServerError.code)
        .send(err.message || InternalServerError.message)
    }
  },

  readAll: (req, res) => Planning
    .find()
    .then(plannings => res.status(OK.code).send(plannings))
    .catch(err => res.status(NotFound.code).send(err.message || NotFound.message)),

  readOne: (req, res) => {
    const { params: { id = '' } } = req

    return Planning
      .findById(id)
      .then(planning => {
        Cache.set(id, planning)
        return res.status(OK.code).send(planning)
      })
      .catch(error => res.status(NotFound.code).send(error.message || NotFound.message))
  },

  // TODO - Add Update Logic, include Redis update
  updateOne: (req, res) => { },

  deleteOne: (req, res) => {
    const { cached = null, params: { id = '' } } = req

    if (cached) Cache.delete(id)

    return Planning
      .findByIdAndRemove({ _id: id })
      .then(() => res.status(NoContent.code).send(NoContent.message))
      .catch(err => res.status(NotFound.code).send(err.message || NotFound.message))
  }
}