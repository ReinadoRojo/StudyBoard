const { Schema, model } = require('mongoose');

module.exports = model('Subject', new Schema({
  owner_id: { type: Schema.Types.ObjectId, required: true },
  organization_id: { type: Schema.Types.ObjectId, required: true },
  require_support: { type: Boolean, default: false },
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  over_note: { type: Number, required: true, default: 10 },
  invite_code: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  teachers: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Tasks' }],
}))