require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../api/models/Project');

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack shopping platform built with Node.js and MongoDB, featuring user authentication and payment integration.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'CSS'],
    liveUrl: 'https://mystore.vercel.app',
    githubUrl: 'https://github.com/yaahviparekh/ecommerce',
    imageUrl: '',
    order: 1,
  },
  {
    title: 'Personal Portfolio v1',
    description: 'The first version of my personal portfolio, showcasing my journey and early projects.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://yaahvi-v1.vercel.app',
    githubUrl: 'https://github.com/yaahviparekh/portfolio-v1',
    imageUrl: '',
    order: 2,
  },
  {
    title: 'Task Manager API',
    description: 'A RESTful API for managing tasks with full CRUD operations and JWT authentication.',
    techStack: ['Node.js', 'Express.js', 'MongoDB'],
    liveUrl: '',
    githubUrl: 'https://github.com/yaahviparekh/task-manager-api',
    imageUrl: '',
    order: 3,
  }
];

const seed = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
};

seed();
