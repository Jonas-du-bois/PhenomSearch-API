/**
 * Validate query parameters for sightings list endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
function validateSightingsQuery(req, res, next) {
  const errors = [];

  // Validate credibility range
  if (req.query.minCredibility !== undefined) {
    const value = parseInt(req.query.minCredibility, 10);
    if (isNaN(value) || value < 0 || value > 15) {
      errors.push('minCredibility must be between 0 and 15');
    }
  }

  if (req.query.maxCredibility !== undefined) {
    const value = parseInt(req.query.maxCredibility, 10);
    if (isNaN(value) || value < 0 || value > 15) {
      errors.push('maxCredibility must be between 0 and 15');
    }
  }

  // Validate strangeness range
  if (req.query.minStrangeness !== undefined) {
    const value = parseInt(req.query.minStrangeness, 10);
    if (isNaN(value) || value < 0 || value > 10) {
      errors.push('minStrangeness must be between 0 and 10');
    }
  }

  if (req.query.maxStrangeness !== undefined) {
    const value = parseInt(req.query.maxStrangeness, 10);
    if (isNaN(value) || value < 0 || value > 10) {
      errors.push('maxStrangeness must be between 0 and 10');
    }
  }

  // Validate year range
  if (req.query.startYear !== undefined) {
    const value = parseInt(req.query.startYear, 10);
    if (isNaN(value) || value < 0 || value > 3000) {
      errors.push('startYear must be a valid year');
    }
  }

  if (req.query.endYear !== undefined) {
    const value = parseInt(req.query.endYear, 10);
    if (isNaN(value) || value < 0 || value > 3000) {
      errors.push('endYear must be a valid year');
    }
  }

  // Validate duration
  if (req.query.minDuration !== undefined) {
    const value = parseInt(req.query.minDuration, 10);
    if (isNaN(value) || value < 0) {
      errors.push('minDuration must be a positive number');
    }
  }

  if (req.query.maxDuration !== undefined) {
    const value = parseInt(req.query.maxDuration, 10);
    if (isNaN(value) || value < 0) {
      errors.push('maxDuration must be a positive number');
    }
  }

  // Validate pagination
  if (req.query.limit !== undefined) {
    const value = parseInt(req.query.limit, 10);
    if (isNaN(value) || value < 1 || value > 500) {
      errors.push('limit must be between 1 and 500');
    }
  }

  if (req.query.offset !== undefined) {
    const value = parseInt(req.query.offset, 10);
    if (isNaN(value) || value < 0) {
      errors.push('offset must be a non-negative number');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors,
        statusCode: 400
      }
    });
  }

  next();
}

/**
 * Validate sighting ID parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
function validateSightingId(req, res, next) {
  const { id } = req.params;

  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid sighting ID',
        statusCode: 400
      }
    });
  }

  next();
}

module.exports = {
  validateSightingsQuery,
  validateSightingId
};
