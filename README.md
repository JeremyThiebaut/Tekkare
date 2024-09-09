# Tableau de Bord Médical

## Description du Projet

Ce projet est un tableau de bord médical interactif développé avec Next.js et TypeScript. Il permet de visualiser et d'analyser des données relatives aux hôpitaux, aux médicaments et à la recherche médicale.

## Choix Techniques

- **Next.js** : Choisi pour son rendu côté serveur, son routage intégré et son optimisation des performances.
- **React** : Utilisé comme base pour la création d'interfaces utilisateur dynamiques.
- **TypeScript** : Employé pour ajouter un typage statique, améliorant la maintenabilité et réduisant les erreurs potentielles.
- **Redux** : Intégré pour la gestion globale de l'état de l'application.
- **i18next** : Utilisé pour l'internationalisation, permettant une prise en charge multilingue.
- **Tailwind CSS** : Choisi pour un styling rapide et cohérent.

## Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

## Installation

1. Clonez le dépôt :

   ```
   git clone git@github.com:JeremyThiebaut/Tekkare.git
   ```

2. Naviguez dans le dossier du projet :

   ```
   cd Tekkare
   ```

3. Installez les dépendances :
   ```
   npm install
   ```
   ou
   ```
   yarn install
   ```

## Exécution du Projet

Pour lancer l'application en mode développement :

```
npm run dev
```

ou

```
yarn dev
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## Structure du Projet

- `src/pages` : Contient les pages principales de l'application.
- `src/components` : Regroupe les composants réutilisables.
- `src/utils` : Contient les fonctions utilitaires.
- `src/types` : Définit les types TypeScript utilisés dans l'application.
- `src/slices` : Contient les slices Redux pour la gestion de l'état.
- `src/store` : Configure le store Redux.

## Fonctionnalités Principales

- Visualisation de données pour les hôpitaux, médicaments et projets de recherche.
- Filtrage des données par date, terme de recherche et spécialité.
- Affichage de KPIs et de graphiques dynamiques.
- Support multilingue.
