const { Schema, model } = require('mongoose');

const PersonSchema = new Schema({
  name: {
    type:String,
    require:true
  },
  picture: {
    type:String,
    required:false
  },
  email: {
    type:String,
    required:true
  },
  phone: {
    type:String,
    required:false
  },
  location: {
    type:String,
    required:false
  },
  isGoogleAuth: {
    type: Boolean,
    default: false,
  },
  isFacebookAuth: {
    type: Boolean,
    default: false,
  },
  isActivated: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true
});

module.exports = model('Person', PersonSchema);