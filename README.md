# JSROL

Application de référencement des parcours et des randonnées de l'association de roller RideOnLille.

# Installation

## Prérequis

Installer [nodeJS et NPM](https://nodejs.org/)

Installer Grunt

    npm install -g grunt-cli

## Déploiement

L'application est hébergée sur heroku, et le script de construction de déploiement est paramétré en fonction. 

Construction en local du projet dans le répertoire /dist

    grunt

Déploiement sur [Héroku](http://heroku.com), à condition d'être au préalable authentifié 
    
    grunt buildcontrol:heroku
