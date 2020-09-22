const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  role: {
    type: String,
    enum: ['A','U'],
    default: 'U'
  }
},{
  timestamps: true
});

UserSchema.method('toJSON',function(){
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('User', UserSchema);