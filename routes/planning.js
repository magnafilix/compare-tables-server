const planningCtrl = require('../controllers/planning')
const { cache } = require('../helpers/middlewares')

module.exports = router => {
  /**
   * CREATE planning
   */
  router
    .route('/planning')
    .post(planningCtrl.createOne)

  /**
   * READ all plannings
   */
  router
    .route('/planning/all')
    .get(planningCtrl.readAll)

  /**
   * READ planning by id
   */
  router
    .route('/planning/:id')
    .all(cache)
    .get(planningCtrl.readOne)

  /**
   * UPDATE planning by id
   */
  router
    .route('/planning/:id')
    .patch(planningCtrl.updateOne)

  /**
   * DELETE planning by id
   */
  router
    .route('/planning/:id')
    .delete(planningCtrl.deleteOne)
}