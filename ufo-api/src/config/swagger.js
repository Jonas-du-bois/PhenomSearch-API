const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UFO Sightings API',
      version: '1.0.0',
      description: `
## API REST pour la base de données UFO Hatch

Cette API fournit un accès aux données historiques d'observations d'OVNI provenant de la Hatch UFO Database.

### Fonctionnalités principales
- 🔍 Recherche et filtrage d'observations
- 📊 Statistiques agrégées
- 🌍 Filtres par pays, formes d'OVNI, types d'observateurs
- 📄 Pagination des résultats

### Authentification
Cette API est publique et ne nécessite pas d'authentification.
      `,
      contact: {
        name: 'API Support'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1'
      }
    ],
    tags: [
      {
        name: 'Sightings',
        description: 'Endpoints pour les observations d\'OVNI'
      },
      {
        name: 'Statistics',
        description: 'Statistiques sur les données'
      },
      {
        name: 'Filters',
        description: 'Options de filtrage disponibles'
      }
    ],
    components: {
      schemas: {
        Sighting: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Identifiant unique de l\'observation',
              example: 'HAT-1947-001'
            },
            date: {
              type: 'string',
              description: 'Date de l\'observation',
              example: '1947-06-24'
            },
            time: {
              type: 'string',
              description: 'Heure de l\'observation',
              example: '15:00'
            },
            location: {
              type: 'string',
              description: 'Lieu de l\'observation',
              example: 'Mount Rainier, Washington'
            },
            country: {
              type: 'string',
              description: 'Pays',
              example: 'USA'
            },
            description: {
              type: 'string',
              description: 'Description de l\'observation'
            },
            credibility: {
              type: 'integer',
              description: 'Score de crédibilité (0-15)',
              minimum: 0,
              maximum: 15,
              example: 8
            },
            strangeness: {
              type: 'integer',
              description: 'Score d\'étrangeté (0-10)',
              minimum: 0,
              maximum: 10,
              example: 6
            },
            duration: {
              type: 'integer',
              description: 'Durée en secondes',
              example: 180
            },
            locale: {
              type: 'string',
              description: 'Type de localité',
              example: 'Rural'
            },
            coordinates: {
              type: 'object',
              nullable: true,
              properties: {
                lat: {
                  type: 'number',
                  description: 'Latitude',
                  example: 46.8523
                },
                lng: {
                  type: 'number',
                  description: 'Longitude',
                  example: -121.7603
                }
              }
            },
            observerTypes: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Codes des types d\'observateurs',
              example: ['GND', 'CIV']
            },
            ufoShapes: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Codes des formes d\'OVNI observées',
              example: ['SCR', 'NLT']
            },
            phenomena: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Codes des phénomènes associés',
              example: ['RAY', 'SND']
            }
          }
        },
        SightingDetailed: {
          allOf: [
            { $ref: '#/components/schemas/Sighting' },
            {
              type: 'object',
              properties: {
                state: {
                  type: 'string',
                  description: 'État/Province',
                  example: 'Washington'
                },
                coordinatesDMS: {
                  type: 'string',
                  description: 'Coordonnées en format DMS',
                  example: '46°51\'8"N, 121°45\'37"W'
                },
                locationLink: {
                  type: 'string',
                  description: 'Lien Google Maps',
                  example: 'https://maps.google.com/?q=46.8523,-121.7603'
                },
                hatchDesc: {
                  type: 'string',
                  description: 'Description Hatch originale'
                },
                observerTypes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      code: {
                        type: 'string',
                        example: 'GND'
                      },
                      description: {
                        type: 'string',
                        example: 'Ground Observers - Observateur(s) au sol'
                      }
                    }
                  }
                },
                ufoShapes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      code: {
                        type: 'string',
                        example: 'SCR'
                      },
                      description: {
                        type: 'string',
                        example: 'Saucer/Classic - Soucoupe classique'
                      }
                    }
                  }
                },
                phenomena: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      code: {
                        type: 'string',
                        example: 'RAY'
                      },
                      description: {
                        type: 'string',
                        example: 'Light/Beam - Lumière bizarre'
                      }
                    }
                  }
                },
                attributes: {
                  type: 'string',
                  description: 'Attributs bruts'
                },
                reference: {
                  type: 'string',
                  description: 'Référence source'
                },
                source: {
                  type: 'string',
                  description: 'Source de l\'information'
                },
                type: {
                  type: 'string',
                  description: 'Type d\'entrée'
                }
              }
            }
          ]
        },
        Pagination: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: 'Nombre total d\'éléments',
              example: 18500
            },
            limit: {
              type: 'integer',
              description: 'Nombre d\'éléments par page',
              example: 50
            },
            offset: {
              type: 'integer',
              description: 'Position de départ',
              example: 0
            },
            hasMore: {
              type: 'boolean',
              description: 'Indique s\'il y a plus de résultats',
              example: true
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object'
            }
          }
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Sighting'
              }
            },
            pagination: {
              $ref: '#/components/schemas/Pagination'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Validation failed'
                },
                statusCode: {
                  type: 'integer',
                  example: 400
                },
                details: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  example: ['minCredibility must be between 0 and 15']
                }
              }
            }
          }
        },
        Statistics: {
          type: 'object',
          properties: {
            totalSightings: {
              type: 'integer',
              description: 'Nombre total d\'observations',
              example: 18500
            },
            dateRange: {
              type: 'object',
              properties: {
                minYear: {
                  type: 'integer',
                  example: 1868
                },
                maxYear: {
                  type: 'integer',
                  example: 2015
                },
                span: {
                  type: 'integer',
                  example: 147
                }
              }
            },
            credibilityStats: {
              type: 'object',
              properties: {
                min: { type: 'integer' },
                max: { type: 'integer' },
                avg: { type: 'string' }
              }
            },
            strangenessStats: {
              type: 'object',
              properties: {
                min: { type: 'integer' },
                max: { type: 'integer' },
                avg: { type: 'string' }
              }
            },
            durationStats: {
              type: 'object',
              properties: {
                min: { type: 'integer' },
                max: { type: 'integer' },
                avg: { type: 'string' },
                median: { type: 'number' }
              }
            },
            topCountries: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  country: { type: 'string' },
                  count: { type: 'integer' }
                }
              }
            },
            sightingsWithCoordinates: {
              type: 'integer',
              description: 'Nombre d\'observations avec coordonnées GPS'
            }
          }
        },
        ObserverType: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'Code du type d\'observateur',
              example: 'GND'
            },
            description: {
              type: 'string',
              description: 'Description du type',
              example: 'Ground Observers - Observateur(s) au sol'
            }
          }
        },
        UfoShape: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'Code de la forme',
              example: 'SCR'
            },
            description: {
              type: 'string',
              description: 'Description de la forme',
              example: 'Saucer/Classic - Soucoupe classique, disque ou sphère'
            }
          }
        },
        Phenomenon: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'Code du phénomène',
              example: 'RAY'
            },
            description: {
              type: 'string',
              description: 'Description du phénomène',
              example: 'Light/Beam - Lumière bizarre, projecteur, faisceau'
            }
          }
        }
      }
    },
    paths: {
      '/sightings/paginated': {
        get: {
          tags: ['Sightings'],
          summary: 'Récupérer les observations avec pagination simple',
          description: 'Retourne une liste paginée d\'observations avec des paramètres simples: page et perPage. Idéal pour une navigation par pages.',
          parameters: [
            {
              name: 'page',
              in: 'query',
              description: 'Numéro de la page (commence à 1)',
              schema: { type: 'integer', default: 1, minimum: 1 },
              example: 1
            },
            {
              name: 'perPage',
              in: 'query',
              description: 'Nombre d\'observations par page (1-500)',
              schema: { type: 'integer', default: 50, minimum: 1, maximum: 500 },
              example: 50
            }
          ],
          responses: {
            '200': {
              description: 'Liste paginée des observations',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Sighting' }
                      },
                      pagination: {
                        type: 'object',
                        properties: {
                          page: { type: 'integer', example: 1 },
                          perPage: { type: 'integer', example: 50 },
                          total: { type: 'integer', example: 18116 },
                          totalPages: { type: 'integer', example: 363 },
                          hasNextPage: { type: 'boolean', example: true },
                          hasPrevPage: { type: 'boolean', example: false }
                        }
                      }
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Erreur serveur',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/sightings': {
        get: {
          tags: ['Sightings'],
          summary: 'Récupérer les observations d\'OVNI (paginé)',
          description: 'Retourne une liste paginée d\'observations avec possibilité de filtrage',
          parameters: [
            {
              name: 'country',
              in: 'query',
              description: 'Filtrer par pays',
              schema: { type: 'string' },
              example: 'USA'
            },
            {
              name: 'locale',
              in: 'query',
              description: 'Filtrer par type de localité',
              schema: { type: 'string' }
            },
            {
              name: 'observerType',
              in: 'query',
              description: 'Filtrer par type d\'observateur (codes séparés par virgule)',
              schema: { type: 'string' },
              example: 'GND,MIL'
            },
            {
              name: 'ufoShape',
              in: 'query',
              description: 'Filtrer par forme d\'OVNI (codes séparés par virgule)',
              schema: { type: 'string' },
              example: 'SCR,CIG'
            },
            {
              name: 'phenomenon',
              in: 'query',
              description: 'Filtrer par phénomène (codes séparés par virgule)',
              schema: { type: 'string' },
              example: 'RAY,LND'
            },
            {
              name: 'startYear',
              in: 'query',
              description: 'Année de début',
              schema: { type: 'integer' },
              example: 1950
            },
            {
              name: 'endYear',
              in: 'query',
              description: 'Année de fin',
              schema: { type: 'integer' },
              example: 2000
            },
            {
              name: 'minCredibility',
              in: 'query',
              description: 'Crédibilité minimale (0-15)',
              schema: { type: 'integer', minimum: 0, maximum: 15 }
            },
            {
              name: 'maxCredibility',
              in: 'query',
              description: 'Crédibilité maximale (0-15)',
              schema: { type: 'integer', minimum: 0, maximum: 15 }
            },
            {
              name: 'minStrangeness',
              in: 'query',
              description: 'Étrangeté minimale (0-10)',
              schema: { type: 'integer', minimum: 0, maximum: 10 }
            },
            {
              name: 'maxStrangeness',
              in: 'query',
              description: 'Étrangeté maximale (0-10)',
              schema: { type: 'integer', minimum: 0, maximum: 10 }
            },
            {
              name: 'minDuration',
              in: 'query',
              description: 'Durée minimale en secondes',
              schema: { type: 'integer', minimum: 0 }
            },
            {
              name: 'maxDuration',
              in: 'query',
              description: 'Durée maximale en secondes',
              schema: { type: 'integer', minimum: 0 }
            },
            {
              name: 'hasCoordinates',
              in: 'query',
              description: 'Filtrer les observations avec/sans coordonnées GPS',
              schema: { type: 'boolean' }
            },
            {
              name: 'search',
              in: 'query',
              description: 'Recherche textuelle dans la description',
              schema: { type: 'string' }
            },
            {
              name: 'limit',
              in: 'query',
              description: 'Nombre de résultats par page (1-500)',
              schema: { type: 'integer', default: 50, minimum: 1, maximum: 500 }
            },
            {
              name: 'offset',
              in: 'query',
              description: 'Position de départ pour la pagination',
              schema: { type: 'integer', default: 0, minimum: 0 }
            }
          ],
          responses: {
            '200': {
              description: 'Liste des observations',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PaginatedResponse'
                  }
                }
              }
            },
            '400': {
              description: 'Paramètres invalides',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            },
            '500': {
              description: 'Erreur serveur',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            }
          }
        }
      },
      '/sightings/{id}': {
        get: {
          tags: ['Sightings'],
          summary: 'Récupérer une observation par ID',
          description: 'Retourne les détails complets d\'une observation spécifique',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Identifiant unique de l\'observation',
              schema: { type: 'string' },
              example: 'HAT-1947-001'
            }
          ],
          responses: {
            '200': {
              description: 'Détails de l\'observation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/SightingDetailed' }
                    }
                  }
                }
              }
            },
            '400': {
              description: 'ID invalide',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            },
            '404': {
              description: 'Observation non trouvée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/statistics': {
        get: {
          tags: ['Statistics'],
          summary: 'Obtenir les statistiques globales',
          description: 'Retourne des statistiques agrégées sur l\'ensemble des observations',
          responses: {
            '200': {
              description: 'Statistiques du dataset',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/Statistics' }
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Erreur serveur',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/filters/countries': {
        get: {
          tags: ['Filters'],
          summary: 'Liste des pays disponibles',
          description: 'Retourne la liste unique des pays dans le dataset',
          responses: {
            '200': {
              description: 'Liste des pays',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['USA', 'UK', 'France', 'Canada']
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/filters/locales': {
        get: {
          tags: ['Filters'],
          summary: 'Liste des types de localités',
          description: 'Retourne la liste unique des types de localités',
          responses: {
            '200': {
              description: 'Liste des localités',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['Rural', 'Urban', 'Suburban']
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/filters/observer-types': {
        get: {
          tags: ['Filters'],
          summary: 'Liste des types d\'observateurs',
          description: 'Retourne la liste des types d\'observateurs avec leurs codes et descriptions',
          responses: {
            '200': {
              description: 'Liste des types d\'observateurs',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/ObserverType' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/filters/ufo-shapes': {
        get: {
          tags: ['Filters'],
          summary: 'Liste des formes d\'OVNI',
          description: 'Retourne la liste des formes d\'OVNI possibles avec codes et descriptions',
          responses: {
            '200': {
              description: 'Liste des formes d\'OVNI',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/UfoShape' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/filters/phenomena': {
        get: {
          tags: ['Filters'],
          summary: 'Liste des phénomènes',
          description: 'Retourne la liste des phénomènes associés aux observations',
          responses: {
            '200': {
              description: 'Liste des phénomènes',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Phenomenon' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: [] // We define everything in the definition above
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
