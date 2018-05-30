const mongoose = require('mongoose')

const ourtask = mongoose.Schema({
  t_name: String,
  t_descript: String,
  t_type: String,
  username: String,
  state: Boolean,
  date: Number
})

module.exports = ourtask
