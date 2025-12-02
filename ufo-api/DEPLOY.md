# Déploiement sur Render.com

Guide complet pour déployer l'API UFO sur Render.com

## Prérequis

- Compte GitHub
- Compte Render.com (gratuit)
- Repository Git avec ce code

---

## Étape 1: Préparer le Repository GitHub

1. **Créer un nouveau repository sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: UFO Sightings API"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/ufo-api.git
   git push -u origin main
   ```

2. **Vérifier les fichiers essentiels**
   - ✅ `package.json` avec scripts `start`
   - ✅ `render.yaml` pour configuration auto
   - ✅ `src/data/hatch_udb.json` (fichier de données)
   - ✅ `.env.example` (exemple de configuration)

---

## Étape 2: Déployer sur Render

### Option A: Déploiement automatique avec render.yaml

1. **Connectez-vous à Render.com**
   - Allez sur https://render.com
   - Cliquez sur "Get Started" ou "Sign In"
   - Connectez votre compte GitHub

2. **Créer un nouveau Web Service**
   - Cliquez sur "New +" → "Blueprint"
   - Sélectionnez votre repository `ufo-api`
   - Render détectera automatiquement `render.yaml`
   - Cliquez sur "Apply"

3. **Configuration automatique**
   Render utilisera les paramètres de `render.yaml`:
   ```yaml
   services:
     - type: web
       name: ufo-api
       env: node
       buildCommand: npm install
       startCommand: npm start
   ```

### Option B: Déploiement manuel

1. **Créer un nouveau Web Service**
   - Cliquez sur "New +" → "Web Service"
   - Connectez votre repository GitHub
   - Sélectionnez `ufo-api`

2. **Configurer le service**
   - **Name**: `ufo-api`
   - **Environment**: `Node`
   - **Region**: `Oregon` (ou votre choix)
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

3. **Variables d'environnement**
   Ajoutez ces variables:
   ```
   NODE_ENV=production
   PORT=3000
   DATA_FILE=./src/data/hatch_udb.json
   CORS_ORIGIN=*
   ```

4. **Déployer**
   - Cliquez sur "Create Web Service"
   - Attendez le déploiement (2-3 minutes)

---

## Étape 3: Vérifier le déploiement

### Test des endpoints

Une fois déployé, Render vous donnera une URL comme:
```
https://ufo-api-xxxx.onrender.com
```

Testez les endpoints:

```bash
# Health check
curl https://ufo-api-xxxx.onrender.com/health

# API Info
curl https://ufo-api-xxxx.onrender.com/

# Sightings
curl "https://ufo-api-xxxx.onrender.com/api/v1/sightings?limit=5"

# Statistics
curl https://ufo-api-xxxx.onrender.com/api/v1/statistics
```

---

## Étape 4: Déploiement continu (CI/CD)

Render déploie automatiquement à chaque push sur la branche `main`:

```bash
# Faire des modifications
git add .
git commit -m "Update API"
git push origin main
```

Render détectera le push et redéploiera automatiquement.

---

## Configuration avancée

### Custom Domain

1. Dans Render Dashboard → Settings
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions

### Logs et Monitoring

- **Logs en temps réel**: Dashboard → Logs
- **Metrics**: Dashboard → Metrics
- **Alerts**: Dashboard → Settings → Notifications

### Health Checks

Render vérifie automatiquement `/health`:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-11-11T15:00:00.000Z",
  "uptime": 3600
}
```

---

## Limitations du plan gratuit

- ⚠️ **Sleep après inactivité**: Se met en veille après 15 min d'inactivité
- ⏱️ **Démarrage lent**: ~30 secondes pour se réveiller
- 💾 **Mémoire**: 512 MB RAM
- ⏰ **Temps**: 750 heures/mois gratuit

### Solutions:

1. **Garder actif**: Utilisez un service de ping (UptimeRobot, etc.)
2. **Upgrade**: Plan payant ($7/mois) pour éviter le sleep

---

## Déploiement avec Docker

### Option: Render + Docker

1. **Ajoutez un Dockerfile** (déjà fait ✅)

2. **Modifiez render.yaml**:
   ```yaml
   services:
     - type: web
       name: ufo-api
       env: docker
       dockerfilePath: ./Dockerfile
       dockerContext: ./
   ```

3. **Déployez**
   Render construira l'image Docker automatiquement

---

## Troubleshooting

### Le service ne démarre pas

**Vérifiez:**
1. Les logs dans Render Dashboard
2. Que `package.json` a le script `start`
3. Que `DATA_FILE` pointe vers le bon chemin
4. Que le fichier `hatch_udb.json` est bien dans le repo

### Erreur "Module not found"

```bash
# Assurez-vous que dependencies sont dans package.json
npm install --save express cors dotenv

# Commitez package.json
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Erreur de mémoire

Le fichier JSON est gros (25 MB). Si problème:
1. Upgrade vers plan payant
2. Ou optimisez le chargement des données

### CORS errors

Vérifiez que `CORS_ORIGIN=*` est défini dans les variables d'environnement Render.

---

## Variables d'environnement Render

Dans Render Dashboard → Environment:

| Variable | Valeur | Description |
|----------|--------|-------------|
| `NODE_ENV` | `production` | Mode production |
| `PORT` | `3000` | Port (auto par Render) |
| `DATA_FILE` | `./src/data/hatch_udb.json` | Chemin vers données |
| `CORS_ORIGIN` | `*` | CORS ouvert |

---

## URLs importantes

- **Dashboard**: https://dashboard.render.com
- **Docs**: https://render.com/docs
- **Status**: https://status.render.com
- **Support**: https://render.com/support

---

## Sécurité

### Recommandations:

1. **API Key** (optionnel pour v2):
   ```javascript
   // Ajoutez dans middleware
   const apiKey = req.headers['x-api-key'];
   if (apiKey !== process.env.API_KEY) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
   ```

2. **Rate Limiting** (optionnel):
   ```bash
   npm install express-rate-limit
   ```

3. **HTTPS**: Automatique sur Render ✅

---

## Monitoring

### Outils recommandés:

1. **UptimeRobot**: Ping toutes les 5 min (gratuit)
2. **Render Metrics**: CPU, Memory, Response time
3. **LogTail**: Logs centralisés (gratuit jusqu'à 1GB/mois)

---

## Coûts

| Plan | Prix | Specs |
|------|------|-------|
| **Free** | $0 | 512 MB RAM, Sleep après 15min |
| **Starter** | $7/mois | 512 MB RAM, Toujours actif |
| **Standard** | $25/mois | 2 GB RAM, Toujours actif |

Pour cette API, **Free** est suffisant si vous acceptez le sleep.

---

## Déploiement réussi ! 🎉

Votre API UFO est maintenant en ligne et accessible au monde entier !

**Next steps:**
1. Testez tous les endpoints
2. Ajoutez l'URL dans votre documentation
3. Partagez avec la communauté UFO ! 🛸
