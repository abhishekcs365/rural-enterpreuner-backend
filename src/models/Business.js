const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessName: {
    type: String,
    required: [true, 'Please provide a business name'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: [
      'Agriculture',
      'Handicrafts',
      'Dairy',
      'Poultry',
      'Food Processing',
      'Textile',
      'Services',
      'Other',
    ],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  location: {
    village: String,
    district: String,
    state: String,
    pincode: String,
  },
  images: [String],
  contactInfo: {
    phone: String,
    email: String,
    whatsapp: String,
  },
  investment: {
    required: Number,
    raised: {
      type: Number,
      default: 0,
    },
  },
  employees: {
    type: Number,
    default: 1,
  },
  startDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'seeking-investment', 'closed'],
    default: 'planning',
  },
  products: [
    {
      name: String,
      description: String,
      price: Number,
      unit: String,
      images: [String],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

businessSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Business', businessSchema);
