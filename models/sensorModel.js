'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
  id: {
      type: String
  },
  state: {
      type: String
  },
  model:{
      type: String
  },
  latitude:{
      type: String
  },
  longitude:{
      type: String
  }
});

module.exports = mongoose.model('Sensor', SensorSchema);
