# PRJ_NODE_PSG

## Lancement du projet

### Étapes pour démarrer le projet

- Construire et démarrer le projet avec Docker :
```bash
docker-compose up --build
```
(Construire le projet)

- Démarrer le projet en mode détaché :
```bash
docker-compose up -d
```
(Mode détaché --> permet de libérer le terminal)

### Accéder au conteneur SQL

- Se connecter à la base de données MySQL :
```bash
mysql -u root -p prj_node_psg
```
(Le mot de passe pour l'utilisateur root est root)

- Charger le fichier SQL source dans la base de données :
```bash
source prj_node_psg.sql
```
(Importer le fichier source dans la base de données)

## Commandes utiles MySQL

- Afficher toutes les bases de données disponibles :
```sql
show databases;
```

- Afficher les tables de la base de données prj_node_psg :
```sql
show tables;
```

- Afficher les colonnes d'une table spécifique :
```sql
show columns from <nom_table>;
```

## Étapes à suivre pour la gestion des comptes

Avoir un compte Administrateur :
- Créez un compte Administrateur ou utilisez un compte existant.

Se connecter avec le compte Administrateur pour obtenir un token :
- Utilisez le compte Administrateur pour obtenir un token.
- Important : Ce token est requis pour activer les comptes Éditeur. Sans lui, l'accès aux fonctionnalités de l'éditeur est refusé.

Activation du compte Éditeur :
- Utilisez le token de l'Administrateur pour activer le compte Éditeur.

Connexion de l'Éditeur activé :
- Une fois activé, l'Éditeur peut se connecter de la même manière qu'un Administrateur.

Accès aux routes autorisées pour l'Éditeur :
- L'Éditeur activé pourra accéder à certaines routes en fonction des autorisations qui lui sont accordées.

