# Payload App

Cette application combine Next.js et Payload CMS pour créer une solution de gestion de contenu robuste et flexible. Elle utilise Supabase pour le stockage des données et intègre divers plugins Payload pour étendre ses fonctionnalités.

## Plugins et explications

Voici une description des principaux plugins utilisés dans ce projet :

1. **payload** (version 3.0.0-beta.65)
   - Le CMS principal utilisé pour gérer le contenu. Payload est extensible et modulaire, ce qui permet d'ajouter facilement de nouvelles fonctionnalités via des plugins.

2. **@payloadcms/next** (version 3.0.0-beta.65)
   - Ce plugin permet d'intégrer Payload CMS dans une application Next.js en utilisant l'App Router, facilitant ainsi l'utilisation de Payload dans des projets Next.js modernes.

3. **@payloadcms/plugin-cloud** (version 3.0.0-beta.65)
   - Ce plugin ajoute des fonctionnalités de gestion des fichiers et des images en nuage. Dans ce projet, il est utilisé pour gérer les fichiers de manière centralisée via un stockage cloud.

4. **@payloadcms/richtext-lexical** (version 3.0.0-beta.65)
   - Ce plugin enrichit les capacités de l'éditeur de texte riche de Payload en utilisant Lexical, un éditeur moderne développé par Facebook.

5. **@payloadcms/db-postgres** (version 3.0.0-beta.65)
   - Ce plugin permet à Payload d'utiliser PostgreSQL comme base de données, ce qui est particulièrement utile dans ce projet, puisque Supabase est basé sur PostgreSQL.

6. **@payloadcms/live-preview-react** (version 3.0.0-beta.65)
   - Permet d'avoir un aperçu en direct des modifications du contenu dans l'interface de gestion de Payload, ce qui améliore l'expérience des éditeurs de contenu.

7. **@payloadcms/plugin-cloud-storage** (version 3.0.0-beta.65)
   - Ajoute un adaptateur de stockage pour utiliser S3 ou d'autres solutions cloud. Ici, il est utilisé pour stocker des fichiers et des médias de manière sécurisée et à grande échelle.

8. **@payloadcms/plugin-form-builder** (version 3.0.0-beta.65)
   - Ce plugin facilite la création de formulaires complexes directement dans Payload, avec des options de validation et de soumission.

9. **@payloadcms/plugin-nested-docs** (version 3.0.0-beta.65)
   - Offre des fonctionnalités avancées de gestion de documents imbriqués, ce qui est utile pour structurer le contenu hiérarchisé, comme des pages avec des sous-pages.

10. **@payloadcms/plugin-redirects** (version 3.0.0-beta.65)
    - Un plugin qui permet de gérer facilement les redirections d'URL directement depuis l'interface de Payload.

11. **@payloadcms/plugin-seo** (version 3.0.0-beta.65)
    - Ce plugin ajoute des champs spécifiques au SEO pour optimiser les pages pour les moteurs de recherche, avec des métadonnées, des balises Open Graph, etc.

12. **@payloadcms/storage-s3** (version 3.0.0-beta.65)
    - Permet d'intégrer le stockage S3 pour gérer les fichiers et les images dans le cloud, ce qui est utile pour les projets à grande échelle nécessitant un stockage sécurisé.

13. **@payloadcms/translations** (version 3.0.0-beta.65)
    - Ajoute la prise en charge de la traduction des contenus dans différentes langues, facilitant la gestion d'un site multilingue.

14. **@payloadcms/ui** (version 3.0.0-beta.65)
    - Une collection d'améliorations de l'interface utilisateur pour Payload, rendant l'interface de gestion plus intuitive et agréable à utiliser.

## Comment démarrer

Pour démarrer l'application localement, voici les étapes à suivre :

1. Cloner ce dépôt.
2. Installer les dépendances avec `npm install` ou `pnpm install`.
3. Configurer votre base de données et votre stockage cloud (Supabase et S3).
4. Lancer l'application en mode développement avec :
   ```bash
   npm run dev
   ```
5. Accéder à l'interface d'administration de Payload via l'URL fournie dans la console.

## Scripts

- `build`: Compile l'application Next.js pour la production.
- `dev`: Démarre l'application en mode développement.
- `lint`: Exécute l'outil de linting sur le projet.
- `generate:types`: Génère les types TypeScript pour Payload.
- `payload`: Démarre Payload en ligne de commande pour effectuer des opérations spécifiques.

## Licence

Ce projet est sous licence MIT.