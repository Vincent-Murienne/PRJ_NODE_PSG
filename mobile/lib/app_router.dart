import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// Import des pages
import 'pages/accueil.dart';
import 'pages/masculineJunior.dart';
import 'pages/masculineSenior.dart';
import 'pages/feminineSenior.dart';
import 'pages/feminineJunior.dart';
import 'pages/actualites.dart';
import 'pages/login.dart';
import 'pages/mentions-legales.dart';

class BaseLayout extends StatelessWidget {
  final Widget child;
  const BaseLayout({required this.child, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _getSelectedIndex(context),
        onTap: (index) => _onItemTapped(context, index),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Accueil"),
          BottomNavigationBarItem(icon: Icon(Icons.article), label: "Actualités"),
          BottomNavigationBarItem(icon: Icon(Icons.info_outline), label: "Mentions légales"),
          BottomNavigationBarItem(icon: Icon(Icons.account_circle), label: "Connexion"),
        ],
      ),
    );
  }

  int _getSelectedIndex(BuildContext context) {
    final location = GoRouter.of(context).routeInformationProvider.value.uri.toString();
    if (location == "/actualites") return 1;
    if (location == "/mentions-legales") return 2;
    if (location == "/login") return 2;
    return 0;
  }

  void _onItemTapped(BuildContext context, int index) {
    switch (index) {
      case 0:
        context.go('/');
        break;
      case 1:
        context.go('/actualites');
        break;
      case 2:
        context.go('/mentions-legales');
        break;
      case 3:
        context.go('/login');
        break;
    }
  }
}

// Routeur principal
final GoRouter appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    ShellRoute(
      builder: (context, state, child) => BaseLayout(child: child), // Ajout du builder
      routes: [
        GoRoute(path: '/', builder: (context, state) => Accueil()),
        GoRoute(path: '/actualites', builder: (context, state) =>  ActualitesPage()),
        GoRoute(path: '/mentions-legales', builder: (context, state) => MentionsLegales()),
        GoRoute(path: '/login', builder: (context, state) => Login()),
        GoRoute(path: '/section-masculine-junior', builder: (context, state) => MasculineJunior()),
        GoRoute(path: '/section-masculine-senior', builder: (context, state) => MasculineSenior()),
        GoRoute(path: '/section-feminine-junior', builder: (context, state) => FeminineJunior()),
        GoRoute(path: '/section-feminine-senior', builder: (context, state) => FeminineSenior()),
      ],
    ),
  ],
);
