const { getAllSightings, getUniqueValues } = require('../data/loader');
const { applyFilters, applyPagination, extractYear } = require('../utils/filters');
const { formatSightings, formatSighting, formatSuccessResponse, getAttributeDescriptions } = require('../utils/formatters');

/**
 * Get all sightings without pagination (full dataset)
 * GET /api/v1/sightings/all
 */
function getAllSightingsData(req, res) {
  try {
    const allSightings = getAllSightings();
    
    // Apply filters if any
    const filtered = applyFilters(allSightings, req.query);

    // Format response (summary format for performance)
    const formattedData = formatSightings(filtered, false);
    
    res.json({
      success: true,
      data: formattedData,
      meta: {
        total: formattedData.length,
        warning: formattedData.length > 5000 ? 'Large dataset - consider using pagination for better performance' : null
      }
    });
  } catch (error) {
    console.error('Error in getAllSightingsData:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve all sightings',
        statusCode: 500
      }
    });
  }
}

/**
 * Get paginated sightings with simple page/perPage parameters
 * GET /api/v1/sightings/paginated
 */
function getPaginatedSightings(req, res) {
  try {
    const allSightings = getAllSightings();
    
    // Parse pagination parameters
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const perPage = Math.min(500, Math.max(1, parseInt(req.query.perPage, 10) || 50));
    
    // Calculate offset from page number
    const offset = (page - 1) * perPage;
    const total = allSightings.length;
    const totalPages = Math.ceil(total / perPage);
    
    // Get paginated data
    const paginatedData = allSightings.slice(offset, offset + perPage);
    
    // Format response
    const formattedData = formatSightings(paginatedData, false);
    
    res.json({
      success: true,
      data: formattedData,
      pagination: {
        page,
        perPage,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error in getPaginatedSightings:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve paginated sightings',
        statusCode: 500
      }
    });
  }
}

/**
 * Get all sightings with optional filters and pagination
 * GET /api/v1/sightings
 */
function getSightings(req, res) {
  try {
    const allSightings = getAllSightings();
    
    // Apply filters
    const filtered = applyFilters(allSightings, req.query);
    
    // Apply pagination
    const { data, pagination } = applyPagination(
      filtered,
      req.query.offset,
      req.query.limit
    );

    // Format response
    const formattedData = formatSightings(data, false);
    
    res.json(formatSuccessResponse(formattedData, pagination));
  } catch (error) {
    console.error('Error in getSightings:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve sightings',
        statusCode: 500
      }
    });
  }
}

/**
 * Get a single sighting by ID
 * GET /api/v1/sightings/:id
 */
function getSightingById(req, res) {
  try {
    const { id } = req.params;
    const allSightings = getAllSightings();
    
    const sighting = allSightings.find(s => s.id === id);

    if (!sighting) {
      return res.status(404).json({
        success: false,
        error: {
          message: `Sighting with ID '${id}' not found`,
          statusCode: 404
        }
      });
    }

    const formattedData = formatSighting(sighting, true);
    res.json(formatSuccessResponse(formattedData));
  } catch (error) {
    console.error('Error in getSightingById:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve sighting',
        statusCode: 500
      }
    });
  }
}

/**
 * Get statistics about the sightings dataset
 * GET /api/v1/statistics
 */
function getStatistics(req, res) {
  try {
    const allSightings = getAllSightings();
    
    // Calculate date range
    const years = allSightings
      .map(s => extractYear(s.date))
      .filter(y => y !== null);
    
    const minYear = years.length > 0 ? Math.min(...years) : null;
    const maxYear = years.length > 0 ? Math.max(...years) : null;

    // Calculate credibility stats
    const credibilities = allSightings
      .map(s => s.credibility)
      .filter(c => c > 0);
    
    const credibilityStats = credibilities.length > 0 ? {
      min: Math.min(...credibilities),
      max: Math.max(...credibilities),
      avg: (credibilities.reduce((a, b) => a + b, 0) / credibilities.length).toFixed(2)
    } : null;

    // Calculate strangeness stats
    const strangenesses = allSightings
      .map(s => s.strangeness)
      .filter(s => s > 0);
    
    const strangenessStats = strangenesses.length > 0 ? {
      min: Math.min(...strangenesses),
      max: Math.max(...strangenesses),
      avg: (strangenesses.reduce((a, b) => a + b, 0) / strangenesses.length).toFixed(2)
    } : null;

    // Calculate duration stats
    const durations = allSightings
      .map(s => s.duration)
      .filter(d => d > 0);
    
    const durationStats = durations.length > 0 ? {
      min: Math.min(...durations),
      max: Math.max(...durations),
      avg: (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(2),
      median: calculateMedian(durations)
    } : null;

    // Count by country
    const countryCount = {};
    allSightings.forEach(s => {
      if (s.country && s.country !== 'Unknown') {
        countryCount[s.country] = (countryCount[s.country] || 0) + 1;
      }
    });

    // Count by observer types
    const observerTypeCount = {};
    allSightings.forEach(s => {
      s.observerTypes.forEach(obs => {
        observerTypeCount[obs.code] = (observerTypeCount[obs.code] || 0) + 1;
      });
    });

    // Count by UFO shapes
    const ufoShapeCount = {};
    allSightings.forEach(s => {
      s.ufoShapes.forEach(shape => {
        ufoShapeCount[shape.code] = (ufoShapeCount[shape.code] || 0) + 1;
      });
    });

    const statistics = {
      totalSightings: allSightings.length,
      dateRange: {
        minYear,
        maxYear,
        span: maxYear && minYear ? maxYear - minYear : null
      },
      credibilityStats,
      strangenessStats,
      durationStats,
      topCountries: Object.entries(countryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([country, count]) => ({ country, count })),
      observerTypeDistribution: observerTypeCount,
      ufoShapeDistribution: ufoShapeCount,
      sightingsWithCoordinates: allSightings.filter(s => s.coordinates !== null).length
    };

    res.json(formatSuccessResponse(statistics));
  } catch (error) {
    console.error('Error in getStatistics:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to calculate statistics',
        statusCode: 500
      }
    });
  }
}

/**
 * Get list of unique countries
 * GET /api/v1/filters/countries
 */
function getCountries(req, res) {
  try {
    const countries = getUniqueValues('country');
    res.json(formatSuccessResponse(countries));
  } catch (error) {
    console.error('Error in getCountries:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve countries',
        statusCode: 500
      }
    });
  }
}

/**
 * Get list of unique locales
 * GET /api/v1/filters/locales
 */
function getLocales(req, res) {
  try {
    const locales = getUniqueValues('locale');
    res.json(formatSuccessResponse(locales));
  } catch (error) {
    console.error('Error in getLocales:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve locales',
        statusCode: 500
      }
    });
  }
}

/**
 * Get list of observer types with descriptions
 * GET /api/v1/filters/observer-types
 */
function getObserverTypes(req, res) {
  try {
    const descriptions = getAttributeDescriptions();
    const observerTypes = Object.entries(descriptions.observerTypes).map(([code, description]) => ({
      code,
      description
    }));
    
    res.json(formatSuccessResponse(observerTypes));
  } catch (error) {
    console.error('Error in getObserverTypes:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve observer types',
        statusCode: 500
      }
    });
  }
}

/**
 * Get list of UFO shapes with descriptions
 * GET /api/v1/filters/ufo-shapes
 */
function getUfoShapes(req, res) {
  try {
    const descriptions = getAttributeDescriptions();
    const ufoShapes = Object.entries(descriptions.ufoShapes).map(([code, description]) => ({
      code,
      description
    }));
    
    res.json(formatSuccessResponse(ufoShapes));
  } catch (error) {
    console.error('Error in getUfoShapes:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve UFO shapes',
        statusCode: 500
      }
    });
  }
}

/**
 * Get list of phenomena with descriptions
 * GET /api/v1/filters/phenomena
 */
function getPhenomena(req, res) {
  try {
    const descriptions = getAttributeDescriptions();
    const phenomena = Object.entries(descriptions.phenomena).map(([code, description]) => ({
      code,
      description
    }));
    
    res.json(formatSuccessResponse(phenomena));
  } catch (error) {
    console.error('Error in getPhenomena:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve phenomena',
        statusCode: 500
      }
    });
  }
}

/**
 * Calculate median of an array of numbers
 * @param {Array} arr - Array of numbers
 * @returns {number} Median value
 */
function calculateMedian(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

module.exports = {
  getAllSightingsData,
  getPaginatedSightings,
  getSightings,
  getSightingById,
  getStatistics,
  getCountries,
  getLocales,
  getObserverTypes,
  getUfoShapes,
  getPhenomena
};
