'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlarmSchema = new Schema({
  sensorId: {
      type: String
  },
  type: {
      type: String
  },
  timestamp:{
      type : Date
  }
});

module.exports = mongoose.model('Alarm', AlarmSchema);
