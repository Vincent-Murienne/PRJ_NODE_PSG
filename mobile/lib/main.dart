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
          selectedItemColor: Colors.blue, // Icône sélectionnée en bleu
          unselectedItemColor: Colors.blueGrey, // Icône non sélectionnée en bleu/gris
          selectedLabelStyle: TextStyle(color: Colors.blue), // Texte sélectionné en bleu
          unselectedLabelStyle: TextStyle(color: Colors.blueGrey), // Texte non sélectionné en bleu/gris
        ),
      ),
    );
  }
}