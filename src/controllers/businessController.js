const Business = require('../models/Business');

// @desc    Get all businesses
// @route   GET /api/businesses
// @access  Public
exports.getBusinesses = async (req, res, next) => {
  try {
    const { category, status, state, district } = req.query;

    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (state) query['location.state'] = state;
    if (district) query['location.district'] = district;

    const businesses = await Business.find(query)
      .populate('owner', 'name email phone')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single business
// @route   GET /api/businesses/:id
// @access  Public
exports.getBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id).populate(
      'owner',
      'name email phone location'
    );

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }

    res.status(200).json({
      success: true,
      data: business,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new business
// @route   POST /api/businesses
// @access  Private
exports.createBusiness = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.owner = req.user.id;

    const business = await Business.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Business created successfully',
      data: business,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update business
// @route   PUT /api/businesses/:id
// @access  Private
exports.updateBusiness = async (req, res, next) => {
  try {
    let business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }

    // Make sure user is business owner
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this business',
      });
    }

    business = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Business updated successfully',
      data: business,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete business
// @route   DELETE /api/businesses/:id
// @access  Private
exports.deleteBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }

    // Make sure user is business owner
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this business',
      });
    }

    await business.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Business deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get businesses by logged in user
// @route   GET /api/businesses/my-businesses
// @access  Private
exports.getMyBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.find({ owner: req.user.id }).sort(
      '-createdAt'
    );

    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
    });
  } catch (error) {
    next(error);
  }
};
