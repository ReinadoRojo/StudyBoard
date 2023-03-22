const { Schema, model } = require('mongoose');

module.exports = model('Organization', new Schema({
  owner_id: { type: Schema.Types.ObjectId, required: true },
  short_code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
}));