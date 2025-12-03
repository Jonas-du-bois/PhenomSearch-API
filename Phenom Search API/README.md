# UFO Sightings API 🛸

REST API for the Hatch UFO Database - serving over 500 historical UFO sightings from 840 AD to modern times.

## Features

- 🚀 **Fast**: In-memory data loading, <500ms response times
- 🔍 **Powerful Filtering**: Filter by country, credibility, strangeness, locale, year range, duration, and more
- 📊 **Statistics**: Comprehensive statistics about the dataset
- 🌍 **CORS Enabled**: Public API accessible from anywhere
- 📖 **Well Documented**: Clear API endpoints and response formats
- 🐳 **Docker Ready**: Easy deployment with Docker
- ☁️ **Render.com Ready**: One-click deployment configuration

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express 4.x
- **Dependencies**: cors, dotenv (minimal, production-ready)
- **Database**: None (in-memory JSON data)

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev

# Or start production server
npm start
```

The API will be available at `http://localhost:3000`

### Docker

```bash
# Build image
docker build -t ufo-api .

# Run container
docker run -p 3000:3000 ufo-api
```

### Deploy to Render.com

1. Push this repository to GitHub
2. Connect your GitHub account to Render.com
3. Create a new Web Service
4. Select this repository
5. Render will automatically detect `render.yaml` and deploy

## API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### 1. Get Sightings (with filters)

```http
GET /api/v1/sightings
```

**Query Parameters:**
- `country` (string): Filter by country name
- `locale` (string): Filter by locale type (e.g., "Mountains", "Farmlands")
- `minCredibility` (number): Minimum credibility (0-15)
- `maxCredibility` (number): Maximum credibility (0-15)
- `minStrangeness` (number): Minimum strangeness (0-10)
- `maxStrangeness` (number): Maximum strangeness (0-10)
- `startYear` (number): Start year for date range
- `endYear` (number): End year for date range
- `minDuration` (number): Minimum duration in minutes
- `maxDuration` (number): Maximum duration in minutes
- `observerType` (string|array): Observer type code(s) (e.g., "MIL", "CIV")
- `ufoShape` (string|array): UFO shape code(s) (e.g., "SCR", "CIG")
- `phenomenon` (string|array): Phenomenon code(s) (e.g., "LND", "TRC")
- `search` (string): Text search in description, location, reference
- `limit` (number): Results per page (default: 50, max: 500)
- `offset` (number): Pagination offset (default: 0)

**Example Request:**
```http
GET /api/v1/sightings?country=France&minCredibility=5&maxStrangeness=8&locale=Mountains&startYear=1600&endYear=1800&limit=50&offset=0
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "Hatch_UDB_123",
      "date": "3/17/1458",
      "time": "~18:00",
      "location": "KYOTO",
      "country": "Japan",
      "description": "Many observer(s). Five stars circle the moon.",
      "credibility": 5,
      "strangeness": 8,
      "duration": 30,
      "locale": "Metropolis",
      "coordinates": {
        "lat": 35.0,
        "lng": 135.75
      },
      "observerTypes": ["GND", "CIV"],
      "ufoShapes": ["NLT"],
      "phenomena": ["WAV", "HST"]
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

### 2. Get Single Sighting

```http
GET /api/v1/sightings/:id
```

**Example Request:**
```http
GET /api/v1/sightings/Hatch_UDB_123
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "Hatch_UDB_123",
    "date": "3/17/1458",
    "time": "~18:00",
    "location": "KYOTO",
    "country": "Japan",
    "state": "Unknown",
    "description": "Many observer(s). Five stars circle the moon.",
    "credibility": 5,
    "strangeness": 8,
    "duration": 30,
    "locale": "Metropolis",
    "coordinates": {
      "lat": 35.0,
      "lng": 135.75
    },
    "coordinatesDMS": "35:00:00 N 135:45:00 E",
    "locationLink": "[Google Maps](https://www.google.com/maps/place/35.0,135.75)",
    "hatchDesc": "JAPAN:MANY OBS:FIVE STARS CIRCLE MOON",
    "observerTypes": [
      {
        "code": "GND",
        "description": "Observer(s) on ground"
      }
    ],
    "ufoShapes": [
      {
        "code": "NLT",
        "description": "Nightlights/points of light"
      }
    ],
    "phenomena": [
      {
        "code": "WAV",
        "description": "Wave/cluster/flap"
      }
    ],
    "attributes": ["GND: Observer(s) on ground", "..."],
    "reference": "HAINES, Richard Ph.D: PROJECT DELTA; 1994",
    "source": "Hatch",
    "type": "sighting"
  }
}
```

### 3. Get Statistics

```http
GET /api/v1/statistics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSightings": 527,
    "dateRange": {
      "minYear": 840,
      "maxYear": 1895,
      "span": 1055
    },
    "credibilityStats": {
      "min": 3,
      "max": 15,
      "avg": "6.42"
    },
    "strangenessStats": {
      "min": 3,
      "max": 10,
      "avg": "7.18"
    },
    "durationStats": {
      "min": 1,
      "max": 180,
      "avg": "45.32",
      "median": 30
    },
    "topCountries": [
      {"country": "France", "count": 89},
      {"country": "Japan", "count": 67}
    ],
    "observerTypeDistribution": {
      "GND": 412,
      "CIV": 356,
      "MIL": 78
    },
    "ufoShapeDistribution": {
      "NLT": 234,
      "SCR": 156,
      "CIG": 89
    },
    "sightingsWithCoordinates": 489
  }
}
```

### 4. Get Countries

```http
GET /api/v1/filters/countries
```

**Response:**
```json
{
  "success": true,
  "data": [
    "Belgium, Netherlands and Luxembourg",
    "France",
    "Germany",
    "Great Britain and Ireland",
    "Israel",
    "Italy",
    "Japan",
    "USA"
  ]
}
```

### 5. Get Locales

```http
GET /api/v1/filters/locales
```

**Response:**
```json
{
  "success": true,
  "data": [
    "Coastlands",
    "Farmlands",
    "Forest",
    "High Seas",
    "Metropolis",
    "Mountains",
    "Pasture",
    "Town & City"
  ]
}
```

### 6. Get Observer Types

```http
GET /api/v1/filters/observer-types
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "GND",
      "description": "Ground Observers - Observateur(s) au sol"
    },
    {
      "code": "MIL",
      "description": "Military Observers - Observateur(s) militaires"
    }
  ]
}
```

### 7. Get UFO Shapes

```http
GET /api/v1/filters/ufo-shapes
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "SCR",
      "description": "Saucer/Classic - Soucoupe classique, disque ou sphère"
    },
    {
      "code": "CIG",
      "description": "Cigar/Torpedo - Torpille, cigare ou cylindre"
    }
  ]
}
```

### 8. Get Phenomena

```http
GET /api/v1/filters/phenomena
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "WAV",
      "description": "Wave/Cluster/Flap - Vague, cluster ou flap"
    },
    {
      "code": "LND",
      "description": "Landing - Atterrissage d'OVNI"
    }
  ]
}
```

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400
  }
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Environment Variables

```env
PORT=3000
NODE_ENV=production
DATA_FILE=./src/data/hatch_udb.json
CORS_ORIGIN=*
```

## Project Structure

```
ufo-api/
├── src/
│   ├── app.js                      # Express app configuration
│   ├── server.js                   # Server entry point
│   ├── data/
│   │   ├── hatch_udb.json         # UFO sightings data
│   │   └── loader.js              # Data loading & caching
│   ├── controllers/
│   │   └── sightingsController.js # Request handlers
│   ├── routes/
│   │   └── sightings.js           # API routes
│   ├── middleware/
│   │   ├── errorHandler.js        # Error handling
│   │   └── validation.js          # Input validation
│   └── utils/
│       ├── filters.js             # Filtering logic
│       └── formatters.js          # Response formatting
├── package.json
├── Dockerfile
├── render.yaml
└── README.md
```

## Performance

- ⚡ Data loaded once at startup (in-memory)
- 📦 ~500+ sightings served
- ⏱️ Average response time: <100ms (local), <500ms (production)
- 💾 Memory footprint: ~50MB

## Data Source

The Hatch UFO Database contains historical UFO sightings from 840 AD to 1895+, compiled by researcher Larry Hatch. Each sighting includes:
- Date, time, and location
- Credibility rating (3-15)
- Strangeness rating (3-10)
- Observer types
- UFO shapes
- Associated phenomena
- Detailed descriptions and references

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for UFO researchers and enthusiasts worldwide 🛸
