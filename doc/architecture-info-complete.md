# 🏗️ ARCHITECTURE D'INFORMATION - UFO/OVNI Database

## 📊 DOCUMENT SYNTHÈSE - Tous les livrables requis

---

## PARTIE 1: CONCEPTUALISATION & STRATÉGIE

### 1.1 Introduction & Positionnement

**Sujet:** Observations d'OVNI/UFO - Hatch Database  
**Angle original:** Une approche exploratoire ET analytique pour l'accès aux données d'observations

**Valeur ajoutée:** 
- Parcours simple d'exploration (grand public)
- Accès avancé aux filtres (chercheurs/professionnels)
- Navigation structurée (non seulement recherche libre)
- Contextualisation historique et géographique

---

### 1.2 Personas (Minimum 1, nous en proposons 3)

#### Persona 1: **Emma - Curieuse / Grand public**
- **Âge:** 28 ans, journaliste freelance
- **Motivation:** Explorer les cas célèbres, comprendre le phénomène OVNI
- **Comportement:** Recherche opportuniste, découverte guidée
- **Besoins:** Navigation simple, cas remarquables, contexte historique
- **Pain points:** Ne sait pas par où commencer, trop de paramètres techniques
- **Utilisation:** 1-2 fois par mois, 10-15 minutes
- **Scénario:** "Je veux découvrir les cas les plus célèbres en France"

#### Persona 2: **Marc - Chercheur / Professionnel**
- **Âge:** 45 ans, historien/chercheur UFO
- **Motivation:** Analyser les données, comparer les patterns, documenter trends
- **Comportement:** Recherche précise, filtres multiples, export données
- **Besoins:** Filtrage avancé, statistiques, tous les paramètres disponibles
- **Pain points:** Interface trop simplifiée, manque de profondeur analytique
- **Utilisation:** 3-4 fois par semaine, 30-45 minutes
- **Scénario:** "Je veux comparer les observations militaires (1960-1980) vs civiles en Suisse"

#### Persona 3: **Sophie - Passionnée / Enthousiaste**
- **Âge:** 35 ans, passionnée OVNI, blogueuse
- **Motivation:** Créer du contenu, trouver des histoires intéressantes
- **Comportement:** Navigation mixte (exploration + recherche ciblée)
- **Besoins:** Balance entre simplicité et filtres, partage facile, détails riches
- **Pain points:** Ni trop simple ni trop complexe
- **Utilisation:** Quotidienne, 15-20 minutes
- **Scénario:** "Trouver des cas avec traces physiques pour mon article"

---

### 1.3 Méthodologie: Design Thinking (Centré utilisateurs)

#### Phase 1: EMPATHIZE ✅ (Déjà fait)
- Recherche utilisateurs (3 personas ci-dessus)
- Analyse des besoins varié (exploration → analytique)
- Identification des pain points (navigation, filtres, accessibilité)

#### Phase 2: DEFINE (En cours)
- Définir le problème: "Comment rendre l'accès aux données OVNI simple ET puissant?"
- Point de vue utilisateur: "Emma a besoin de découvrir facilement", "Marc a besoin d'analyser précisément"
- Objectif: Navigation structurée (pas seulement recherche libre)

#### Phase 3: IDEATE (Propositions ci-dessous)
- 3 points d'entrée distincts (exploration, catégories, recherche avancée)
- Parcours progressif (simple → détaillé)
- Architecture en couches (accessible → technique)

#### Phase 4: PROTOTYPE (À faire)
- Wireframes/mockups des écrans clés
- Prototype interactif (Figma, Adobe XD, ou Notion)
- Test avec utilisateurs réels

#### Phase 5: TEST (À faire)
- Tests avec 5+ utilisateurs externes
- Observations & feedback
- Itérations

---

## PARTIE 2: ARCHITECTURE DE L'INFORMATION

### 2.1 Les 3 Points d'Entrée (Points d'Accès Clés)

#### 🎯 **POINT D'ENTRÉE 1: EXPLORATION GUIDÉE** (Pour Emma)

**Concept:** Découverte guidée par catégories prédéfinies, pas de recherche initialement

**Écrans/Sections:**
```
HOME PAGE
├─ "Découvrez les observations remarquables"
│  ├─ Card 1: "Les plus crédibles" 
│  │           (Crédibilité >= 10, triées par date récente)
│  ├─ Card 2: "Les plus étranges"
│  │           (Étrangeté = 10, triées par date)
│  └─ Card 3: "Avec traces physiques"
│              (Phénomènes = TRC/VEG/RDA, any credibility)
│
├─ "Explorez par période historique"
│  ├─ Timeline visuelle: 840 → 1895 → 2000
│  ├─ Moyen Âge (840-1299)
│  ├─ Renaissance (1300-1599)
│  ├─ Époque moderne (1600-1899)
│  ├─ Contemporain (1900-1950)
│  └─ Ère moderne (1950+)
│
├─ "Explorez par géographie"
│  ├─ Carte du monde interactive
│  ├─ Liste par région: Europe, Asie, Amérique
│  ├─ France (10+ observations)
│  ├─ USA (50+ observations)
│  └─ Japon, Grande-Bretagne, Russie, etc.
│
└─ "Collections curatées"
   ├─ Cas historiques célèbres
   ├─ Observations militaires
   └─ Cas avec humanoides
```

**Interaction:**
- User clique sur "Les plus crédibles" → Liste paginée (50 résultats)
- User clique sur une observation → Vue détail complète
- User clique sur "Voir tous les cas France" → Résultats filtrés pré-définis
- **Pas de barre de recherche en avant** (volontairement cachée)

**Meilleur pour:** Emma (curieuse), Sophie (enthousiaste découverte)

---

#### 🔍 **POINT D'ENTRÉE 2: CATÉGORIES FACETTÉES** (Pour Sophie/Marc intermédiaire)

**Concept:** Filtres organisés par catégories hiérarchiques, facettes visibles

**Écrans/Sections:**
```
BROWSE PAGE
├─ LEFT SIDEBAR (Filtres)
│  ├─ LOCALISATION
│  │  ├─ Pays (dropdown): France, USA, Japon, ...
│  │  └─ Type de lieu (checkboxes): Montagne, Ferme, Métropole, Mer, ...
│  │
│  ├─ QUALITÉ & CRÉDIBILITÉ
│  │  ├─ Crédibilité (slider): 3 ← ───── ─── → 15
│  │  ├─ Étrangeté (slider): 3 ← ─── → 10
│  │  └─ Toggle: Exclure mésidentifications (MID)
│  │
│  ├─ PÉRIODE
│  │  └─ Années (range): 1600 ←─────────→ 2000
│  │
│  ├─ MORPHOLOGIE & PHÉNOMÈNES
│  │  ├─ Forme UFO (checkboxes): Soucoupe, Cigare, Delta, Points lumineux, ...
│  │  ├─ Type d'observateurs (checkboxes): Militaires, Civils, Scientifiques
│  │  └─ Phénomènes (checkboxes): Atterrissage, Sons, Traces, Humanoides, ...
│  │
│  └─ [FILTRER] button
│
└─ MAIN AREA
   ├─ Résultats: X observations trouvées
   ├─ Tri par: Date / Crédibilité / Étrangeté
   └─ Liste: Cards avec image/icônes + résumé
```

**Interaction:**
- User select "Japon" → résultats filtrés
- User move crédibilité slider → résultats mis à jour en temps réel
- User select "Militaires" + "Delta" → combinaison filtrée
- User clique sur card → Vue détail
- User peut reset tous les filtres (bouton visible)

**Meilleur pour:** Sophie (parcours mixte), Marc (filtrage intermédiaire)

---

#### 🚀 **POINT D'ENTRÉE 3: RECHERCHE AVANCÉE** (Pour Marc)

**Concept:** Recherche textuelle + filtres techniques pour power users

**Écrans/Sections:**
```
SEARCH / ADVANCED PAGE
├─ TOP BAR
│  └─ Search box with autocomplete
│     "Rechercher: tapez pays, période, observer types..."
│
├─ ADVANCED FILTERS (Tous visibles)
│  ├─ Localisation
│  │  ├─ Country (multiselect)
│  │  ├─ State/Province (multiselect)
│  │  ├─ Locale (multiselect)
│  │  └─ Coordinates (lat/lng radius search)
│  │
│  ├─ Dates & Durée
│  │  ├─ Date range (min-max)
│  │  ├─ Heure d'observation (range)
│  │  └─ Duration (range en minutes)
│  │
│  ├─ Crédibilité & Étrangeté
│  │  ├─ Credibility (min-max)
│  │  └─ Strangeness (min-max)
│  │
│  ├─ Observateurs (multiselect)
│  │  └─ GND, MIL, CIV, HQO, SCI, etc.
│  │
│  ├─ UFO Shape (multiselect)
│  │  └─ SCR, CIG, DLT, NLT, FBL, etc.
│  │
│  ├─ Phenomena (multiselect)
│  │  └─ WAV, SND, TRC, LND, ANI, HUM, etc.
│  │
│  ├─ Mésidentification (toggle)
│  │  └─ Include / Exclude
│  │
│  └─ [SEARCH] [RESET] [SAVE SEARCH]
│
├─ RESULTS
│  ├─ Pagination: X résultats (50 par page, max 500)
│  ├─ Export options: CSV, JSON
│  ├─ Statistiques: X cas, date range, avg credibility/strangeness
│  └─ Vue: List / Table / Map
│
└─ SAVED SEARCHES (pour users connectés, optionnel)
   ├─ Ma recherche 1: Cas militaires 1960-1980
   ├─ Ma recherche 2: Observations France avec traces
   └─ Add current as saved...
```

**Interaction:**
- User tape "France 1970" → autocomplétion
- User sélectionne multiple filters
- User clique [SEARCH] → résultats
- User voit stats générales en haut
- User peut switcher entre List/Table/Map view
- User peut exporter en CSV/JSON

**Meilleur pour:** Marc (chercheur), analyses approfondies

---

### 2.2 Arborescence complète du produit

```
UFO OBSERVATORY
│
├─ HOME (Landing page exploratoire)
│  ├─ Hero section + intro
│  ├─ Quick discovery: 3 featured collections
│  ├─ Interactive timeline
│  ├─ Interactive map
│  ├─ Latest cases
│  └─ About the data
│
├─ EXPLORE (Point d'entrée 1: Découverte guidée)
│  ├─ Remarkable cases
│  │  ├─ Most credible (pre-filtered: credibility >= 10)
│  │  ├─ Most strange (pre-filtered: strangeness = 10)
│  │  └─ Physical traces (pre-filtered: phenomena contains TRC)
│  │
│  ├─ Historical periods
│  │  ├─ Ancient & Medieval (840-1299)
│  │  ├─ Renaissance (1300-1599)
│  │  ├─ Early modern (1600-1799)
│  │  ├─ Industrial era (1800-1899)
│  │  └─ Modern era (1900+)
│  │
│  ├─ Geographical regions
│  │  ├─ Europe
│  │  │  ├─ France
│  │  │  ├─ Great Britain
│  │  │  ├─ Germany
│  │  │  └─ (other EU countries)
│  │  ├─ Asia
│  │  │  ├─ Japan
│  │  │  ├─ Korea
│  │  │  └─ (other Asian countries)
│  │  └─ Americas
│  │     ├─ USA
│  │     └─ (other Americas)
│  │
│  └─ Curated collections
│     ├─ Famous historical cases
│     ├─ Military observations
│     ├─ Cases with humanoids
│     └─ High credibility civilian reports
│
├─ BROWSE (Point d'entrée 2: Catégories facettées)
│  ├─ Filtered list view
│  │  ├─ Left: Faceted filters (collapsible)
│  │  │  ├─ Location
│  │  │  ├─ Quality & credibility
│  │  │  ├─ Period
│  │  │  ├─ UFO morphology
│  │  │  ├─ Observers
│  │  │  └─ Phenomena
│  │  │
│  │  └─ Main: Results
│  │     ├─ Sorting options
│  │     ├─ Pagination
│  │     └─ Cards list
│  │
│  └─ View modes
│     ├─ List view (cards)
│     └─ Table view
│
├─ SEARCH (Point d'entrée 3: Recherche avancée)
│  ├─ Search bar + autocomplete
│  ├─ Advanced filters (all visible)
│  │  ├─ All location params
│  │  ├─ All date/time params
│  │  ├─ All quality params
│  │  ├─ All morphology params
│  │  ├─ All observer params
│  │  └─ All phenomenon params
│  │
│  ├─ Results
│  │  ├─ Statistics dashboard
│  │  ├─ Export options (CSV, JSON)
│  │  ├─ View modes (List, Table, Map)
│  │  └─ Pagination (max 500)
│  │
│  └─ Saved searches (optionnel)
│
├─ OBSERVATION DETAIL
│  ├─ Full record
│  │  ├─ Date & time & location
│  │  ├─ Description narrative
│  │  ├─ Credibility & strangeness scores
│  │  ├─ Observers types + descriptions
│  │  ├─ UFO shape + description
│  │  ├─ Phenomena + descriptions
│  │  ├─ Geographic coordinates + map
│  │  ├─ Bibliography & sources
│  │  └─ Duration & other metadata
│  │
│  └─ Related
│     ├─ Similar cases (same region, era)
│     ├─ Same observer types
│     └─ Same phenomena
│
├─ STATISTICS (Dashboard optionnel)
│  ├─ Global statistics
│  ├─ Charts & graphs
│  ├─ Trends over time
│  └─ Geographic distribution
│
└─ ABOUT
   ├─ About the project
   ├─ Data source (Hatch Database)
   ├─ Methodology
   ├─ Credits
   └─ Contact
```

---

## PARTIE 3: USE CASES (UML)

### 3.1 Acteurs principaux
- **Emma** (Grand public / Curieuse)
- **Marc** (Chercheur / Power user)
- **Sophie** (Passionnée / Content creator)
- **Système** (API backend)

### 3.2 Use Cases clés

```
EXPLORE GUIDED DISCOVERY (Emma)
─────────────────────────────
Acteur primaire: Emma (grand public)
Précondition: Emma est sur la page d'accueil
Flow principal:
  1. Emma voit 3 collections remarquables (Crédibles, Étranges, Traces)
  2. Emma clique sur "Les plus crédibles"
  3. Système retourne liste paginée (50 résultats, filtre pré-appliqué)
  4. Emma voit cards avec: date, location, shape, credibility score
  5. Emma clique sur une card
  6. Système affiche détail complet: description narrative, phenomena, sources
  7. Emma lit et explore
  8. Emma clique "Cas similaires" (même région/période)
Postcondition: Emma a découvert 2-3 cas intéressants

BROWSE WITH FACETED FILTERS (Sophie)
────────────────────────────────────
Acteur primaire: Sophie (enthousiaste)
Précondition: Sophie est sur page Browse
Flow principal:
  1. Sophie voit liste complète + filtres latéraux
  2. Sophie sélectionne "Japon" dans pays dropdown
  3. Système filtre en temps réel
  4. Sophie move slider "Crédibilité" à minimum 6
  5. Système met à jour résultats
  6. Sophie sélectionne "Militaires" dans observateurs
  7. Système combine filtres (Japon AND Crédibilité>=6 AND Militaires)
  8. Sophie trie par "Étrangeté" décroissante
  9. Sophie clique sur intéressant → Détail
Postcondition: Sophie a trouvé 3 cas pour son article

ADVANCED SEARCH ANALYSIS (Marc)
──────────────────────────────
Acteur primaire: Marc (chercheur)
Précondition: Marc est sur page Search
Flow principal:
  1. Marc tape "Suisse" dans search box
  2. Autocomplétion suggère "Switzerland" + "Swiss observers"
  3. Marc sélectionne "Switzerland"
  4. Marc sélectionne année range: 1960-1980
  5. Marc sélectionne observateurs: Militaires (MIL) + Scientifiques (SCI)
  6. Marc sélectionne phénomènes: Atterrissage (LND) + Traces (TRC)
  7. Marc clique [SEARCH]
  8. Système retourne: 12 résultats, stats (avg credibility, avg strangeness, date range)
  9. Marc voit résultats en vue Table
  10. Marc clique [EXPORT] → CSV download
  11. Marc ouvre CSV dans Excel pour analyser patterns
Postcondition: Marc a les données pour son article de recherche

VIEW OBSERVATION DETAIL (Tous)
─────────────────────────────
Acteur primaire: Emma/Sophie/Marc
Précondition: Utilisateur a cliqué sur une observation
Flow principal:
  1. Système charge détail complet
  2. Affiche: date/heure, location, description, scores, phenomena, observers
  3. Affiche: coordonnées GPS + embedded map
  4. Affiche: sources & bibliographie
  5. Affiche: "Cas similaires" en bas
  6. User peut: revenir en arrière, voir cas similaire, copier lien
Postcondition: User a compris complètement l'observation
```

---

## PARTIE 4: PROCESSUS BPMN

### 4.1 Scénario principal: User découvre observation intéressante

```
PROCESSUS: Emma explore et découvre un cas remarquable
═══════════════════════════════════════════════════════

START: Emma ouvre l'app
    │
    ↓
[AFFICHER] Home page avec 3 collections
    │
    ↓
{DÉCISION} Emma intéressée par quoi?
    │
    ├─→ "Les plus crédibles"
    │     │
    │     ↓
    │  [CHARGER] Filtre: credibility >= 10
    │     │
    │     ↓
    │  [AFFICHER] Liste paginée (50 résultats)
    │     │
    │     ↓
    │  [TRIER] Par date décroissante
    │
    └─→ "Avec traces physiques"
          │
          ↓
       [CHARGER] Filtre: phenomena contains TRC/VEG/RDA
          │
          ↓
       [AFFICHER] Liste paginée

FUSION: Les deux chemins se réunissent
    │
    ↓
{DÉCISION} Emma choisit une observation?
    │
    ├─→ OUI
    │    │
    │    ↓
    │ [CHARGER] Détail complet
    │    │
    │    ↓
    │ [AFFICHER] Full record + description + map + sources
    │    │
    │    ↓
    │ [OPTIONNEL] Emma clique "Cas similaires"
    │    │
    │    ↓
    │ [CHARGER] Observations connexes
    │    │
    │    ↓
    │ {DÉCISION} Continuer exploration?
    │    │
    │    ├─→ OUI: Boucle (revenir au step détail)
    │    └─→ NON: ↓
    │
    └─→ NON
         │
         ↓
    {DÉCISION} Continuer browsing?
         │
         ├─→ OUI: Voir plus (pagination) → Boucle
         └─→ NON: ↓

END: Emma quitte l'app

Système parallèle: Chaque action log données (analytics)
```

### 4.2 Scénario secondaire: Marc recherche avec filtres avancés

```
PROCESSUS: Marc recherche des cas précis
══════════════════════════════════════════

START: Marc clique "Search"
    │
    ↓
[AFFICHER] Search page + advanced filters
    │
    ↓
[USER INPUTS] Marc select:
    ├─ Country: Switzerland
    ├─ Year range: 1960-1980
    ├─ Observers: Militaires + Scientifiques
    ├─ Phenomena: Atterrissage + Traces
    └─ Credibility: minimum 7

    ↓
[VALIDER] Paramètres (Check ranges, types, etc.)
    │
    ├─→ Erreur? Afficher message + Correction
    │
    └─→ Valide? Continue

    ↓
[SEARCH] Appeler API avec filters
    │
    ↓
[API PROCESS]
    ├─ Parse filters
    ├─ Query dataset in-memory
    ├─ Apply all filters (AND logic)
    ├─ Sort results
    ├─ Calculate statistics
    └─ Return paginated results

    ↓
[AFFICHER] Résultats
    ├─ "12 observations found"
    ├─ Statistics box
    ├─ Results in table view
    └─ Export button

    ↓
{DÉCISION} Marc veut exporter?
    │
    ├─→ OUI
    │    │
    │    ↓
    │ [GENERATE CSV]
    │    │
    │    ↓
    │ [DOWNLOAD] File to Marc's computer
    │
    └─→ NON
         │
         ↓
    [DISPLAY] Peut modifier filters (réitérer)

    ↓
END: Marc a les données pour analyse
```

---

## PARTIE 5: WIREFRAMES & STRUCTURE VISUELLE

### 5.1 Layout général (Responsive)

```
┌─────────────────────────────────────┐
│         HEADER / NAVIGATION         │
│  Logo | Explore | Browse | Search   │
└─────────────────────────────────────┘
│                                       │
│  ╔═══════════════════════════════╗   │
│  ║    MAIN CONTENT AREA          ║   │
│  ║  (dépend de la page)          ║   │
│  ║                               ║   │
│  ║  - HOME: Hero + Collections   ║   │
│  ║  - EXPLORE: Guided discovery  ║   │
│  ║  - BROWSE: Filters + Results  ║   │
│  ║  - SEARCH: Advanced search    ║   │
│  ║                               ║   │
│  ╚═══════════════════════════════╝   │
│                                       │
└─────────────────────────────────────┘
│         FOOTER                        │
│  About | Data | Contact | Legal       │
└─────────────────────────────────────┘
```

### 5.2 Page EXPLORE (Point d'entrée 1)

```
HOME PAGE - EXPLORE
═══════════════════

┌─────────────────────────────────────┐
│ 🔭 UFO Observatory - Discover      │
│    Amazing observations from        │
│    840 to 2000                      │
└─────────────────────────────────────┘

SECTION 1: FEATURED COLLECTIONS
┌──────────────┬──────────────┬──────────────┐
│  💎 Most     │  🌀 Most     │  🔬 Physical │
│  Credible    │  Strange     │  Traces      │
│  (Cred>=10)  │  (Strange=10)│  (TRC/VEG)   │
│              │              │              │
│  542 cases   │  184 cases   │  127 cases   │
│              │              │              │
│  [EXPLORE]   │  [EXPLORE]   │  [EXPLORE]   │
└──────────────┴──────────────┴──────────────┘

SECTION 2: HISTORICAL TIMELINE
┌─────────────────────────────────────┐
│ 🕰️ Explore by Historical Period    │
│                                       │
│ 840 ━━━━ 1600 ━━━━ 1900 ━━━━ 2000  │
│   10       50       200      342      │
│                                       │
│ [Medieval] [Renaissance] [Modern]   │
│                                       │
│ Each card shows: Cases count +       │
│ Key events (if any)                  │
└─────────────────────────────────────┘

SECTION 3: GEOGRAPHICAL MAP
┌─────────────────────────────────────┐
│ 🌍 Explore by Geography             │
│                                       │
│  ┌─ Europe         (234 cases)       │
│  │ ├─ France       (28 cases)        │
│  │ ├─ Great Brit   (31 cases)        │
│  │ ├─ Germany      (19 cases)        │
│  │ └─ Other...                       │
│  │                                   │
│  ├─ Asia          (156 cases)       │
│  │ ├─ Japan        (45 cases)        │
│  │ ├─ Korea        (22 cases)        │
│  │ └─ Other...                       │
│  │                                   │
│  └─ Americas      (105 cases)       │
│    ├─ USA         (87 cases)        │
│    └─ Other...                      │
│                                      │
│  Or: Interactive map with pins       │
└─────────────────────────────────────┘
```

### 5.3 Page BROWSE (Point d'entrée 2)

```
BROWSE PAGE - FACETED FILTERS
═════════════════════════════════════════════════════

┌────────────────────┬─────────────────────────────────┐
│   LEFT SIDEBAR     │      MAIN RESULTS               │
│   (Filters)        │                                 │
├────────────────────┼─────────────────────────────────┤
│                    │  [Found: 47 observations]      │
│ LOCATION           │                                 │
│ ─────────          │  Sort by: Date ▼                │
│ Country            │            Credibility         │
│ [Multi-select ▼]   │            Strangeness         │
│ France, USA,       │                                 │
│ Japan...           │  ┌─────────────────────────┐    │
│                    │  │ 🛸 Case 1               │    │
│ Type of place      │  │ Date: 5/21/70           │    │
│ ☐ Montagne        │  │ Location: Palestine     │    │
│ ☐ Ferme           │  │ Credibility: 4/15 ⭐    │    │
│ ☐ Métropole       │  │ Shape: Saucer           │    │
│ ☐ Mer             │  │                         │    │
│                    │  │ "Many observers..."     │    │
│ QUALITY            │  │                         │    │
│ ─────────          │  │ [VIEW DETAIL]           │    │
│ Credibility        │  └─────────────────────────┘    │
│ 3 ←───────→ 15     │                                 │
│ [◉]                │  ┌─────────────────────────┐    │
│                    │  │ 🛸 Case 2               │    │
│ Strangeness        │  │ ... (similar card)      │    │
│ 3 ←───→ 10         │  └─────────────────────────┘    │
│ [◉]                │                                 │
│                    │  ┌─────────────────────────┐    │
│ PERIOD             │  │ 🛸 Case 3               │    │
│ ─────────          │  │ ... (similar card)      │    │
│ 1600 ←────→ 2000   │  └─────────────────────────┘    │
│ [◉]                │                                 │
│                    │  [NEXT] [PREVIOUS]              │
│ UFO SHAPE          │  Page 1 of 2                    │
│ ─────────          │                                 │
│ ☐ Saucer (SCR)    │                                 │
│ ☐ Cigar (CIG)     │                                 │
│ ☐ Delta (DLT)     │                                 │
│ ☐ Nightlights     │                                 │
│                    │                                 │
│ OBSERVERS          │                                 │
│ ─────────          │                                 │
│ ☐ Military        │                                 │
│ ☐ Civilian        │                                 │
│ ☐ Scientists      │                                 │
│ ☐ High Quality    │                                 │
│                    │                                 │
│ PHENOMENA          │                                 │
│ ─────────          │                                 │
│ ☐ Landing (LND)   │                                 │
│ ☐ Sounds (SND)    │                                 │
│ ☐ Traces (TRC)    │                                 │
│ ☐ Humanoids       │                                 │
│                    │                                 │
│ ☐ Exclude          │                                 │
│    misidentif.     │                                 │
│                    │                                 │
│ [FILTER] [RESET]   │                                 │
└────────────────────┴─────────────────────────────────┘
```

### 5.4 Page SEARCH (Point d'entrée 3)

```
SEARCH PAGE - ADVANCED RESEARCH
═════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────┐
│ 🔍 Advanced Search                                  │
│ [Search box: Type country, year, etc...]           │
│                                                     │
│ (Autocomplete suggestions appear below)             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ADVANCED FILTERS (All visible)                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│ LOCALISATION                                        │
│ Country: [Multi-select dropdown]                    │
│ State/Province: [Multi-select]                      │
│ Locale: [Multi-select checkboxes]                   │
│ Coordinates: Lat _____ Lng _____ Radius: _____ km   │
│                                                     │
│ DATES & TIME                                        │
│ Date from: ____ / ____ / ____ to: ____ / ____ / __ │
│ Hour from: 00:00 to: 23:59                         │
│ Duration: ___ min to ___ min                        │
│                                                     │
│ QUALITY SCORES                                      │
│ Credibility: ___ to ___                            │
│ Strangeness: ___ to ___                            │
│                                                     │
│ UFO CHARACTERISTICS                                 │
│ Observers: ☐ MIL ☐ CIV ☐ HQO ☐ SCI ☐ CST         │
│ Shape: ☐ SCR ☐ CIG ☐ DLT ☐ NLT ☐ FBL             │
│ Phenomena: ☐ LND ☐ SND ☐ TRC ☐ VAG ☐ HUM        │
│           ☐ ANI ☐ WAV ☐ CMF ☐ COV                │
│                                                     │
│ OPTIONS                                             │
│ ☑ Include misidentifications                        │
│ View: ○ List ○ Table ○ Map                         │
│                                                     │
│ [SEARCH] [RESET] [SAVE SEARCH]                     │
└─────────────────────────────────────────────────────┘

RESULTS
──────────────────────────────────────────────────────
┌─────────────────────────────────────────────────────┐
│ 📊 STATISTICS                                       │
│ ├─ 47 observations found                           │
│ ├─ Date range: 5/21/1970 - 12/15/1995              │
│ ├─ Avg Credibility: 6.8/15                         │
│ ├─ Avg Strangeness: 5.2/10                         │
│ ├─ Countries: 3 (France, Japan, Italy)             │
│ └─ Observer types: Military, Civilian, Scientists  │
└─────────────────────────────────────────────────────┘

TABLE VIEW (or LIST VIEW available)
┌─────────────────────────────────────────────────────┐
│ Date   │ Location │ Cred │ Str │ Shape   │ Details │
├─────────────────────────────────────────────────────┤
│5/21/70 │Palestine │  4   │ 5   │ Saucer  │ [→]    │
│6/15/72 │France    │  7   │ 6   │ Cigar   │ [→]    │
│ ...    │  ...     │ ...  │...  │  ...    │ ...    │
└─────────────────────────────────────────────────────┘

[PREVIOUS] [Page 1 of 1] [NEXT]
[EXPORT CSV] [EXPORT JSON]
```

---

## PARTIE 6: PARTIS-PRIS ARGUMENTÉS (3 différenciateurs)

### Parti-pris 1: **Parcours graduel (Exploration → Analyse)**

**Proposition:** L'interface adapte la complexité au besoin utilisateur

**Argument:**
- Pas TOUS les filtres d'un coup (paralyse Emma)
- Mais TOUS disponibles si cherchés (satisfait Marc)
- 3 entrées distinctes = 3 niveaux de complexité
- UX progressive: "simple d'abord, technique si besoin"

**Unicité:**
- La plupart des projets OVNI font recherche libre = pas guidé
- Notre approche: guidé + libre = flexibilité + accessibilité
- Personas spécifiques = design précis

---

### Parti-pris 2: **Navigation structurée vs recherche libre**

**Proposition:** Catégories pré-définies AVANT la recherche textuelle

**Argument:**
- Recherche seule = paralysie du choix (trop de paramètres)
- Catégories = points d'ancrage pour user non-expert
- Combine discovérabilité (Emma) + analytique (Marc)
- "Browse before Search" mentality

**Unicité:**
- Base de données UFO classique: recherche textuelle seulement
- Notre approche: découverte guidée + recherche libre
- Donne contexte historique/géographique naturellement

---

### Parti-pris 3: **Données en contexte (Rich information + Related items)**

**Proposition:** Chaque observation inclut contexte (cartes, sources, cas similaires)

**Argument:**
- Vue détail = complète: dates, observers, phenomena, sources, coordonnées GPS
- Pas seulement liste CSV
- Cases similaires = encourage exploration continue
- Sources bibliographiques = crédibilité + approfondissement

**Unicité:**
- Databases UFO usuelles: données brutes
- Notre approche: données contextualisées, enrichies, narrativisées
- Value add: interprétation, pas seulement agrégation

---

## PARTIE 7: SOURCES & RÉFÉRENCES

1. **Hatch UFO Database (Hatch_udb.json)**
   - 500+ observations de 840 à 2000+
   - Source primaire pour toutes les données

2. **Design Thinking Methodology**
   - Stanford d: Design Thinking Process (5 phases)
   - Centré utilisateurs: Empathize → Define → Ideate → Prototype → Test

3. **Information Architecture Best Practices**
   - Rosenfeld & Morville: "Information Architecture for the Web and Beyond"
   - Faceted navigation patterns (Nielsen Norman Group)
   - Progressive disclosure principle

---

## PARTIE 8: LIVRABLES - CHECKLIST COMPLÈTE

### ✅ Livrables d'accompagnement requis par le brief:

- [x] **Intro** ✓ (Parties 1.1-1.2)
- [x] **Personas** ✓ (Partie 1.2: 3 personas détaillées)
- [x] **Méthodologie** ✓ (Partie 1.3: Design Thinking 5 phases)
- [x] **Arborescence** ✓ (Partie 2.2: Structure complète)
- [x] **UML Use Cases** ✓ (Partie 3: 4 use cases + flow)
- [x] **BPMN Processus** ✓ (Partie 4: Scénario principal + secondaire)
- [x] **Visuels behind-the-scene** ✓ (Partie 5: Wireframes détaillés)
- [x] **3 partis-pris argumentés** ✓ (Partie 6: 3 différenciateurs clairs)
- [x] **3 sources** ✓ (Partie 7: Sources identifiées)
- [ ] **Prototype testé** (À faire: Figma/Adobe XD/Prototyping tool)
- [ ] **Test utilisateurs** (À faire: 5+ utilisateurs externes)

---

## PARTIE 9: PROCHAINES ÉTAPES

### Phase Prototype (Semaine 2):
1. Créer wireframes haute-fidélité (Figma)
2. Prototype interactif (Figma prototype, Adobe XD, Framer)
3. User testing prep: Recruter 5-7 testeurs (pas en classe)

### Phase Test & Itération (Semaine 3):
1. Tests utilisateurs: observer comment Emma, Sophie, Marc utilisent
2. Feedback gathering
3. Itérations rapides

### Phase Finale (Avant 2 décembre):
1. Affinage prototype
2. Documentation complète
3. Préparation soutenance

---

## 🎯 RÉSUMÉ STRATÉGIQUE

**L'approche:** 3 points d'entrée = 3 niveaux de complexité
- **Emma (Grand public):** Exploration guidée, découverte amusante
- **Sophie (Enthousiaste):** Filtres facettés, balance simple/avancé
- **Marc (Chercheur):** Recherche avancée, export, analytique

**La différenciation:** Navigation structurée + contexte riche
- Pas juste recherche libre (comme autres projets UFO)
- Mais guidée + libre = flexibilité maximale

**La méthodologie:** Design Thinking centré utilisateurs
- Empathy → Definition → Ideation → Prototype → Test
- 3 personas concrets = design précis

**Le résultat:** Produit original, intuitif, puissant
- Accessible au grand public
- Satisfait les chercheurs
- Présente données riches et contextualisées

