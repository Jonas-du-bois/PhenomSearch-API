/**
 * Format a single sighting for API response
 * @param {Object} sighting - Sighting object
 * @param {boolean} detailed - Include all fields or summary
 * @returns {Object} Formatted sighting
 */
function formatSighting(sighting, detailed = false) {
  const base = {
    id: sighting.id,
    date: sighting.date,
    time: sighting.time,
    location: sighting.location,
    country: sighting.country,
    description: sighting.description,
    credibility: sighting.credibility,
    strangeness: sighting.strangeness,
    duration: sighting.duration,
    locale: sighting.locale
  };

  if (detailed) {
    return {
      ...base,
      state: sighting.state,
      coordinates: sighting.coordinates,
      coordinatesDMS: sighting.coordinatesDMS,
      locationLink: sighting.locationLink,
      hatchDesc: sighting.hatchDesc,
      observerTypes: sighting.observerTypes,
      ufoShapes: sighting.ufoShapes,
      phenomena: sighting.phenomena,
      attributes: sighting.attributes,
      reference: sighting.reference,
      source: sighting.source,
      type: sighting.type
    };
  }

  return {
    ...base,
    coordinates: sighting.coordinates,
    observerTypes: sighting.observerTypes.map(o => o.code),
    ufoShapes: sighting.ufoShapes.map(s => s.code),
    phenomena: sighting.phenomena.map(p => p.code)
  };
}

/**
 * Format multiple sightings for API response
 * @param {Array} sightings - Array of sightings
 * @param {boolean} detailed - Include all fields or summary
 * @returns {Array} Formatted sightings
 */
function formatSightings(sightings, detailed = false) {
  return sightings.map(s => formatSighting(s, detailed));
}

/**
 * Format success response
 * @param {*} data - Response data
 * @param {Object} pagination - Pagination info (optional)
 * @returns {Object} Formatted response
 */
function formatSuccessResponse(data, pagination = null) {
  const response = {
    success: true,
    data
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
}

/**
 * Format error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Formatted error response
 */
function formatErrorResponse(message, statusCode = 500) {
  return {
    success: false,
    error: {
      message,
      statusCode
    }
  };
}

/**
 * Get attribute descriptions mapping
 * @returns {Object} Attribute code to description mappings
 */
function getAttributeDescriptions() {
  return {
    observerTypes: {
      GND: 'Ground Observers - Observateur(s) au sol',
      MIL: 'Military Observers - Observateur(s) militaires',
      CIV: 'Civilian Observers - Observateur(s) civils',
      HQO: 'High-Quality Observers - Observateur(s) de haute qualité',
      SCI: 'Scientist Involvement - Implication de scientifiques',
      CST: 'Coastal Observers - Observateur(s) en zone côtière',
      SEA: 'Sea Observers - Observateur(s) en mer',
      NWS: 'News Media Report - Rapport médias/presse'
    },
    ufoShapes: {
      SCR: 'Saucer/Classic - Soucoupe classique, disque ou sphère',
      CIG: 'Cigar/Torpedo - Torpille, cigare ou cylindre',
      DLT: 'Delta/Boomerang - Delta, V, boomerang ou forme rectangulaire',
      NLT: 'Nightlights - Points lumineux ou lueurs nocturnes',
      FBL: 'Fireball - Boule de feu, forme brillante indistincte',
      FIG: 'Figure/Entity - Figure ou entité mal définie',
      PRB: 'Probe - Sonde (probablement télécommandée)',
      NFO: 'No Craft - Aucun engin vu (entités seules)'
    },
    phenomena: {
      WAV: 'Wave/Cluster/Flap - Vague, cluster ou flap',
      TCH: 'Technical Details - Nouveaux détails techniques',
      HST: 'Historical Account - Compte rendu historique',
      SND: 'Sounds - Sons d\'OVNI entendus ou enregistrés',
      ODD: 'Atypical/Paranormal - Atypique, Forteana ou paranormal',
      MID: 'Misidentification - Probable mésidentification',
      RAY: 'Light/Beam - Lumière bizarre, projecteur, faisceau',
      SIG: 'Signals - Signaux, réponses ou communications',
      LND: 'Landing - Atterrissage d\'OVNI',
      SUB: 'Submersible - Émerge de l\'eau ou s\'y immerge',
      OBS: 'Observation/Chase - Véhicules d\'observation ou de poursuite',
      VEH: 'Vehicle Affected - Véhicule affecté',
      TRC: 'Physical Traces - Traces physiques directes',
      DRT: 'Dirt/Soil Marks - Traces de terre, sol, marques',
      VEG: 'Vegetation - Plantes affectées',
      PHT: 'Photos/Video - Photos, films ou vidéos prises',
      RDA: 'Radiation - Radiation détectée',
      BLD: 'Buildings/Structures - Bâtiment affecté',
      OID: 'Humanoid/Grey - Humanoïde, petit extraterrestre',
      NOC: 'No Entity - Aucune entité vue',
      ANI: 'Animals Affected - Animaux affectés',
      HUM: 'Humans Affected - Humains affectés',
      INJ: 'Injuries - Blessures, maladie, mort'
    }
  };
}

module.exports = {
  formatSighting,
  formatSightings,
  formatSuccessResponse,
  formatErrorResponse,
  getAttributeDescriptions
};
