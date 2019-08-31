const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlanningSchema = new Schema({
  planningName: {
    type: String,
    required: true
  },
  planningDemand: [
    {
      tableName: String,
      planningLevels: [Schema.Types.Mixed],
      _id: false
    }
  ],
  planningSupply: [
    {
      tableName: String,
      planningLevels: [Schema.Types.Mixed],
      _id: false
    }
  ]
},
  {
    collection: 'planning'
  })

module.exports = mongoose.model('Planning', PlanningSchema)