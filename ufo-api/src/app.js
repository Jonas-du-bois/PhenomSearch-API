const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const sightingsRouter = require('./routes/sightings');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { loadSightingsData } = require('./data/loader');

const app = express();

// Load data at startup
try {
  loadSightingsData();
  console.log('✅ UFO sightings data loaded successfully');
} catch (error) {
  console.error('❌ Failed to load UFO sightings data:', error.message);
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'UFO Sightings API',
    version: '1.0.0',
    description: 'REST API for Hatch UFO Database - serving historical UFO sightings data',
    documentation: '/api-docs',
    endpoints: {
      sightings: '/api/v1/sightings',
      allSightings: '/api/v1/sightings/all',
      sightingById: '/api/v1/sightings/:id',
      statistics: '/api/v1/statistics',
      filters: {
        countries: '/api/v1/filters/countries',
        locales: '/api/v1/filters/locales',
        observerTypes: '/api/v1/filters/observer-types',
        ufoShapes: '/api/v1/filters/ufo-shapes',
        phenomena: '/api/v1/filters/phenomena'
      }
    }
  });
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'UFO Sightings API - Documentation'
}));

// Swagger JSON endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API routes
app.use('/api/v1', sightingsRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
