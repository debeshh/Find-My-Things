const mongoose = require('mongoose');

const lostProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    dateLost: {
      type: Date,
      required: true,
    },
    isFound: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('LostProduct', lostProductSchema);