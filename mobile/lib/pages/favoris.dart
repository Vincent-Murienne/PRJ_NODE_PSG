import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Favoris extends StatefulWidget {
  @override
  _FavorisState createState() => _FavorisState();
}

class _FavorisState extends State<Favoris> {
  String? selectedSectionId;
  final Map<String, String> sections = {
    '1': 'Masculin Junior',
    '2': 'Masculin Senior',
    '3': 'Féminin Junior',
    '4': 'Féminin Senior'
  };

  @override
  void initState() {
    super.initState();
    _loadPreference();
  }

  // Charger la préférence sauvegardée
  Future<void> _loadPreference() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      selectedSectionId = prefs.getString('featured_section_id') ?? '1'; // ID par défaut
    });
  }

  // Sauvegarder la préférence choisie
  Future<void> _savePreference() async {
    if (selectedSectionId != null) {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('featured_section_id', selectedSectionId!);

      // Afficher une confirmation à l'utilisateur
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Préférence sauvegardée avec succès !'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Préférences')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Choisissez votre section "à la une" :',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            DropdownButton<String>(
              value: selectedSectionId,
              items: sections.entries.map((entry) {
                return DropdownMenuItem<String>(
                  value: entry.key,
                  child: Text(entry.value),
                );
              }).toList(),
              onChanged: (newValue) {
                setState(() {
                  selectedSectionId = newValue!;
                });
              },
            ),
            SizedBox(height: 20),
            Center(
              child: ElevatedButton(
                onPressed: _savePreference,
                child: Text('Sauvegarder'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
