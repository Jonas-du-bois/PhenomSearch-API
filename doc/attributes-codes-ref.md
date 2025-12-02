# Référence complète des attributs et codes - Hatch_UDB.json

## Index des codes d'attributs UFO/OVNI

### OBSERVATEURS (Observer Types)

| Code | Signification | Description |
|------|---------------|-------------|
| **GND** | Ground Observers | Observateur(s) au sol |
| **MIL** | Military Observers | Observateur(s) militaires |
| **CIV** | Civilian Observers | Observateur(s) civils |
| **HQO** | High-Quality Observers | Observateur(s) de haute qualité (astronomes, pilotes, etc.) |
| **SCI** | Scientist Involvement | Implication de scientifiques |
| **CST** | Coastal Observers | Observateur(s) en zone côtière/juste offshore |
| **SEA** | Sea Observers | Observateur(s) en mer (marins, équipage de navire) |
| **NWS** | News Media Report | Rapport médias/presse |

---

### MORPHOLOGIES D'OVNI (UFO Shapes)

| Code | Signification | Description |
|------|---------------|-------------|
| **SCR** | Saucer/Classic | Soucoupe classique, disque ou sphère |
| **CIG** | Cigar/Torpedo | Torpille, cigare ou cylindre |
| **DLT** | Delta/Boomerang | Delta, V, boomerang ou forme rectangulaire |
| **NLT** | Nightlights | Points lumineux ou lueurs nocturnes |
| **FBL** | Fireball | Boule de feu, forme brillante indistincte |
| **FIG** | Figure/Entity | Figure ou entité mal définie ou mal vue |
| **PRB** | Probe | Sonde (probablement télécommandée) |
| **NFO** | No Craft | Aucun engin vu (entités seules) |

---

### PHÉNOMÈNES GÉNÉRAUX (General Phenomena)

| Code | Signification | Description |
|------|---------------|-------------|
| **WAV** | Wave/Cluster/Flap | Vague, cluster ou flap (concentration temporelle) |
| **HST** | Historical Account | Compte rendu historique |
| **ODD** | Atypical/Paranormal | Atypique, Forteana ou paranormal |
| **MID** | Misidentification | Probable mésidentification |

---

### CARACTÉRISTIQUES OBSERVÉES (Observed Features)

| Code | Signification | Description |
|------|---------------|-------------|
| **TCH** | Technical Details | Nouveaux détails ou indices techniques |
| **SND** | Sounds | Sons d'OVNI entendus ou enregistrés |
| **RAY** | Light/Beam | Lumière bizarre, projecteur, faisceau ou laser-like |
| **SIG** | Signals | Signaux, réponses ou communications détectées |

---

### INTERACTIONS PHYSICALES (Physical Interactions)

| Code | Signification | Description |
|------|---------------|-------------|
| **LND** | Landing | Atterrissage d'OVNI ou contact avec le sol |
| **SUB** | Submersible | Émerge de l'eau ou s'y immerge |
| **OBS** | Observation/Chase | Véhicules d'observation ou de poursuite |
| **VEH** | Vehicle Affected | Véhicule affecté: marques, dégâts ou effets EME |

---

### TRACES ET EFFETS PHYSIQUES (Physical Traces & Effects)

| Code | Signification | Description |
|------|---------------|-------------|
| **TRC** | Physical Traces | Traces physiques directes |
| **DRT** | Dirt/Soil Marks | Traces de terre, sol, marques ou empreintes |
| **VEG** | Vegetation | Plantes affectées, échantillons ou cercles de récolte |
| **PHT** | Photos/Video | Photos, films ou vidéos prises |
| **RDA** | Radiation | Radiation ou champs haute énergie détectés |
| **BLD** | Buildings/Structures | Bâtiment, structure artificielle, routes ou lignes électriques affectés |

---

### ENTITÉS OBSERVÉES (Entities Observed)

| Code | Signification | Description |
|------|---------------|-------------|
| **OID** | Humanoid/Grey | Humanoïde, petit extraterrestre ou "Gris" |
| **FIG** | Figure | Figure ou entité mal définie |
| **NOC** | No Entity | Aucune entité ou occupant vu |

---

### EFFETS SUR LES ÊTRES VIVANTS (Biological Effects)

| Code | Signification | Description |
|------|---------------|-------------|
| **ANI** | Animals Affected | Animaux affectés ou blessés |
| **HUM** | Humans Affected | Humains affectés: blessures, brûlures, marques, enlèvement ou mort |
| **INJ** | Injuries | Blessures, maladie, mort ou mutilations |

---

### CARACTÉRISTIQUES SPÉCIALES (Special Characteristics)

| Code | Signification | Description |
|------|---------------|-------------|
| **CMF** | Camouflage | Camouflage ou déguisement apparent |
| **CNT** | Contactee Related | Relation avec des contactés UFO |

---

### INVESTIGATION & RÉACTION (Investigation & Response)

| Code | Signification | Description |
|------|---------------|-------------|
| **MIL** | Military Investigation | Investigation militaire documentée |
| **COV** | Coverup | Indication de dissimulation ou coverup |
| **OGA** | Government Agencies | Agences gouvernementales non-secrètes impliquées |

---

## Échelles numériques

### Crédibilité (Credibility Scale)
```
Échelle: 3 à 15+

3-4   = Faible crédibilité (récits faibles ou sources douteuses)
5-7   = Crédibilité modérée (témoins civils fiables, quelques détails vérifiés)
8-10  = Bonne crédibilité (témoins militaires/scientifiques, détails vérifiés)
11-13 = Excellente crédibilité (sources multiples fiables, preuves documentées)
14+   = Exceptionnelle (plusieurs sources indépendantes, documentation officielle)
```

### Étrangeté (Strangeness Scale)
```
Échelle: 3 à 10

3-4   = Phénomène relativement normal/explicable
5-6   = Bizarre mais possible (comportements inhabituels)
7-8   = Très bizarre (défie les lois de la physique connue)
9-10  = Extrêmement bizarre/paranormal (impossible selon la science)
```

### Durée (en minutes)
```
Valeurs observées: 1, 2, 8, 9, 10, 15, 20, 30, 33, 44, 53, 60, 88, 90, 104, 120, 132, 180+

Regroupement suggéré:
< 5 minutes = "Observation très brève"
5-15 minutes = "Observation courte"
15-60 minutes = "Observation moyenne"
60-120 minutes = "Observation longue"
120+ minutes = "Observation très longue"
```

---

## Structure des données clés

### key_vals (Valeurs clés de chaque observation)

```json
{
  "Country": "Nom du pays ou région",
  "Credibility": "Nombre de 3 à 15+",
  "Duration": "Durée en minutes",
  "HatchDesc": "Description compressée au format HATCH",
  "LatLong": "Latitude Longitude (décimal)",
  "LatLongDMS": "Format Degrés Minutes Secondes",
  "Locale": "Type de lieu (Montagne, Ferme, etc.)",
  "LocationLink": "URL Google Maps",
  "State/Prov": "État ou Province",
  "Strangeness": "Nombre de 3 à 10",
  "Elev": "[Optionnel] Élévation en mètres",
  "RelAlt": "[Optionnel] Altitude relative"
}
```

---

## Combinaisons de filtres recommandées pour recherches courantes

### Cas "Classiques" (High Strangeness & Credibility)
```
Crédibilité >= 8
Étrangeté >= 7
Observateurs: HQO
Type UFO: SCR, CIG, DLT
```

### Cas "Militaires"
```
Observateurs: MIL
Investigation militaire: OUI
Crédibilité >= 6
```

### Cas "Trace Physique"
```
Phénomènes: TRC, DRT, VEG, RDA
Crédibilité >= 5
```

### Cas "Humanoides"
```
Entités: OID
Crédibilité >= 4
```

### Cas "Historiques"
```
Période: < 1900
Phénomènes: HST
```

### Cas "Non-Mésidentification"
```
Exclure: MID
Crédibilité >= 7
```

---

## Localités/Lieux (Locale - Valeurs possibles)

1. **Forêt** (Forest)
2. **Montagnes** (Mountains)
3. **Côtes/Littoral** (Coastlands)
4. **Fermes/Terres agricoles** (Farmlands)
5. **Métropole** (Metropolis)
6. **Pâturage** (Pasture)
7. **Zones résidentielles** (Residential)
8. **Ville/Cité** (Town & City)
9. **Haute mer** (High Seas)
10. **Offshore**
11. **Zones côtières** (Coastal area/just offshore)
12. **En mer** (at sea)
13. **Observatoires** (Observatory)

---

## États/Provinces/Régions (Sélection)

**Grande-Bretagne & Irlande:**
- England (Angleterre)
- Scotland (Écosse)
- Wales (Pays de Galles)

**France:**
- Alpes Maritimes
- Bouches-du-Rhône
- Manche
- Meuse
- Pas-de-Calais
- Rhône
- Etc.

**Japon (Honshu Island):**
- Région Kanto (Tokyo)
- Région Kansai (Kyoto, Osaka)
- Nara
- Etc.

**Autres régions:**
- Honshu Island (Japon)
- EVE (Sibérie)
- THR (Thuringe, Allemagne)
- CSG (Hongrie)
- Etc.

---

## Dates format et plages

### Format accepté:
```
M/D/YYYY    (5/21/70)
M/YYYY      (5/1920)
D/YYYY      (1/840)
YYYY        (1908)

Avec possibilité d'avoir des "?" pour indiquer l'approximation
Exemple: 1/840? = Janvier 840 (approximatif)
```

### Plages historiques suggérées:
```
Moyen Âge: 840-1299
Renaissance: 1300-1599
Ancien Régime: 1600-1799
Époque moderne: 1800-1899
Contemporain: 1900-présent
  - Fin XIXe: 1900-1920
  - Entre-deux-guerres: 1920-1940
  - Après-guerre: 1940-1960
  - Ère spatiale: 1960-1980
  - Fin du XXe: 1980-2000
  - XXIe siècle: 2000+
```

---

## Heures d'observation

### Format:
```
~HH:MM      (approximate)
HH:MM?      (uncertain)
HH:MM       (precise)
```

### Groupements recommandés:
```
Nuit profonde: 00:00-06:00
Aube: 06:00-08:00
Matin: 08:00-12:00
Midi: 12:00-13:00
Après-midi: 13:00-18:00
Crépuscule: 18:00-20:00
Nuit: 20:00-00:00
```

---

## Références bibliographiques communes

Chaque observation inclut une référence (ref) de type:
```
VALLEE, Jacques: UFO'S IN SPACE - Anatomy of a Phenomenon
FLYING SAUCER REVIEW (FSR)
INFORESPACE Journal (SOBEPS)
LUMIERES DANS la NUIT (LDLN)
Charles Fort collections
Various UFO research organizations
```

---

## Notes pour l'implémentation UI

1. Les attributs peuvent être **multiples** par observation (stockés dans array "attributes")

2. Certaines observations ont des données **manquantes** (nil values):
   - Time (temps inconnu)
   - Elevation (élévation non documentée)
   - Etc.

3. Les descriptions **HatchDesc** sont compressées et cryptées - pour l'affichage user-friendly, préférer le champ "desc" (description complète)

4. Les coordonnées GPS permettent d'implémenter une **recherche géospatiale**

5. Les observations **historiques** (HST) avec dates anciennes peuvent avoir une **précision limitée**

6. **Liens Google Maps** sont pré-générés dans "LocationLink"

---

## Exemples de filtres complexes

### "Cas non-explicables récents avec observateurs militaires et traces"
```
Années: 1950-2000
Crédibilité: >= 7
Étrangeté: >= 7
Observateurs: MIL
Phénomènes: TRC OR VEH OR RDA
Exclure: MID
```

### "Événements historiques français importants"
```
Années: 1200-1700
Pays: France
Crédibilité: >= 6
Observateurs: HQO OR CIV (multiple)
Tri: Par date (chronologique)
```

### "Cas potentiellement prouvables"
```
Crédibilité: >= 8
Phénomènes: PHT (photos) OR RDA (radiation) OR TRC (traces) OR MIL (military investigation)
Étrangeté: >= 5
```

