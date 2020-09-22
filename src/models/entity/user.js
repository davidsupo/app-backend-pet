const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  }
},{
  timestamps: true
});

module.exports = model('User', UserSchema);