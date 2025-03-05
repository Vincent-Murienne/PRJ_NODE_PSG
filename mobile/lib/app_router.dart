import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// Import des pages
import 'pages/accueil.dart';
import 'pages/presentation-club.dart';
import 'pages/sectionHome.dart';
// import 'pages/section-masculine-junior.dart';
// import 'pages/section-masculine-senior.dart';
// import 'pages/section-feminine-junior.dart';
// import 'pages/section-feminine-senior.dart';
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
          BottomNavigationBarItem(icon: Icon(Icons.info), label: "Présentation"),
          BottomNavigationBarItem(icon: Icon(Icons.access_alarm_sharp), label: "Sections"),
          BottomNavigationBarItem(icon: Icon(Icons.article), label: "Actualités"),
          BottomNavigationBarItem(icon: Icon(Icons.info_outline), label: "Mentions légales"),
          BottomNavigationBarItem(icon: Icon(Icons.account_circle), label: "Connexion"),
        ],
      ),
    );
  }

  int _getSelectedIndex(BuildContext context) {
    final location = GoRouter.of(context).routeInformationProvider.value.uri.toString();
    if (location == "/presentation-club") return 1;
    if (location == "/sectionHome") return 2;
    if (location == "/actualites") return 3;
    if (location == "/mentions-legales") return 4;
    if (location == "/login") return 5;
    return 0;
  }

  void _onItemTapped(BuildContext context, int index) {
    switch (index) {
      case 0:
        context.go('/');
        break;
      case 1:
        context.go('/presentation-club');
        break;
      case 2:
        context.go('/sectionHome');
        break;
      case 3:
        context.go('/actualites');
        break;
      case 4:
        context.go('/mentions-legales');
        break;
      case 5:
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
        GoRoute(path: '/presentation-club', builder: (context, state) => PresentationClub()),
        GoRoute(path: '/sectionHome', builder: (context, state) => Sections()),
        GoRoute(path: '/actualites', builder: (context, state) =>  ActualitesPage()),
        GoRoute(path: '/mentions-legales', builder: (context, state) => MentionsLegales()),
        GoRoute(path: '/login', builder: (context, state) => Login()),
      ],
    ),
  ],
);
