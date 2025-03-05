import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:go_router/go_router.dart';

class Accueil extends StatefulWidget {
  const Accueil({super.key});

  @override
  _AccueilPageState createState() => _AccueilPageState();
}

class _AccueilPageState extends State<Accueil> {
  final String apiUrl = 'http://localhost:8080/api';

  Future<Map<String, dynamic>> fetchClubData() async {
    final response = await http.get(Uri.parse('$apiUrl/clubs'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erreur lors du chargement des informations du club');
    }
  }

  Future<List<dynamic>> fetchActualites() async {
    final response = await http.get(Uri.parse('$apiUrl/three-last-actualites'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erreur lors du chargement des actualités');
    }
  }

  Future<List<dynamic>> fetchPartenaires() async {
    final response = await http.get(Uri.parse('$apiUrl/partenaires'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erreur lors du chargement des partenaires');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Accueil')),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            FutureBuilder<Map<String, dynamic>>(
              future: fetchClubData(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Text('Erreur: ${snapshot.error}');
                } else {
                  final clubData = snapshot.data!;
                  return Column(
                    children: [
                      Text('Présentation du Club', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                      Image.network('https://upload.wikimedia.org/wikipedia/fr/thumb/f/ff/Logo_Paris_Saint-Germain_2024.svg/langfr-195px-Logo_Paris_Saint-Germain_2024.svg.png', height: 100),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(clubData['presentation'] ?? 'Aucune présentation disponible', textAlign: TextAlign.center),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(clubData['histoire'] ?? 'Aucune histoire disponible', textAlign: TextAlign.center),
                      ),
                    ],
                  );
                }
              },
            ),
            FutureBuilder<List<dynamic>>(
              future: fetchActualites(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Text('Erreur: ${snapshot.error}');
                } else {
                  return Column(
                    children: snapshot.data!.map((actualite) {
                      return ListTile(
                        title: Text(actualite['titre']),
                        subtitle: Text(actualite['resume']),
                      );
                    }).toList(),
                  );
                }
              },
            ),
            FutureBuilder<List<dynamic>>(
              future: fetchPartenaires(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Text('Erreur: ${snapshot.error}');
                } else {
                  return Column(
                    children: snapshot.data!.map((partenaire) {
                      return ListTile(
                        title: Text(partenaire['url']),
                        leading: Image.network(partenaire['logo']),
                      );
                    }).toList(),
                  );
                }
              },
            ),
            SizedBox(height: 30),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 20.0),
              child: Text(
                'Sections',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
            ),
            Column(
              children: [
                _buildSectionButton(context, 'Section Masculine Junior', '/section-masculine-junior'),
                _buildSectionButton(context, 'Section Masculine Senior', '/section-masculine-senior'),
                _buildSectionButton(context, 'Section Feminine Junior', '/section-feminine-junior'),
                _buildSectionButton(context, 'Section Feminine Senior', '/section-feminine-senior'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionButton(BuildContext context, String label, String route) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: ElevatedButton(
        onPressed: () {
          context.go(route);
        },
        child: Text(label),
        style: ElevatedButton.styleFrom(
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
          textStyle: TextStyle(fontSize: 16),
        ),
      ),
    );
  }
}
