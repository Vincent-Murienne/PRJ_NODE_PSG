-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 15 oct. 2024 à 13:57
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
CREATE DATABASE prj_node_psg;
USE `prj_node_psg`;

-- Création de la table `actualite`
CREATE TABLE IF NOT EXISTS `actualite` (
  `id_actualite` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `texte_long` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_actualite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Autres tables et insertions...


-- Données pour la table `actualite`
INSERT INTO `actualite` (`id_actualite`, `titre`, `date`, `texte_long`, `resume`, `image`) VALUES
(1, 'Victoire de l\'équipe contre l\'OM', '2024-10-21', 'L\'équipe a remporté une belle victoire contre l\'Olympique de Marseille avec un score de 3-1.', 'Victoire contre l\'OM', 'https://i.ytimg.com/vi/uBukdN2PFRQ/maxresdefault.jpg'),
(2, 'Prochain match contre Lyon', '2024-10-28', 'L\'équipe se prépare pour son prochain match contre l\'Olympique Lyonnais.', 'Préparation au match contre Lyon', 'https://media.ouest-france.fr/v1/pictures/MjAyMzA5ODI3OThlNDFkOGQ4NDhlOTQ2MmFjNTVlNTViNzUxZTg?width=1260&height=708&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=c830077eafca2a0ab8b9aed844637d09419187a6c0369f9a3436e2803d707e7e');

-- Structure de la table `adversaire`
CREATE TABLE `adversaire` (
  `id_adversaire` int(11) NOT NULL AUTO_INCREMENT,
  `nom_adversaire` varchar(255) NOT NULL,
  PRIMARY KEY (`id_adversaire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Données pour la table `adversaire`
INSERT INTO `adversaire` (`id_adversaire`, `nom_adversaire`) VALUES
(1, 'Olympique de Marseille'),
(2, 'Olympique Lyonnais'),
(3, 'AS Monaco'),
(4, 'Lille OSC'),
(5, 'Stade Rennais'),
(6, 'OGC Nice'),
(7, 'Montpellier HSC'),
(8, 'FC Nantes'),
(9, 'RC Strasbourg Alsace'),
(10, 'Toulouse FC');

-- Structure de la table `club`
CREATE TABLE `club` (
  `id_club` int(11) NOT NULL AUTO_INCREMENT,
  `presentation` varchar(255) DEFAULT NULL,
  `histoire` varchar(9999) DEFAULT NULL,
  PRIMARY KEY (`id_club`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Données pour la table `club`
INSERT INTO `club` (`id_club`, `presentation`, `histoire`) VALUES
(1, 'Club de football professionnel basé à Paris.', 'Le Paris Saint-Germain Football Club, couramment appelé Paris Saint-Germain ou PSG, est un club de football français, section football du Paris Saint-Germain omnisports. Le club possède un centre à entraînement à Poissy (qui a remplacé à partir de 2023 le Camp des Loges en forêt de Saint-Germain-en-Laye) et joue au Parc des Princes à Paris. Le Paris Saint-Germain voit le jour en 1970 lors de la fusion entre la section football du Stade saint-germanois, club fondé en 1904, et le Paris FC, club virtuel sans stade ni équipe créé dix-huit mois auparavant dans le but de redonner une équipe professionnelle à la capitale, après la chute du Racing Club de France et du Stade français. En 1972, le club est scindé en deux : le Paris FC gardant un effectif et le statut professionnel, ainsi occupant le Parc des Princes, tandis que le Paris Saint-Germain repart avec une équipe amateur en Division 3 et prend alors domicile au stade Georges-Lefèvre. Deux ans après, en 1974, le Paris FC est relégué en deuxième division tandis que le PSG retrouve la première division et le Parc des Princes. Présidé au cours de ses premières années par des personnalités comme Daniel Hechter puis Francis Borelli, le PSG est racheté en 1991 par le diffuseur du championnat à la télévision, Canal+, qui mène le club parisien à un grand succès pendant ses premières années. Ainsi, en 1996, le PSG remporte la Coupe Europe des vainqueurs de coupe, devenant le second club français à gagner une coupe Europe. En 2006, le PSG est vendu au fonds avec investissement américain Colony Capital, vivant plusieurs saisons compliquées malgré deux coupes nationales remportées, puis en 2011 à Qatar Sports Investments (QSI), la filiale sportive du fonds souverain qatarien Qatar Investment Authority (QIA). Un homme affaires et ex-tennisman qatarien Nasser Al-Khelaïfi devenant le président-directeur général du club, QSI investis des moyens financiers très importants pour acheter des joueurs parmi les plus chers au monde, tels que le suédois Zlatan Ibrahimović, le brésilien Neymar, le français Kylian Mbappé en 2017 ou Lionel Messi en 2021. Le PSG devient alors un club avec une dimension mondiale. En 2015, le club réalise le premier « quadruplé » en remportant la Ligue 1, la Coupe de France, la Coupe de la Ligue et le Trophée des champions, performance rééditée en 2016, 2018 et 2020. Le club de la capitale atteint la finale de la Ligue des champions de UEFA lors de la saison 2019-2020. En 2023, le Paris Saint-Germain remporte son onzième titre de champion de France, devenant ainsi le club le plus titré du championnat, devant Saint-Étienne.');

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
-- Hôte : 127.0.0.1
-- Généré le : mar. 15 oct. 2024 à 13:57
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE prj_node_psg;
USE `prj_node_psg`;

-- Table `section` (création avant table `duel`)
CREATE TABLE `section` (
  `id_section` int(11) NOT NULL AUTO_INCREMENT,
  `nom_section` varchar(255) NOT NULL,
  PRIMARY KEY (`id_section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion des sections
INSERT INTO `section` (`id_section`, `nom_section`) VALUES
(1, 'masculine junior'),
(2, 'masculine senior'),
(3, 'féminine junior'),
(4, 'féminine senior');

-- Table `matchScore` (création avant table `duel`)
CREATE TABLE `matchScore` (
  `id_matchScore` int(11) NOT NULL AUTO_INCREMENT,
  `score_equipe` int(11) NOT NULL,
  `score_adversaire` int(11) NOT NULL,
  PRIMARY KEY (`id_matchScore`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion des scores
INSERT INTO `matchScore` (`id_matchScore`, `score_equipe`, `score_adversaire`) VALUES
(1, 2, 1), (2, 0, 3), (3, 1, 1), (4, 2, 1), (5, 0, 3),
(6, 1, 1), (7, 1, 0), (8, 3, 2), (9, 2, 2), (10, 2, 1),
(11, 0, 3), (12, 1, 1), (13, 0, 1), (14, 2, 0), (15, 1, 1),
(16, 0, 1), (17, 2, 0), (18, 1, 1), (19, 1, 0), (20, 0, 0),
(21, 3, 1), (22, 0, 1), (23, 2, 0), (24, 1, 1), (25, 3, 1),
(26, 2, 2), (27, 1, 0), (28, 0, 1), (29, 2, 0), (30, 1, 1);

-- Table `adversaire`
CREATE TABLE `adversaire` (
  `id_adversaire` int(11) NOT NULL AUTO_INCREMENT,
  `nom_adversaire` varchar(255) NOT NULL,
  PRIMARY KEY (`id_adversaire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion des adversaires
INSERT INTO `adversaire` (`id_adversaire`, `nom_adversaire`) VALUES
(1, 'Olympique de Marseille'),
(2, 'Olympique Lyonnais'),
(3, 'AS Monaco'),
(4, 'Lille OSC'),
(5, 'Stade Rennais'),
(6, 'OGC Nice'),
(7, 'Montpellier HSC'),
(8, 'FC Nantes'),
(9, 'RC Strasbourg Alsace'),
(10, 'Toulouse FC');

-- Table `duel`
CREATE TABLE `duel` (
  `id_match` int(11) NOT NULL AUTO_INCREMENT,
  `date_match` date NOT NULL,
  `lieu_match` varchar(255) NOT NULL,
  `id_adversaire` int(11) NOT NULL,
  `id_section` int(11) NOT NULL,
  `id_matchScore` int(11) NOT NULL,
  PRIMARY KEY (`id_match`),
  KEY `id_adversaire` (`id_adversaire`),
  KEY `id_section` (`id_section`),
  KEY `id_matchScore` (`id_matchScore`),
  CONSTRAINT `duel_ibfk_1` FOREIGN KEY (`id_adversaire`) REFERENCES `adversaire` (`id_adversaire`),
  CONSTRAINT `fk_section` FOREIGN KEY (`id_section`) REFERENCES `section` (`id_section`),
  CONSTRAINT `fk_matchScore` FOREIGN KEY (`id_matchScore`) REFERENCES `matchScore` (`id_matchScore`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion des matchs dans la table `duel`
INSERT INTO `duel` (`id_match`, `date_match`, `lieu_match`, `id_adversaire`, `id_section`, `id_matchScore`) VALUES
(1, '2025-11-20', 'Parc des Princes', 1, 1, 1),
(2, '2025-11-22', 'Parc des Princes', 2, 1, 2),
(3, '2025-11-25', 'Stade Vélodrome', 3, 1, 3),
(4, '2024-11-13', 'Stade de France', 4, 1, 4),
(5, '2024-11-12', 'Allianz Riviera', 5, 1, 5),
(6, '2024-10-10', 'Parc des Princes', 6, 1, 6),
(7, '2025-12-08', 'Stade Pierre-Mauroy', 1, 2, 7),
(8, '2025-12-12', 'Stade Vélodrome', 2, 2, 8),
(9, '2025-12-15', 'Parc des Princes', 3, 2, 9),
(10, '2024-10-18', 'Stade de la Beaujoire', 4, 2, 10),
(11, '2024-10-20', 'Stade de France', 5, 2, 11),
(12, '2024-10-22', 'Parc des Princes', 6, 2, 12),
(13, '2025-12-25', 'Stade Vélodrome', 1, 3, 13),
(14, '2025-12-28', 'Stade Pierre-Mauroy', 2, 3, 14),
(15, '2025-01-01', 'Allianz Riviera', 3, 3, 15),
(16, '2024-01-03', 'Stade de France', 4, 3, 16),
(17, '2024-01-06', 'Parc des Princes', 5, 3, 17),
(18, '2024-01-09', 'Stade de la Beaujoire', 6, 3, 18),
(19, '2025-01-12', 'Stade Pierre-Mauroy', 1, 4, 19),
(20, '2025-01-15', 'Stade Vélodrome', 2, 4, 20),
(21, '2025-01-15', 'Stade Pierre-Mauroy', 3, 4, 21),
(22, '2024-01-15', 'Stade Vélodrome', 4, 4, 22),
(23, '2024-01-15', 'Parc des Princes', 5, 4, 23),
(24, '2024-01-15', 'Stade de France', 6, 4, 24);


-- Table `partenaire`
CREATE TABLE `partenaire` (
  `id_partenaire` int(11) NOT NULL AUTO_INCREMENT,
  `logo` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_partenaire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion des partenaires
INSERT INTO `partenaire` (`id_partenaire`, `logo`, `url`) VALUES
(1, 'https://www.pointdevente.parionssport.fdj.fr/s/img/LOGO-Parions-sport.jpg', 'https://www.parionssport.fdj.fr'),
(2, 'https://th.bing.com/th/id/R.230e1cfcb69dc0888bb4d88b6bafc61b?rik=S7YE1gmROmSBvw&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f03%2fQatar_Airways_logo.png&ehk=Hluu3V2v0uVlsOF1hcVWR2O61uaHJSz3A%2bfzMox376A%3d&risl=&pid=ImgRaw&r=0', 'https://www.qatarairways.com'),
(3, 'https://slotbettors.co.uk/wp-content/uploads/2019/07/Unibet-Casino-Logo-2019.png ', 'https://www.unibet.fr/pari-sportif-poker');

-- Table `role`
CREATE TABLE `role` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `nom_role` varchar(50) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion des rôles
INSERT INTO `role` (`id_role`, `nom_role`) VALUES
(1, 'Administrateur'),
(2, 'Editeur');

-- Table `user`
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT 0,
  `id_role` int(11) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_role` (`id_role`),
  CONSTRAINT `fk_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion de l'utilisateur
INSERT INTO `user` (`id_user`, `full_name`, `email`, `password`, `isActive`, `id_role`) VALUES
(1, 'Admin', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$REtyVbBt5xUisp8San1feQ$B0V8BwRA4vyxY3nNdqgXj91XqUtqI25MLdxne6y5J4c', 1, 1);


-- Structure de la table `contact`
CREATE TABLE `contact` (
  `id_contact` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(500) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_contact`),
  KEY `fk_user_contact` (`id_user`),
  CONSTRAINT `fk_user_contact` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;