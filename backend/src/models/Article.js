const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    url: String,
    type: {
      type: String,
      enum: ['original', 'updated'],
      default: 'original'
    },
    references: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
