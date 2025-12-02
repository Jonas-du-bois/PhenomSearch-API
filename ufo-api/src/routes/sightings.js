const express = require('express');
const router = express.Router();
const {
  getAllSightingsData,
  getSightings,
  getSightingById,
  getStatistics,
  getCountries,
  getLocales,
  getObserverTypes,
  getUfoShapes,
  getPhenomena
} = require('../controllers/sightingsController');
const { validateSightingsQuery, validateSightingId } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// Sightings routes
router.get('/sightings/all', validateSightingsQuery, asyncHandler(getAllSightingsData));
router.get('/sightings', validateSightingsQuery, asyncHandler(getSightings));
router.get('/sightings/:id', validateSightingId, asyncHandler(getSightingById));

// Statistics route
router.get('/statistics', asyncHandler(getStatistics));

// Filter options routes
router.get('/filters/countries', asyncHandler(getCountries));
router.get('/filters/locales', asyncHandler(getLocales));
router.get('/filters/observer-types', asyncHandler(getObserverTypes));
router.get('/filters/ufo-shapes', asyncHandler(getUfoShapes));
router.get('/filters/phenomena', asyncHandler(getPhenomena));

module.exports = router;
