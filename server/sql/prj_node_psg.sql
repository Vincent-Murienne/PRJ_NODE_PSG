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
(1, 'Victoire de l\'équipe contre l\'OM', '2024-10-21', 'L\'équipe a remporté une belle victoire contre l\'Olympique de Marseille avec un score de 3-1.', 'Victoire contre l\'OM', 'image1.jpg'),
(2, 'Prochain match contre Lyon', '2024-10-28', 'L\'équipe se prépare pour son prochain match contre l\'Olympique Lyonnais.', 'Préparation au match contre Lyon', 'image2.jpg');

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
  `histoire` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_club`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Données pour la table `club`
INSERT INTO `club` (`id_club`, `presentation`, `histoire`) VALUES
(1, 'Club de football professionnel basé à Paris.', 'Fondé en 1970, le club a connu un grand succès.');

-- Structure de la table `duel`
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

-- Données pour la table `duel`
INSERT INTO `duel` (`id_match`, `date_match`, `lieu_match`, `id_adversaire`, `id_section`, `id_matchScore`) VALUES
(8, '2024-10-01', 'Stade de France', 1, 1, 1),
(9, '2024-10-08', 'Parc des Princes', 2, 2, 2),
(10, '2024-10-15', 'Allianz Riviera', 3, 3, 3);

-- Structure de la table `matchScore`
CREATE TABLE `matchScore` (
  `id_matchScore` int(11) NOT NULL AUTO_INCREMENT,
  `score_equipe` int(11) NOT NULL,
  `score_adversaire` int(11) NOT NULL,
  PRIMARY KEY (`id_matchScore`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Données pour la table `matchScore`
INSERT INTO `matchScore` (`id_matchScore`, `score_equipe`, `score_adversaire`) VALUES
(18, 3, 1),
(19, 2, 2),
(20, 1, 0);

-- Structure de la table `partenaire`
CREATE TABLE `partenaire` (
  `id_partenaire` int(11) NOT NULL AUTO_INCREMENT,
  `logo` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_partenaire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Données pour la table `partenaire`
INSERT INTO `partenaire` (`id_partenaire`, `logo`, `url`) VALUES
(1, 'logo_partenaire1.png', 'https://www.partenaire1.com'),
(2, 'logo_partenaire2.png', 'https://www.partenaire2.com'),
(3, 'logo_partenaire3.png', 'https://www.partenaire3.com');

-- Structure de la table `role`
CREATE TABLE `role` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `nom_role` varchar(50) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Données pour la table `role`
INSERT INTO `role` (`id_role`, `nom_role`) VALUES
(1, 'Administrateur'),
(2, 'Editeur');

-- Structure de la table `section`
CREATE TABLE `section` (
  `id_section` int(11) NOT NULL AUTO_INCREMENT,
  `nom_section` varchar(255) NOT NULL,
  PRIMARY KEY (`id_section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Données pour la table `section`
INSERT INTO `section` (`id_section`, `nom_section`) VALUES
(1, 'masculine junior'),
(2, 'masculine senior'),
(3, 'féminine junior'),
(4, 'féminine senior');

-- Structure de la table `user`
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,desc
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT 0,
  `id_role` int(11) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_role` (`id_role`),
  CONSTRAINT `fk_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Données pour la table `user`
INSERT INTO `user` (`id_user`, `full_name`, `email`, `password`, `isActive`, `id_role`) VALUES
(1, 'Adm', 'adm@gmail.com', 'Admin123', 1, 1);

COMMIT;