# GitHub Actions Workflows

Ce projet utilise GitHub Actions pour automatiser les processus de release et de déploiement. Nous avons deux workflows principaux : un pour la production et un pour le développement.

## Workflow de Production

Fichier : `.github/workflows/production-release.yml`

Ce workflow est déclenché lors des pushes et des pull requests sur les branches `main` et `master`.

### Étapes :

1. **Génération de tag Git** :
   - Crée un nouveau tag basé sur les commits récents.
   - Utilise l'action `anothrNick/github-tag-action`.

2. **Création de release GitHub** :
   - Crée une nouvelle release GitHub basée sur le tag généré.
   - Utilise l'action `ncipollo/release-action`.

3. **Création de release Sentry** :
   - Crée une nouvelle release dans Sentry pour l'environnement de production.
   - Utilise l'action officielle Sentry `getsentry/action-release`.

## Workflow de Développement

Fichier : `.github/workflows/devloppement-release.yml`

Ce workflow est déclenché uniquement lors des pushes sur la branche `devs`.

### Étapes :

1. **Génération de tag de développement** :
   - Crée un nouveau tag spécifique au développement (par exemple, v1.0.0-dev.1).
   - Utilise l'action `anothrNick/github-tag-action` avec des paramètres spécifiques au développement.

2. **Création de release Sentry pour le développement** :
   - Crée une nouvelle release dans Sentry pour l'environnement de développement.
   - Utilise l'action officielle Sentry `getsentry/action-release`.

## Configuration requise

Pour que ces workflows fonctionnent correctement, assurez-vous d'avoir configuré les secrets suivants dans les paramètres de votre repository GitHub :

- `PAT` : Personal Access Token avec les permissions nécessaires pour créer des tags et des releases.
- `SENTRY_AUTH_TOKEN` : Token d'authentification pour Sentry.
- `SENTRY_ORG` : Nom de votre organisation Sentry.
- `SENTRY_PROJECT` : Nom de votre projet Sentry.

## Utilisation

Ces workflows s'exécutent automatiquement selon les conditions définies (pushes sur certaines branches). Aucune action manuelle n'est nécessaire pour les déclencher.

Pour visualiser les exécutions des workflows :
1. Allez dans l'onglet "Actions" de votre repository GitHub.
2. Sélectionnez le workflow que vous souhaitez examiner.
3. Vous verrez l'historique des exécutions et pourrez consulter les logs pour chaque run.

## Personnalisation

Si vous avez besoin de modifier ces workflows, vous pouvez éditer les fichiers YAML correspondants dans le répertoire `.github/workflows/`.

Pour toute question ou problème concernant ces workflows, veuillez ouvrir une issue dans ce repository.