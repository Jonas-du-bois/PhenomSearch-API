/**
 * Apply filters to sightings data
 * @param {Array} data - Array of sightings
 * @param {Object} filters - Filter parameters
 * @returns {Array} Filtered sightings
 */
function applyFilters(data, filters) {
  let filtered = [...data];

  // Filter by country
  if (filters.country) {
    filtered = filtered.filter(item => 
      item.country.toLowerCase().includes(filters.country.toLowerCase())
    );
  }

  // Filter by locale
  if (filters.locale) {
    filtered = filtered.filter(item => 
      item.locale.toLowerCase().includes(filters.locale.toLowerCase())
    );
  }

  // Filter by credibility range
  if (filters.minCredibility !== undefined) {
    const minCred = parseInt(filters.minCredibility, 10);
    filtered = filtered.filter(item => item.credibility >= minCred);
  }

  if (filters.maxCredibility !== undefined) {
    const maxCred = parseInt(filters.maxCredibility, 10);
    filtered = filtered.filter(item => item.credibility <= maxCred);
  }

  // Filter by strangeness range
  if (filters.minStrangeness !== undefined) {
    const minStrange = parseInt(filters.minStrangeness, 10);
    filtered = filtered.filter(item => item.strangeness >= minStrange);
  }

  if (filters.maxStrangeness !== undefined) {
    const maxStrange = parseInt(filters.maxStrangeness, 10);
    filtered = filtered.filter(item => item.strangeness <= maxStrange);
  }

  // Filter by year range
  if (filters.startYear !== undefined || filters.endYear !== undefined) {
    filtered = filtered.filter(item => {
      const year = extractYear(item.date);
      if (!year) return false;

      if (filters.startYear !== undefined && year < parseInt(filters.startYear, 10)) {
        return false;
      }

      if (filters.endYear !== undefined && year > parseInt(filters.endYear, 10)) {
        return false;
      }

      return true;
    });
  }

  // Filter by minimum duration
  if (filters.minDuration !== undefined) {
    const minDur = parseInt(filters.minDuration, 10);
    filtered = filtered.filter(item => item.duration >= minDur);
  }

  // Filter by maximum duration
  if (filters.maxDuration !== undefined) {
    const maxDur = parseInt(filters.maxDuration, 10);
    filtered = filtered.filter(item => item.duration <= maxDur);
  }

  // Filter by observer types
  if (filters.observerType) {
    const observerTypes = Array.isArray(filters.observerType) 
      ? filters.observerType 
      : [filters.observerType];
    
    filtered = filtered.filter(item => 
      item.observerTypes.some(obs => 
        observerTypes.some(type => obs.code === type.toUpperCase())
      )
    );
  }

  // Filter by UFO shapes
  if (filters.ufoShape) {
    const ufoShapes = Array.isArray(filters.ufoShape) 
      ? filters.ufoShape 
      : [filters.ufoShape];
    
    filtered = filtered.filter(item => 
      item.ufoShapes.some(shape => 
        ufoShapes.some(s => shape.code === s.toUpperCase())
      )
    );
  }

  // Filter by phenomena
  if (filters.phenomenon) {
    const phenomena = Array.isArray(filters.phenomenon) 
      ? filters.phenomenon 
      : [filters.phenomenon];
    
    filtered = filtered.filter(item => 
      item.phenomena.some(phen => 
        phenomena.some(p => phen.code === p.toUpperCase())
      )
    );
  }

  // Search in description, location, and other text fields
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(item => 
      item.description.toLowerCase().includes(searchTerm) ||
      item.location.toLowerCase().includes(searchTerm) ||
      item.country.toLowerCase().includes(searchTerm) ||
      item.hatchDesc.toLowerCase().includes(searchTerm) ||
      item.reference.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
}

/**
 * Extract year from date string
 * @param {string} dateStr - Date string in various formats
 * @returns {number|null} Year or null
 */
function extractYear(dateStr) {
  if (!dateStr || dateStr === 'Unknown') {
    return null;
  }

  // Try to extract 4-digit year
  const yearMatch = dateStr.match(/\d{4}/);
  if (yearMatch) {
    return parseInt(yearMatch[0], 10);
  }

  // Try to extract 2-digit year and assume 1900s
  const shortYearMatch = dateStr.match(/\/(\d{2})$/);
  if (shortYearMatch) {
    const year = parseInt(shortYearMatch[1], 10);
    return year < 50 ? 2000 + year : 1900 + year;
  }

  return null;
}

/**
 * Apply pagination to filtered data
 * @param {Array} data - Filtered data
 * @param {number} offset - Starting index
 * @param {number} limit - Number of items to return
 * @returns {Object} Paginated result with data and pagination info
 */
function applyPagination(data, offset = 0, limit = 50) {
  const parsedOffset = Math.max(0, parseInt(offset, 10) || 0);
  const parsedLimit = Math.min(500, Math.max(1, parseInt(limit, 10) || 50));

  const total = data.length;
  const paginatedData = data.slice(parsedOffset, parsedOffset + parsedLimit);
  const hasMore = (parsedOffset + parsedLimit) < total;

  return {
    data: paginatedData,
    pagination: {
      total,
      limit: parsedLimit,
      offset: parsedOffset,
      hasMore
    }
  };
}

module.exports = {
  applyFilters,
  applyPagination,
  extractYear
};
