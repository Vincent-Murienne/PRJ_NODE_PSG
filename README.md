# PRJ_NODE_PSG


Lancement du projet : 
docker-compose up --build (builder le projet)
docker-compose up -d (mode détaché --> accès au terminal)

Pour accèder au conteneur SQL :
mysql -u root -p prj_node_psg (accès à la base de donnée root --> mdp = root)

source prj_node_psg.sql (pour ajouter le fichier source à la base de donnée)

show databases; (afficher toutes les tables)
show tables; (afficher les tables de ma base prj_node_psg)
show columns from ... (afficher les colonnes d'une table en particulier)

