const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Project title is required'], 
    trim: true, 
    maxLength: [100, 'Title cannot exceed 100 characters'] 
  },
  description: { 
    type: String, 
    required: [true, 'Project description is required'], 
    trim: true, 
    maxLength: [500, 'Description cannot exceed 500 characters'] 
  },
  techStack: { 
    type: [String], 
    required: [true, 'Tech stack is required'],
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'Tech stack must have at least one technology',
    },
  },
  liveUrl: { 
    type: String, 
    trim: true, 
    default: '' 
  },
  githubUrl: { 
    type: String, 
    required: [true, 'GitHub URL is required'], 
    trim: true 
  },
  imageUrl: { 
    type: String, 
    trim: true, 
    default: '' 
  },
  order: { 
    type: Number, 
    default: 0 
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Project', projectSchema);
