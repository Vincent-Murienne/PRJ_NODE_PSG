import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BaseLayout extends StatefulWidget {
  final Widget child;
  const BaseLayout({required this.child, Key? key}) : super(key: key);

  @override
  _BaseLayoutState createState() => _BaseLayoutState();
}

class _BaseLayoutState extends State<BaseLayout> {
  bool isAuthenticated = false;

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  Future<void> _checkLoginStatus() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('token');
    setState(() {
      isAuthenticated = token != null;
    });
  }

  Future<void> _logout() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');

    setState(() {
      isAuthenticated = false;
    });

    context.go('/'); // Retour à l'accueil après déconnexion
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _getSelectedIndex(context),
        onTap: (index) => _onItemTapped(context, index),
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Accueil"),
          BottomNavigationBarItem(icon: Icon(Icons.article), label: "Actualités"),
          BottomNavigationBarItem(icon: Icon(Icons.info_outline), label: "Mentions légales"),
          ...(isAuthenticated
              ? [
                  BottomNavigationBarItem(icon: Icon(Icons.add), label: "AjoutActualité"),
                  BottomNavigationBarItem(icon: Icon(Icons.logout), label: "Déconnexion")
                ]
              : [
                  BottomNavigationBarItem(icon: Icon(Icons.account_circle), label: "Connexion")
                ]),
        ],
      ),
    );
  }

  int _getSelectedIndex(BuildContext context) {
    final location = GoRouter.of(context).routeInformationProvider.value.uri.toString();
    if (location == "/actualites") return 1;
    if (location == "/mentions-legales") return 2;
    if (isAuthenticated) {
      if (location == "/ajout-actualite") return 3;
      if (location == "/login") return 4;
    } else {
      if (location == "/login") return 3;
    }
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
        if (isAuthenticated) {
          context.go('/ajout-actualite');
        } else {
          context.go('/login');
        }
        break;
      case 4:
        if (isAuthenticated) {
          _logout();
        }
        break;
    }
  }
}