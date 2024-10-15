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

--
-- Base de données : `prj_node_psg`
--
-- Création de la base de données
CREATE DATABASE IF NOT EXISTS `prj_node_psg`;
USE `prj_node_psg`;

-- --------------------------------------------------------

--
-- Structure de la table `actualite`
--

CREATE TABLE `actualite` (
  `id_actualite` int(11) NOT NULL,
  `titre` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `texte_long` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `actualite`
--

INSERT INTO `actualite` (`id_actualite`, `titre`, `date`, `texte_long`, `resume`, `image`) VALUES
(1, 'Victoire de l\'équipe contre l\'OM', '2024-10-21', 'L\'équipe a remporté une belle victoire contre l\'Olympique de Marseille avec un score de 3-1.', 'Victoire contre l\'OM', 'image1.jpg'),
(2, 'Prochain match contre Lyon', '2024-10-28', 'L\'équipe se prépare pour son prochain match contre l\'Olympique Lyonnais.', 'Préparation au match contre Lyon', 'image2.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `adversaire`
--

CREATE TABLE `adversaire` (
  `id_adversaire` int(11) NOT NULL,
  `nom_adversaire` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `adversaire`
--

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

-- --------------------------------------------------------

--
-- Structure de la table `club`
--

CREATE TABLE `club` (
  `id_club` int(11) NOT NULL,
  `presentation` varchar(255) DEFAULT NULL,
  `histoire` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `club`
--

INSERT INTO `club` (`id_club`, `presentation`, `histoire`) VALUES
(1, 'Club de football professionnel basé à Paris.', 'Fondé en 1970, le club a connu un grand succès.');

-- --------------------------------------------------------

--
-- Structure de la table `duel`
--

CREATE TABLE `duel` (
  `id_match` int(11) NOT NULL,
  `date_match` date NOT NULL,
  `lieu_match` varchar(100) NOT NULL,
  `id_adversaire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `duel`
--

INSERT INTO `duel` (`id_match`, `date_match`, `lieu_match`, `id_adversaire`) VALUES
(8, '2024-10-01', 'Stade de France', 1),
(9, '2024-10-08', 'Parc des Princes', 2),
(10, '2024-10-15', 'Allianz Riviera', 3);

-- --------------------------------------------------------

--
-- Structure de la table `matchscore`
--

CREATE TABLE `matchscore` (
  `id_matchScore` int(11) NOT NULL,
  `id_match` int(11) NOT NULL,
  `score_equipe` int(11) NOT NULL,
  `score_adversaire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `matchscore`
--

INSERT INTO `matchscore` (`id_matchScore`, `id_match`, `score_equipe`, `score_adversaire`) VALUES
(18, 8, 3, 1),
(19, 9, 2, 2),
(20, 10, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `partenaire`
--

CREATE TABLE `partenaire` (
  `id_partenaire` int(11) NOT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `partenaire`
--

INSERT INTO `partenaire` (`id_partenaire`, `logo`, `url`) VALUES
(1, 'logo_partenaire1.png', 'https://www.partenaire1.com'),
(2, 'logo_partenaire2.png', 'https://www.partenaire2.com'),
(3, 'logo_partenaire3.png', 'https://www.partenaire3.com');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `nom_role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id_role`, `nom_role`) VALUES
(1, 'Administrateur'),
(2, 'Editeur');

-- --------------------------------------------------------

--
-- Structure de la table `section`
--

CREATE TABLE `section` (
  `id_section` int(11) NOT NULL,
  `nom_section` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `section`
--

INSERT INTO `section` (`id_section`, `nom_section`) VALUES
(1, 'masculine junior'),
(2, 'masculine senior'),
(3, 'féminine junior'),
(4, 'féminine senior');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT 0,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `full_name`, `email`, `password`, `isActive`, `id_role`) VALUES
(9, 'Jean Dupont', 'jean.dupont@example.com', 'password123', 1, 1),
(10, 'Marie Curie', 'marie.curie@example.com', 'password123', 1, 2),
(11, 'Paul Martin', 'paul.martin@example.com', 'password123', 0, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `actualite`
--
ALTER TABLE `actualite`
  ADD PRIMARY KEY (`id_actualite`);

--
-- Index pour la table `adversaire`
--
ALTER TABLE `adversaire`
  ADD PRIMARY KEY (`id_adversaire`);

--
-- Index pour la table `club`
--
ALTER TABLE `club`
  ADD PRIMARY KEY (`id_club`);

--
-- Index pour la table `duel`
--
ALTER TABLE `duel`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `id_adversaire` (`id_adversaire`);

--
-- Index pour la table `matchscore`
--
ALTER TABLE `matchscore`
  ADD PRIMARY KEY (`id_matchScore`),
  ADD KEY `id_match` (`id_match`);

--
-- Index pour la table `partenaire`
--
ALTER TABLE `partenaire`
  ADD PRIMARY KEY (`id_partenaire`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Index pour la table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id_section`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_role` (`id_role`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `actualite`
--
ALTER TABLE `actualite`
  MODIFY `id_actualite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `adversaire`
--
ALTER TABLE `adversaire`
  MODIFY `id_adversaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `club`
--
ALTER TABLE `club`
  MODIFY `id_club` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `duel`
--
ALTER TABLE `duel`
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `matchscore`
--
ALTER TABLE `matchscore`
  MODIFY `id_matchScore` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `partenaire`
--
ALTER TABLE `partenaire`
  MODIFY `id_partenaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `section`
--
ALTER TABLE `section`
  MODIFY `id_section` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `duel`
--
ALTER TABLE `duel`
  ADD CONSTRAINT `duel_ibfk_1` FOREIGN KEY (`id_adversaire`) REFERENCES `adversaire` (`id_adversaire`);

--
-- Contraintes pour la table `matchscore`
--
ALTER TABLE `matchscore`
  ADD CONSTRAINT `matchscore_ibfk_1` FOREIGN KEY (`id_match`) REFERENCES `match` (`id_match`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
