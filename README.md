
# Next-Payload Enterprise Stack

## Structure du projet

```
NextStacksForge/
├── .github/
│   └── workflows/
├── payload-app/
│   ├── node_modules/
│   ├── src/
│   ├── .env
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── .prettierrc.json
│   ├── .yarnrc
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
├── web-app/
│   ├── .next/
│   ├── .storybook/
│   ├── node_modules/
│   ├── src/
│   ├── tests/
│   ├── .env.local
│   ├── .env.sentry-build-plugin
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── .prettierrc
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── playwright.config.ts
│   └── tsconfig.json
└── README.md
```

## Structure de l'application

Notre projet est divisé en deux applications principales :

1. **Application Payload CMS** (dans `payload-app/`) :
   - Gère le contenu pour les pages statiques de l'application (SSG)
   - Fournit une interface d'administration pour la gestion du contenu
   - Permet la création et l'édition de contenu qui sera utilisé pour générer des pages statiques
   - N'agit pas comme un backend traditionnel pour l'application web

2. **Application Web Next.js** (dans `web-app/`) :
   - Utilise l'App Router de Next.js pour un routage optimisé
   - Interface utilisateur principale de l'application
   - Intègre Tailwind CSS pour le styling
   - Utilise le contenu géré par Payload CMS pour générer des pages statiques (SSG)
   - Backend principalement géré avec Supabase et les fonctionnalités de Next.js
   - Inclut Storybook pour le développement de composants
   - Configuration pour les tests avec Playwright , Vitest et Testing Librarie
   - Configuration de Sentry pour les rapports d'erreurs (Prod / Devs)
   
   

Cette structure permet une séparation claire des responsabilités :
- Payload CMS est utilisé exclusivement pour la gestion du contenu des pages statiques.
- Le backend de l'application est principalement géré par Supabase et les fonctionnalités de Next.js.
- L'application web Next.js consomme le contenu de Payload CMS lors du build pour générer des pages statiques, tout en utilisant Supabase pour les fonctionnalités dynamiques et le stockage des données.


# GitHub Actions Workflows

Ce projet utilise GitHub Actions pour automatiser les processus de release et de déploiement. Nous avons deux workflows principaux : un pour la production et un pour le développement.

Actuellement, les workflows GitHub Actions sont désactivés pour ce projet. Les fichiers de configuration des workflows sont présents dans le dossier .github/workflows/, mais ils sont temporairement mis en pause. avec cette ligne `if: false` avant les `jobs: *`
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

Fichier : `.github/workflows/dev-release.yml`

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