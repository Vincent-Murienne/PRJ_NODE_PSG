# PRJ_NODE_PSG


**Lancement du projet :** 

-Étapes pour démarrer le projet

docker-compose up --build (builder le projet)
docker-compose up -d (mode détaché --> accès au terminal)

Pour accèder au conteneur SQL, se connecter à la base de données : :
mysql -u root -p prj_node_psg (accès à la base de donnée root --> mdp = root)

Charger le fichier SQL source dans la base de données :
source prj_node_psg.sql (pour ajouter le fichier source à la base de donnée)

**Commandes utiles MySQL**
Afficher toutes les bases de données disponibles :
show databases; (afficher toutes les tables)
show tables; (Afficher les colonnes d'une table spécifique de ma base prj_node_psg)
show columns from <nom_table> (afficher les colonnes d'une table en particulier)

**Étapes à suivre pour la gestion des comptes: **
Avoir un compte Administrateur :
Se connecter avec le compte Administrateur pour obtenir un token :
Vous aurez besoin de ce token pour activer les comptes Éditeur. Sans ce token, l'accès aux fonctionnalités de l'éditeur est refusé.

Activation du compte Éditeur :
Utilisez le token de l'Administrateur pour activer le compte de l'Éditeur.

Connexion de l'Éditeur activé :
Une fois son compte activé, l'Éditeur peut se connecter de la même manière qu'un Administrateur.

Accès de l'Éditeur aux routes autorisées :
L'Éditeur peut maintenant accéder à certaines routes selon les autorisations qui lui sont accordées.

