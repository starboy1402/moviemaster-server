const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  cast: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  duration: {
    type: Number,
    required: true
  },
  plotSummary: {
    type: String,
    required: true
  },
  posterUrl: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  addedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
movieSchema.index({ addedBy: 1 });
movieSchema.index({ rating: -1 });
movieSchema.index({ createdAt: -1 });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
