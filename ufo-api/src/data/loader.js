const fs = require('fs');
const path = require('path');

let cachedData = null;

/**
 * Load and cache UFO sightings data from JSON file
 * @returns {Array} Array of sighting objects
 */
function loadSightingsData() {
  if (cachedData) {
    return cachedData;
  }

  try {
    // Resolve path relative to project root
    const dataPath = process.env.DATA_FILE 
      ? path.resolve(process.cwd(), process.env.DATA_FILE)
      : path.join(__dirname, 'hatch_udb.json');
    
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Data file not found at: ${dataPath}`);
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    // Remove BOM if present
    const cleanData = rawData.replace(/^\uFEFF/, '');
    const jsonData = JSON.parse(cleanData);

    if (!jsonData.Hatch_UDB_Timeline || !Array.isArray(jsonData.Hatch_UDB_Timeline)) {
      throw new Error('Invalid data format: Hatch_UDB_Timeline array not found');
    }

    cachedData = jsonData.Hatch_UDB_Timeline.map((item, index) => ({
      id: item.source_id || `sighting_${index}`,
      date: item.date || item.basic_date || item.alt_basic_date || 'Unknown',
      time: item.time || 'Unknown',
      location: item.location || 'Unknown',
      description: item.desc || '',
      country: item.key_vals?.Country || 'Unknown',
      state: item.key_vals?.State || item.key_vals?.['State/Prov'] || 'Unknown',
      locale: item.key_vals?.Locale || 'Unknown',
      credibility: parseInt(item.key_vals?.Credibility || '0', 10),
      strangeness: parseInt(item.key_vals?.Strangeness || '0', 10),
      duration: parseInt(item.key_vals?.Duration || '0', 10),
      coordinates: parseCoordinates(item.key_vals?.LatLong),
      coordinatesDMS: item.key_vals?.LatLongDMS || '',
      locationLink: item.key_vals?.LocationLink || '',
      hatchDesc: item.key_vals?.HatchDesc || '',
      attributes: item.attributes || [],
      observerTypes: extractAttributesByCategory(item.attributes, ['GND', 'MIL', 'CIV', 'HQO', 'SCI', 'CST', 'SEA', 'NWS']),
      ufoShapes: extractAttributesByCategory(item.attributes, ['SCR', 'CIG', 'DLT', 'NLT', 'FBL', 'FIG', 'PRB', 'NFO']),
      phenomena: extractAttributesByCategory(item.attributes, ['WAV', 'TCH', 'HST', 'SND', 'ODD', 'RAY', 'SIG', 'LND', 'SUB', 'OBS', 'VEH', 'TRC', 'DRT', 'VEG', 'PHT', 'RDA', 'BLD', 'OID', 'NOC', 'ANI', 'HUM', 'INJ', 'MID']),
      reference: item.ref || '',
      source: item.source || 'Hatch',
      type: item.type || 'sighting'
    }));

    console.log(`✅ Successfully loaded ${cachedData.length} sightings from ${dataPath}`);
    return cachedData;

  } catch (error) {
    console.error('❌ Error loading sightings data:', error.message);
    throw error;
  }
}

/**
 * Parse coordinates from string format "lat lng"
 * @param {string} coordString - Coordinates string
 * @returns {Object|null} Object with lat and lng or null
 */
function parseCoordinates(coordString) {
  if (!coordString || typeof coordString !== 'string') {
    return null;
  }

  const parts = coordString.trim().split(/\s+/);
  if (parts.length !== 2) {
    return null;
  }

  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);

  if (isNaN(lat) || isNaN(lng)) {
    return null;
  }

  return { lat, lng };
}

/**
 * Extract attribute codes by category
 * @param {Array} attributes - Array of attribute strings
 * @param {Array} codes - Array of codes to extract
 * @returns {Array} Array of matching attribute objects
 */
function extractAttributesByCategory(attributes, codes) {
  if (!Array.isArray(attributes)) {
    return [];
  }

  return attributes
    .filter(attr => {
      const code = attr.split(':')[0].trim();
      return codes.includes(code);
    })
    .map(attr => {
      const [code, description] = attr.split(':').map(s => s.trim());
      return { code, description };
    });
}

/**
 * Get all sightings (cached)
 * @returns {Array} Array of sighting objects
 */
function getAllSightings() {
  return loadSightingsData();
}

/**
 * Get unique values for a specific field
 * @param {string} field - Field name
 * @returns {Array} Array of unique values
 */
function getUniqueValues(field) {
  const data = getAllSightings();
  const values = new Set();

  data.forEach(item => {
    const value = item[field];
    if (value && value !== 'Unknown' && value !== '') {
      values.add(value);
    }
  });

  return Array.from(values).sort();
}

module.exports = {
  loadSightingsData,
  getAllSightings,
  getUniqueValues
};
