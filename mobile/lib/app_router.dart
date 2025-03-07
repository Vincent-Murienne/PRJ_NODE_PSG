import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'layout/base_layout.dart';

// Import des pages
import 'pages/accueil.dart';
import 'pages/masculine_junior.dart';
import 'pages/masculine_senior.dart';
import 'pages/feminine_senior.dart';
import 'pages/feminine_junior.dart';
import 'pages/actualites.dart';
import 'pages/login.dart';
import 'pages/mentions_legales.dart';
import 'pages/ajout_actualite.dart';
import 'pages/favoris.dart';

// Dans app_router.dart

class AppRouter {
  static final _rootNavigatorKey = GlobalKey<NavigatorState>();
  static GoRouter getRouter() {
    return GoRouter(
      navigatorKey: _rootNavigatorKey,
      initialLocation: '/',
      routes: [
        GoRoute(
          path: '/login',
          builder: (context, state) => BaseLayout(child: Login()),
        ),
        GoRoute(
          path: '/',
          builder: (context, state) => BaseLayout(child: Accueil()),
        ),
        GoRoute(
          path: '/actualites', 
          builder: (context, state) => BaseLayout(child: ActualitesPage()),
        ),
        GoRoute(
          path: '/mentions-legales', 
          builder: (context, state) => BaseLayout(child: MentionsLegales()),
        ),
        GoRoute(
          path: '/section-masculine-junior', 
          builder: (context, state) => BaseLayout(child: MasculineJunior())
        ),
        GoRoute(
          path: '/section-masculine-senior', 
          builder: (context, state) => BaseLayout(child: MasculineSenior())
        ),
        GoRoute(
          path: '/section-feminine-junior', 
          builder: (context, state) => BaseLayout(child: FeminineJunior())
        ),
        GoRoute(
          path: '/section-feminine-senior', 
          builder: (context, state) => BaseLayout(child: FeminineSenior())
        ),
        GoRoute(
          path: '/ajout-actualite', 
          builder: (context, state) => BaseLayout(child: AjoutActualite())
        ),
        GoRoute(
          path: '/favoris', 
          builder: (context, state) => BaseLayout(child: Favoris()) // Ajout du BaseLayout
        ),
      ],
    );
  }
}
