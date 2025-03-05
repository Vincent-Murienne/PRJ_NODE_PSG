import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'layout/base_layout.dart';

// Import des pages
import 'pages/accueil.dart';
import 'pages/presentation-club.dart';
import 'pages/sectionHome.dart';
import 'pages/actualites.dart';
import 'pages/login.dart';
import 'pages/mentions-legales.dart';

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
          path: '/presentation-club', 
          builder: (context, state) => BaseLayout(child: PresentationClub()),
        ),
        GoRoute(
          path: '/sectionHome', 
          builder: (context, state) => BaseLayout(child: Sections()),
        ),
        GoRoute(
          path: '/actualites', 
          builder: (context, state) => BaseLayout(child: ActualitesPage()),
        ),
        GoRoute(
          path: '/mentions-legales', 
          builder: (context, state) => BaseLayout(child: MentionsLegales()),
        ),
      ],
    );
  }
}
