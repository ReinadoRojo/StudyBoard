const { Schema, model } = require('mongoose');

module.exports = model('Task', new Schema({
  owner_id: { type: Schema.Types.ObjectId, required: true },
  subject_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  file: { type: String, required: true },
  points: { type: Number, required: true, default: 0, min: 0 },
  view_code: { type: String, required: true, length: 12 },
  created_at: { type: Date, default: Date.now }
}))