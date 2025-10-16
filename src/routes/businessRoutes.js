const express = require('express');
const {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getMyBusinesses,
} = require('../controllers/businessController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getBusinesses).post(protect, createBusiness);

router.get('/my-businesses', protect, getMyBusinesses);

router
  .route('/:id')
  .get(getBusiness)
  .put(protect, updateBusiness)
  .delete(protect, deleteBusiness);

module.exports = router;
