import 'package:flutter/material.dart';
import 'app_router.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: appRouter,
      theme: ThemeData(
        // Personnalisation du thème
        bottomNavigationBarTheme: BottomNavigationBarThemeData(
          backgroundColor: Colors.black, // Fond noir
          selectedItemColor: Colors.white, // Icône sélectionnée en blanc
          unselectedItemColor: Colors.grey, // Icône non sélectionnée en gris
          selectedLabelStyle: TextStyle(color: Colors.white), // Texte sélectionné en blanc
          unselectedLabelStyle: TextStyle(color: Colors.grey), // Texte non sélectionné en gris
        ),
      ),
    );
  }
}

