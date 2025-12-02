# 🛸 UFO Sightings API - Quick Start Guide

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Data**: 18,116 historical UFO sightings (year 70 - 1895+)

---

## 📦 What's Included

### API Features
- ✅ **8 GET Endpoints** - Complete REST API
- ✅ **18,116 Sightings** - Loaded from Hatch UFO Database
- ✅ **15+ Filters** - Country, credibility, strangeness, year, duration, etc.
- ✅ **Pagination** - Efficient data retrieval
- ✅ **Statistics** - Global insights on UFO data
- ✅ **CORS Enabled** - Public API accessible from anywhere
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Input Validation** - Strict parameter checking

### Documentation
- ✅ **README.md** - Complete API documentation
- ✅ **EXAMPLES.md** - 20+ usage examples
- ✅ **ARCHITECTURE.md** - Technical deep dive
- ✅ **DEPLOY.md** - Render.com deployment guide
- ✅ **CONTRIBUTING.md** - Contribution guidelines
- ✅ **CHANGELOG.md** - Version history

### Deployment
- ✅ **Dockerfile** - Production-ready Docker image
- ✅ **render.yaml** - Auto-deploy on Render.com
- ✅ **.env.example** - Environment configuration
- ✅ **nodemon.json** - Development auto-reload

---

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies

```bash
cd ufo-api
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# .env is already configured with defaults
```

### 3. Start Server

```bash
# Development mode (auto-reload)
npm run dev

# Or production mode
npm start
```

**Server starts on**: http://localhost:3000

### 4. Test API

```bash
# Health check
curl http://localhost:3000/health

# Get 5 sightings
curl "http://localhost:3000/api/v1/sightings?limit=5"

# Get statistics
curl http://localhost:3000/api/v1/statistics

# Filter by France
curl "http://localhost:3000/api/v1/sightings?country=France&limit=10"
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/` | API information |
| GET | `/api/v1/sightings` | List sightings (with filters) |
| GET | `/api/v1/sightings/:id` | Get sighting by ID |
| GET | `/api/v1/statistics` | Global statistics |
| GET | `/api/v1/filters/countries` | List countries |
| GET | `/api/v1/filters/locales` | List locale types |
| GET | `/api/v1/filters/observer-types` | Observer types |
| GET | `/api/v1/filters/ufo-shapes` | UFO shapes |
| GET | `/api/v1/filters/phenomena` | Phenomena types |

---

## 🎯 Key Features

### Powerful Filtering

```bash
# Complex filter example
curl "http://localhost:3000/api/v1/sightings?\
country=France&\
minCredibility=7&\
startYear=1700&\
endYear=1800&\
locale=Mountains&\
limit=20"
```

### Rich Response Data

```json
{
  "success": true,
  "data": [
    {
      "id": "Hatch_UDB_123",
      "date": "3/17/1458",
      "location": "KYOTO",
      "country": "Japan",
      "description": "Five stars circle the moon.",
      "credibility": 5,
      "strangeness": 8,
      "coordinates": {"lat": 35.0, "lng": 135.75},
      "observerTypes": ["GND", "CIV"],
      "ufoShapes": ["NLT"],
      "phenomena": ["WAV", "HST"]
    }
  ],
  "pagination": {
    "total": 18116,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## 🐳 Docker Deployment

```bash
# Build image
docker build -t ufo-api .

# Run container
docker run -p 3000:3000 ufo-api

# Test
curl http://localhost:3000/health
```

---

## ☁️ Render.com Deployment

### Method 1: One-Click (with render.yaml)

1. Push to GitHub
2. Go to https://render.com
3. New → Blueprint
4. Select your repo
5. Deploy! ✅

### Method 2: Manual

1. New → Web Service
2. Connect GitHub repo
3. Build: `npm install`
4. Start: `npm start`
5. Add env vars (see .env.example)
6. Deploy! ✅

**See DEPLOY.md for detailed instructions**

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Total Sightings** | 18,116 |
| **Date Range** | Year 70 - 1895+ |
| **Countries** | 25+ |
| **Observer Types** | 8 |
| **UFO Shapes** | 8 |
| **Phenomena** | 23 |
| **Data File Size** | 25 MB |
| **Code Lines** | ~1,500 |
| **Dependencies** | 3 (production) |

---

## 🔧 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express 4.x
- **Dependencies**: cors, dotenv (minimal!)
- **Database**: None (in-memory JSON)
- **Deployment**: Docker, Render.com

---

## 📈 Performance

| Operation | Time |
|-----------|------|
| Startup (load data) | ~500ms |
| Health check | ~2ms |
| Sightings (10 items) | ~45ms |
| Sightings (500 items) | ~95ms |
| Single sighting | ~25ms |
| Statistics | ~180ms |
| Memory usage | ~120 MB |

**Tested on**: Local machine, 18,116 records

---

## 🎓 Learning Resources

### For API Usage
1. **EXAMPLES.md** - 20+ practical examples
2. **README.md** - Complete API reference
3. Test with Postman, curl, or browser

### For Development
1. **ARCHITECTURE.md** - System design
2. **CONTRIBUTING.md** - Development guide
3. Explore source code in `src/`

### For Deployment
1. **DEPLOY.md** - Render.com guide
2. **Dockerfile** - Container setup
3. **render.yaml** - Auto-deploy config

---

## 🛠️ Common Tasks

### Development

```bash
# Install dependencies
npm install

# Start dev server (auto-reload)
npm run dev

# Start production server
npm start
```

### Testing

```bash
# Manual API tests
bash test-api.sh

# Or individual tests
curl http://localhost:3000/health
curl "http://localhost:3000/api/v1/sightings?limit=5"
```

### Docker

```bash
# Build
docker build -t ufo-api .

# Run
docker run -p 3000:3000 -e NODE_ENV=production ufo-api

# Run with custom env
docker run -p 3000:3000 --env-file .env ufo-api
```

---

## 📚 File Structure

```
ufo-api/
├── src/                      # Source code
│   ├── app.js               # Express app
│   ├── server.js            # Server entry
│   ├── data/
│   │   ├── hatch_udb.json  # UFO data (25 MB)
│   │   └── loader.js        # Data loader
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Validation, errors
│   └── utils/               # Filters, formatters
├── package.json             # Dependencies
├── Dockerfile               # Docker config
├── render.yaml              # Render deployment
├── .env.example             # Environment template
├── README.md                # Main docs
├── EXAMPLES.md              # Usage examples
├── ARCHITECTURE.md          # Technical docs
├── DEPLOY.md                # Deployment guide
├── CONTRIBUTING.md          # Development guide
├── CHANGELOG.md             # Version history
└── LICENSE                  # MIT License
```

---

## 🔐 Environment Variables

```env
PORT=3000                              # Server port
NODE_ENV=production                    # Environment
DATA_FILE=./src/data/hatch_udb.json  # Data path
CORS_ORIGIN=*                          # CORS config
```

---

## 🌟 Example Queries

### Filter by high credibility
```bash
curl "http://localhost:3000/api/v1/sightings?minCredibility=8&limit=10"
```

### Filter by time period
```bash
curl "http://localhost:3000/api/v1/sightings?startYear=1600&endYear=1700&limit=20"
```

### Search text
```bash
curl "http://localhost:3000/api/v1/sightings?search=moon&limit=5"
```

### Multiple filters
```bash
curl "http://localhost:3000/api/v1/sightings?\
country=France&\
minStrangeness=8&\
observerType=MIL&\
limit=10"
```

### Get countries list
```bash
curl http://localhost:3000/api/v1/filters/countries
```

---

## 🆘 Troubleshooting

### Server won't start

**Check:**
1. Node version: `node --version` (need 18+)
2. Dependencies installed: `npm install`
3. Data file exists: `ls src/data/hatch_udb.json`
4. Port 3000 is free: `lsof -i :3000` (Unix) or `netstat -ano | findstr :3000` (Windows)

### Empty responses

**Check:**
1. Filters too restrictive
2. Use `limit=1` to test
3. Check logs for errors

### Memory errors

**Solution:**
- Increase Node memory: `node --max-old-space-size=4096 src/server.js`
- Or use smaller limit: `?limit=10`

---

## 📞 Support

- **Issues**: GitHub Issues
- **Docs**: README.md, EXAMPLES.md, ARCHITECTURE.md
- **Questions**: GitHub Discussions (to be set up)

---

## 🎉 Next Steps

1. ✅ **Deploy to Render.com** (see DEPLOY.md)
2. 📱 **Build a frontend** using this API
3. 🔍 **Explore the data** with filters
4. 📊 **Create visualizations** from statistics
5. 🤝 **Contribute** (see CONTRIBUTING.md)

---

## 🏆 Credits

- **Data**: Larry Hatch UFO Database
- **API**: Built with Express.js
- **Deployment**: Render.com ready

---

## 📜 License

MIT License - See LICENSE file

---

**🛸 Ready to explore 18,116 UFO sightings? Start the server and dive in!**

```bash
npm start
```

Then open: http://localhost:3000

**Happy UFO hunting! 👽✨**
