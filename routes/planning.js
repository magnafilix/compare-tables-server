const planningCtrl = require('../controllers/planning')
const { cache, validate } = require('../helpers/middlewares')
const { schemas } = require('../services/validationSchemas')

module.exports = router => {
  /**
   * CREATE planning
   */
  router
    .post('/planning', validate(schemas.planningPost), planningCtrl.createOne)

  /**
   * READ all plannings
   */
  router
    .get('/planning/all', planningCtrl.readAll)

  /**
   * READ planning by id
   */
  router
    .get('/planning/:id', cache, planningCtrl.readOne)

  /**
   * UPDATE planning by id
   */
  router
    .patch('/planning/:id', cache, planningCtrl.updateOne)

  /**
   * DELETE planning by id
   */
  router
    .delete('/planning/:id', cache, planningCtrl.deleteOne)
}