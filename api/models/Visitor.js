const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    default: 'Unknown'
  },
  city: {
    type: String,
    default: 'Hidden'
  },
  flag: {
    type: String,
    default: '🌐'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Anonymize by not storing full IPs, just the location results
module.exports = mongoose.model('Visitor', VisitorSchema);
