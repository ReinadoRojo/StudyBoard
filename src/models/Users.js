const { Schema, model } = require('mongoose');

module.exports = model('User', new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  names: { type: String, required: true },
  surnames: { type: String, required: true },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  created_at: { type: Date, default: Date.now },
}))