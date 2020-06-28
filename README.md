# Transverse Client - Yoann BUISSON & Thibault LAFAURIE
Cette application a été réalisé dans le cadre d'un projet scolaire.


## Prérequis

Il est nécessaire d'avoir **MongoDB** de fonctionnel et qui tourne avec une base portant le nom "transverse".

## Installation 

Pour installer les dépendances npm, il suffit de lancer une seule commande.
```sh
$ npm install
```

## Lancement

Pour lancer le client, une seule commande est requise aussi.
```sh
$ npm start
```

Le client est ensuite accessible sur http://localhost:3000.


## Conseils

Dans certains cas, les données modifiées ne se refleteront pas directement dans la vue.
Il est nécessaire de ces cas là de rafraîchir la page pour les voir apparaître.

Exemple: Une fois connecté, si je souhaite ajouter un étudiant, cela me ramènera vers la page de connexion et non vers le formulaire de création. Il est conseillé alors de revenir à l'écran d'accueil et de rafraîchir la page, puis de réessayer. 
