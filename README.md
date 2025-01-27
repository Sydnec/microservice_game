# Microservice Game

Ce projet illustre une architecture **microservices** pour un jeu sur navigateur.  
Il comporte :

1. Un **service Héros** (avec base de données SQLite) pour créer et gérer les héros.  
2. Un **service Donjon**, qui gère la génération aléatoire et la progression dans le donjon.  
3. Un **service Combat**, qui calcule l’issue des batailles entre héros et monstres/boss.  
4. Un **client React** pour l’interface utilisateur.

---

## Sommaire
1. [Fonctionnalités](#fonctionnalités)
2. [Architecture du Projet](#architecture-du-projet)
3. [Prérequis](#prérequis)
4. [Installation](#installation)
5. [Lancement](#lancement)
6. [Utilisation](#utilisation)
7. [Endpoints Principaux](#endpoints-principaux)

---

## Fonctionnalités
- **Créer un héros** avec un nom et des caractéristiques de base (PV, attaque, défense, or, etc.).  
- **Gérer l’XP et le niveau** d’un héros : gain d’XP après un combat, montée de niveau et distribution de points de caractéristique.  
- **Générer un donjon aléatoire** (linéaire) avec X cases. À chaque déplacement :
  - 20 % de chance de rencontrer un monstre.  
  - À la dernière case, combat contre un boss.  
- **Combats** : calcul des dégâts et détermination du vainqueur (héros ou monstre/boss).  
- **Gain d’or** après chaque victoire, dépense possible de l’or pour améliorer les caractéristiques du héros.  
- **Front React** : Interface utilisateur permettant d’interagir avec tous ces services.

---

## Architecture du Projet

```
├───client
│   ├───public
│   └───src
└───services
    ├───dungeon
    ├───fight
    └───heros
```
- **Service Héros**  
  Stocke les données des héros (caractéristiques, or, XP, etc.) dans une base SQLite (`database.sqlite`).  

- **Service Donjon**  
  Gère la création et la progression dans le donjon (cases, monstres, boss) en mémoire.  

- **Service Combat**  
  Calcule l’issue des combats entre un héros et un monstre/boss.  

- **Client React**  
  Interface utilisateur pour interagir avec le jeu.

---

## Prérequis
- **Docker** et **Docker Compose** (ou `docker compose` plugin) installés.  
  - Vérifier en tapant :  
    ```bash
    docker --version
    docker compose version
    ```  
- (Optionnel) **Node.js / npm** si vous souhaitez lancer les services sans Docker.

---

## Installation

1. **Cloner** ce dépôt :
   ```bash
   git clone https://github.com/sydnec/microservice_game
   cd microservice_game
   ```

## Lancement
### Avec Docker Compose

À la racine du projet, exécutez :

```bash
docker compose up --build
```
*Note : Si la commande docker compose n’existe pas, essayez docker-compose.*

Les conteneurs démarrent :

    hero-service sur le port 5001
    dungeon-service sur le port 5002
    fight-service sur le port 5003
    client sur le port 3000 (ou 80 selon votre Dockerfile)

Accédez ensuite au client React via http://localhost:3000.

### Sans Docker

Lancement global avec un script NPM et `concurrently`

1. Installez la dépendance (si ce n’est pas déjà fait) :

```bash
npm i
```

2. À la racine du projet, lancez la commande :

```bash
npm start
```

Par défaut, le client est disponible sur http://localhost:3000.

## Utilisation

    Créer un héros : Via l’API POST /heroes ou l’interface React, définissez un nom de héros.
    Entrer dans un donjon : Lancez un donjon pour le héros et progressez case par case.
    Combats : En cas de rencontre, un combat est lancé via le service Combat.
    Récompenses : En cas de victoire, le héros reçoit de l’XP et de l’or.
    Améliorations : Dépensez l’or pour améliorer l’attaque, la défense ou les PV.

## Endpoints Principaux
Service Héros (port 5001)

    POST /heroes : Créer un nouveau héros
    GET /heroes : Récupérer tous les héros
    GET /heroes/:id : Récupérer un héros
    DELETE /heroes/:id : Supprime un héros
    PUT /heroes/:id/xp : Augmenter l’XP d’un héros
    PUT /heroes/:id/addgold : Ajouter de l’or
    PUT /heroes/:id/spendgold : Dépenser de l’or pour améliorer les stats

Service Donjon (port 5002)

    POST /dungeon/start : Démarrer un donjon pour un héros
    PUT /dungeon/move : Avancer d’une case et éventuel combat
    GET /dungeon/status : (Optionnel) État du donjon

Service Combat (port 5003)

    POST /combat : Lancer un combat
