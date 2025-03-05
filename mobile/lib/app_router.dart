import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'layout/base_layout.dart';

// Import des pages
import 'pages/accueil.dart';
import 'pages/masculineJunior.dart';
import 'pages/masculineSenior.dart';
import 'pages/feminineSenior.dart';
import 'pages/feminineJunior.dart';
import 'pages/actualites.dart';
import 'pages/login.dart';
import 'pages/mentions-legales.dart';
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
          builder: (context, state) => BaseLayout(child: MasculineJunior()) // Ajout du BaseLayout
        ),
        GoRoute(
          path: '/section-masculine-senior', 
          builder: (context, state) => BaseLayout(child: MasculineSenior()) // Ajout du BaseLayout
        ),
        GoRoute(
          path: '/section-feminine-junior', 
          builder: (context, state) => BaseLayout(child: FeminineJunior()) // Ajout du BaseLayout
        ),
        GoRoute(
          path: '/section-feminine-senior', 
          builder: (context, state) => BaseLayout(child: FeminineSenior()) // Ajout du BaseLayout
        ),
        GoRoute(
          path: '/favoris', 
          builder: (context, state) => BaseLayout(child: Favoris()) // Ajout du BaseLayout
        ),
      ],
    );
  }
}
