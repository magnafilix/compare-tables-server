const planningCtrl = require('../controllers/planning')

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