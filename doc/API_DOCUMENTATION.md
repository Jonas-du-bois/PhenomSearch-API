# UFO Sightings API - Documentation Complète

## Vue d'ensemble

L'API UFO Sightings fournit un accès aux données historiques d'observations d'OVNI provenant de la **Hatch UFO Database**. Elle contient environ **18 116 observations** couvrant plus d'un siècle de témoignages.

### URL de Base
```
https://[votre-domaine]/api/v1
```

### Caractéristiques
- ✅ API REST publique (pas d'authentification requise)
- ✅ Réponses en JSON
- ✅ Pagination intégrée
- ✅ Filtres multiples
- ✅ Documentation Swagger disponible à `/api-docs`

---

## Endpoints Disponibles

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/sightings/paginated` | GET | Liste paginée simple (page + perPage) |
| `/sightings` | GET | Liste avec filtres avancés (offset + limit) |
| `/sightings/:id` | GET | Détails d'une observation spécifique |
| `/statistics` | GET | Statistiques globales du dataset |
| `/filters/countries` | GET | Liste des pays disponibles |
| `/filters/locales` | GET | Types de localités |
| `/filters/observer-types` | GET | Types d'observateurs avec descriptions |
| `/filters/ufo-shapes` | GET | Formes d'OVNI avec descriptions |
| `/filters/phenomena` | GET | Phénomènes avec descriptions |

---

## 1. Endpoint Principal : `/sightings/paginated`

**Idéal pour un moteur de recherche avec navigation par pages.**

### Requête
```
GET /api/v1/sightings/paginated?page=1&perPage=50
```

### Paramètres
| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `page` | integer | 1 | Numéro de la page (commence à 1) |
| `perPage` | integer | 50 | Nombre d'observations par page (1-500) |

### Réponse
```json
{
  "success": true,
  "data": [
    {
      "id": "Hatch_UDB_1",
      "date": "6/24/1947",
      "time": "15:00",
      "location": "MOUNT RAINIER, WA",
      "country": "USA",
      "description": "Kenneth Arnold sees 9 objects flying in formation near Mt. Rainier.",
      "credibility": 10,
      "strangeness": 7,
      "duration": 180,
      "locale": "Mountains",
      "coordinates": {
        "lat": 46.8523,
        "lng": -121.7603
      },
      "observerTypes": ["GND", "CIV", "HQO"],
      "ufoShapes": ["SCR", "DLT"],
      "phenomena": ["WAV", "NOC"]
    }
    // ... autres observations
  ],
  "pagination": {
    "page": 1,
    "perPage": 50,
    "total": 18116,
    "totalPages": 363,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 2. Endpoint avec Filtres : `/sightings`

**Pour des recherches avancées avec multiples critères.**

### Requête
```
GET /api/v1/sightings?country=France&startYear=1950&endYear=2000&minCredibility=5&limit=20&offset=0
```

### Paramètres de Filtrage
| Paramètre | Type | Description |
|-----------|------|-------------|
| `country` | string | Filtrer par pays (recherche partielle) |
| `locale` | string | Type de localité |
| `startYear` | integer | Année minimum |
| `endYear` | integer | Année maximum |
| `minCredibility` | integer (0-15) | Crédibilité minimale |
| `maxCredibility` | integer (0-15) | Crédibilité maximale |
| `minStrangeness` | integer (0-10) | Étrangeté minimale |
| `maxStrangeness` | integer (0-10) | Étrangeté maximale |
| `minDuration` | integer | Durée minimale (secondes) |
| `maxDuration` | integer | Durée maximale (secondes) |
| `observerType` | string | Code(s) d'observateur (ex: "GND,MIL") |
| `ufoShape` | string | Code(s) de forme (ex: "SCR,CIG") |
| `phenomenon` | string | Code(s) de phénomène (ex: "RAY,LND") |
| `search` | string | Recherche textuelle dans description/location |
| `hasCoordinates` | boolean | Filtrer par présence de coordonnées GPS |

### Paramètres de Pagination
| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `limit` | integer | 50 | Nombre de résultats (1-500) |
| `offset` | integer | 0 | Position de départ |

### Réponse
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 245,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## 3. Détails d'une Observation : `/sightings/:id`

### Requête
```
GET /api/v1/sightings/Hatch_UDB_123
```

### Réponse (format détaillé)
```json
{
  "success": true,
  "data": {
    "id": "Hatch_UDB_123",
    "date": "7/2/1950",
    "time": "21:30",
    "location": "PARIS, FRANCE",
    "country": "France",
    "state": "Île-de-France",
    "description": "Multiple witnesses observe bright disc hovering over the city.",
    "credibility": 8,
    "strangeness": 6,
    "duration": 300,
    "locale": "Town & City",
    "coordinates": {
      "lat": 48.8566,
      "lng": 2.3522
    },
    "coordinatesDMS": "48°51'24\"N, 2°21'8\"E",
    "locationLink": "https://maps.google.com/?q=48.8566,2.3522",
    "hatchDesc": "Description originale de la base Hatch...",
    "observerTypes": [
      { "code": "GND", "description": "Ground Observers - Observateur(s) au sol" },
      { "code": "CIV", "description": "Civilian Observers - Observateur(s) civils" }
    ],
    "ufoShapes": [
      { "code": "SCR", "description": "Saucer/Classic - Soucoupe classique, disque ou sphère" }
    ],
    "phenomena": [
      { "code": "NLT", "description": "Nightlights - Points lumineux ou lueurs nocturnes" }
    ],
    "attributes": "GND CIV SCR NLT",
    "reference": "Source reference...",
    "source": "Hatch UFO Database",
    "type": "CE1"
  }
}
```

---

## 4. Statistiques : `/statistics`

### Requête
```
GET /api/v1/statistics
```

### Réponse
```json
{
  "success": true,
  "data": {
    "totalSightings": 18116,
    "dateRange": {
      "minYear": 840,
      "maxYear": 2015,
      "span": 1175
    },
    "credibilityStats": {
      "min": 1,
      "max": 15,
      "avg": "6.42"
    },
    "strangenessStats": {
      "min": 1,
      "max": 10,
      "avg": "5.18"
    },
    "durationStats": {
      "min": 1,
      "max": 99,
      "avg": "23.45",
      "median": 15
    },
    "topCountries": [
      { "country": "USA", "count": 8542 },
      { "country": "Great Britain and Ireland", "count": 1823 },
      { "country": "France", "count": 1156 }
      // ... top 10
    ],
    "observerTypeDistribution": {
      "GND": 15234,
      "CIV": 12456,
      "MIL": 2341
      // ...
    },
    "ufoShapeDistribution": {
      "SCR": 8234,
      "NLT": 5678,
      "CIG": 3421
      // ...
    },
    "sightingsWithCoordinates": 16542
  }
}
```

---

## 5. Endpoints de Filtres

### `/filters/countries`
Retourne la liste unique des pays.
```json
{
  "success": true,
  "data": ["USA", "France", "Great Britain and Ireland", "Canada", ...]
}
```

### `/filters/locales`
Types de localités disponibles.
```json
{
  "success": true,
  "data": ["Town & City", "Rural", "Mountains", "Farmlands", "Coastal", ...]
}
```

### `/filters/observer-types`
```json
{
  "success": true,
  "data": [
    { "code": "GND", "description": "Ground Observers - Observateur(s) au sol" },
    { "code": "MIL", "description": "Military Observers - Observateur(s) militaires" },
    { "code": "CIV", "description": "Civilian Observers - Observateur(s) civils" },
    { "code": "HQO", "description": "High-Quality Observers - Observateur(s) de haute qualité" },
    { "code": "SCI", "description": "Scientist Involvement - Implication de scientifiques" },
    { "code": "CST", "description": "Coastal Observers - Observateur(s) en zone côtière" },
    { "code": "SEA", "description": "Sea Observers - Observateur(s) en mer" },
    { "code": "NWS", "description": "News Media Report - Rapport médias/presse" }
  ]
}
```

### `/filters/ufo-shapes`
```json
{
  "success": true,
  "data": [
    { "code": "SCR", "description": "Saucer/Classic - Soucoupe classique, disque ou sphère" },
    { "code": "CIG", "description": "Cigar/Torpedo - Torpille, cigare ou cylindre" },
    { "code": "DLT", "description": "Delta/Boomerang - Delta, V, boomerang ou forme rectangulaire" },
    { "code": "NLT", "description": "Nightlights - Points lumineux ou lueurs nocturnes" },
    { "code": "FBL", "description": "Fireball - Boule de feu, forme brillante indistincte" },
    { "code": "FIG", "description": "Figure/Entity - Figure ou entité mal définie" },
    { "code": "PRB", "description": "Probe - Sonde (probablement télécommandée)" },
    { "code": "NFO", "description": "No Craft - Aucun engin vu (entités seules)" }
  ]
}
```

### `/filters/phenomena`
```json
{
  "success": true,
  "data": [
    { "code": "WAV", "description": "Wave/Cluster/Flap - Vague, cluster ou flap" },
    { "code": "TCH", "description": "Technical Details - Nouveaux détails techniques" },
    { "code": "HST", "description": "Historical Account - Compte rendu historique" },
    { "code": "SND", "description": "Sounds - Sons d'OVNI entendus ou enregistrés" },
    { "code": "ODD", "description": "Atypical/Paranormal - Atypique, Forteana ou paranormal" },
    { "code": "MID", "description": "Misidentification - Probable mésidentification" },
    { "code": "RAY", "description": "Light/Beam - Lumière bizarre, projecteur, faisceau" },
    { "code": "SIG", "description": "Signals - Signaux, réponses ou communications" },
    { "code": "LND", "description": "Landing - Atterrissage d'OVNI" },
    { "code": "SUB", "description": "Submersible - Émerge de l'eau ou s'y immerge" },
    { "code": "OBS", "description": "Observation/Chase - Véhicules d'observation ou de poursuite" },
    { "code": "VEH", "description": "Vehicle Affected - Véhicule affecté" },
    { "code": "TRC", "description": "Physical Traces - Traces physiques directes" },
    { "code": "DRT", "description": "Dirt/Soil Marks - Traces de terre, sol, marques" },
    { "code": "VEG", "description": "Vegetation - Plantes affectées" },
    { "code": "PHT", "description": "Photos/Video - Photos, films ou vidéos prises" },
    { "code": "RDA", "description": "Radiation - Radiation détectée" },
    { "code": "BLD", "description": "Buildings/Structures - Bâtiment affecté" },
    { "code": "OID", "description": "Humanoid/Grey - Humanoïde, petit extraterrestre" },
    { "code": "NOC", "description": "No Entity - Aucune entité vue" },
    { "code": "ANI", "description": "Animals Affected - Animaux affectés" },
    { "code": "HUM", "description": "Humans Affected - Humains affectés" },
    { "code": "INJ", "description": "Injuries - Blessures, maladie, mort" }
  ]
}
```

---

## Structure des Données

### Observation (format liste)
```typescript
interface Sighting {
  id: string;              // Identifiant unique (ex: "Hatch_UDB_123")
  date: string;            // Date (format variable: "6/24/1947", "1950?", etc.)
  time: string;            // Heure ou "Unknown"
  location: string;        // Lieu de l'observation
  country: string;         // Pays
  description: string;     // Description de l'observation
  credibility: number;     // Score 0-15 (qualité des témoins/preuves)
  strangeness: number;     // Score 0-10 (degré d'étrangeté)
  duration: number;        // Durée en secondes (estimation)
  locale: string;          // Type de lieu (Town & City, Rural, etc.)
  coordinates: {           // Peut être null
    lat: number;
    lng: number;
  } | null;
  observerTypes: string[]; // Codes des types d'observateurs
  ufoShapes: string[];     // Codes des formes observées
  phenomena: string[];     // Codes des phénomènes associés
}
```

### Observation (format détaillé - via /:id)
Inclut en plus :
- `state`: État/Province
- `coordinatesDMS`: Coordonnées en format DMS
- `locationLink`: Lien Google Maps
- `hatchDesc`: Description originale Hatch
- `observerTypes/ufoShapes/phenomena`: Avec descriptions complètes
- `attributes`: Attributs bruts
- `reference`: Référence source
- `source`: Source de l'information
- `type`: Type d'observation

---

## Exemples d'Utilisation pour Votre Application

### 1. Charger la page initiale du moteur de recherche
```javascript
// Récupérer les 50 premières observations
const response = await fetch('https://api.example.com/api/v1/sightings/paginated?page=1&perPage=50');
const { data, pagination } = await response.json();

// Afficher les données
console.log(`${pagination.total} observations trouvées`);
console.log(`Page ${pagination.page}/${pagination.totalPages}`);
```

### 2. Pagination (page suivante)
```javascript
const nextPage = pagination.page + 1;
const response = await fetch(`https://api.example.com/api/v1/sightings/paginated?page=${nextPage}&perPage=50`);
```

### 3. Recherche avec filtres
```javascript
const params = new URLSearchParams({
  country: 'France',
  startYear: '1950',
  endYear: '2000',
  minCredibility: '5',
  ufoShape: 'SCR',
  limit: '20',
  offset: '0'
});

const response = await fetch(`https://api.example.com/api/v1/sightings?${params}`);
```

### 4. Recherche textuelle
```javascript
const response = await fetch('https://api.example.com/api/v1/sightings?search=triangle&limit=50');
```

### 5. Afficher les détails d'une observation
```javascript
const response = await fetch(`https://api.example.com/api/v1/sightings/${sightingId}`);
const { data } = await response.json();

// Afficher sur une carte
if (data.coordinates) {
  map.addMarker(data.coordinates.lat, data.coordinates.lng);
}
```

### 6. Charger les options de filtres pour l'UI
```javascript
// Charger tous les filtres en parallèle
const [countries, shapes, phenomena, observers] = await Promise.all([
  fetch('https://api.example.com/api/v1/filters/countries').then(r => r.json()),
  fetch('https://api.example.com/api/v1/filters/ufo-shapes').then(r => r.json()),
  fetch('https://api.example.com/api/v1/filters/phenomena').then(r => r.json()),
  fetch('https://api.example.com/api/v1/filters/observer-types').then(r => r.json())
]);

// Utiliser pour peupler des dropdowns/checkboxes
```

### 7. Afficher des statistiques globales
```javascript
const response = await fetch('https://api.example.com/api/v1/statistics');
const { data } = await response.json();

// Pour un graphique de distribution par pays
const countryChart = data.topCountries;

// Pour une timeline
const yearRange = data.dateRange;
```

### 8. Visualisation sur carte (observations avec coordonnées)
```javascript
// Filtrer uniquement les observations avec coordonnées GPS
const response = await fetch('https://api.example.com/api/v1/sightings?hasCoordinates=true&limit=500');
const { data } = await response.json();

data.forEach(sighting => {
  if (sighting.coordinates) {
    map.addMarker({
      lat: sighting.coordinates.lat,
      lng: sighting.coordinates.lng,
      title: sighting.location,
      popup: sighting.description
    });
  }
});
```

---

## Gestion des Erreurs

### Format d'erreur
```json
{
  "success": false,
  "error": {
    "message": "Description de l'erreur",
    "statusCode": 400,
    "details": ["minCredibility must be between 0 and 15"]
  }
}
```

### Codes HTTP
| Code | Description |
|------|-------------|
| 200 | Succès |
| 400 | Paramètres invalides |
| 404 | Observation non trouvée |
| 500 | Erreur serveur |

---

## Bonnes Pratiques

1. **Pagination** : Utilisez toujours la pagination pour éviter de charger trop de données.
2. **Cache** : Mettez en cache les filtres (`/filters/*`) car ils changent rarement.
3. **Recherche** : Combinez plusieurs filtres pour des résultats pertinents.
4. **Carte** : Utilisez `hasCoordinates=true` pour afficher sur une carte.
5. **Performances** : Limitez `perPage` à 100 max pour une UX fluide.

---

## Health Check

```
GET /health
```

Réponse :
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-12-03T10:30:00.000Z",
  "uptime": 3600.5
}
```
