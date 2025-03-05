import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:go_router/go_router.dart';
import '../config/environment.dart';

class Match {
  final int idMatch;
  final String nomAdversaire;
  final DateTime dateMatch;
  final String lieuMatch;

  Match({
    required this.idMatch,
    required this.nomAdversaire,
    required this.dateMatch,
    required this.lieuMatch,
  });

  factory Match.fromJson(Map<String, dynamic> json) {
    return Match(
      idMatch: json['id_match'],
      nomAdversaire: json['nom_adversaire'],
      dateMatch: DateTime.parse(json['date_match']),
      lieuMatch: json['lieu_match'],
    );
  }
}

class Accueil extends StatefulWidget {
  const Accueil({super.key});

  @override
  _AccueilPageState createState() => _AccueilPageState();
}

class _AccueilPageState extends State<Accueil> {
  final String apiUrl = Environment.apiUrl;

  Future<Map<String, dynamic>> fetchClubData() async {
    final response = await http.get(Uri.parse('$apiUrl/clubs'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erreur lors du chargement des informations du club');
    }
  }

  String? featuredSectionId;  // Utilisation de l'ID de la section

  @override
  void initState() {
    super.initState();
    _loadFeaturedSection();
  }

  // Charger la section "à la une" depuis les préférences
  Future<void> _loadFeaturedSection() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      featuredSectionId = prefs.getString('featured_section_id');  // Charger l'ID sauvegardé
    });
  }

  // Charger les derniers matchs en fonction de l'ID de la section
  Future<List<Match>> fetchDerniersMatchs() async {
    if (featuredSectionId == null) return []; // Si aucune section n'est sélectionnée

    final response = await http.get(Uri.parse('$apiUrl/duels/$featuredSectionId/calendrier'));

    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(response.body);
      return data.map((matchJson) => Match.fromJson(matchJson)).toList();
    } else {
      throw Exception('Erreur lors du chargement des matchs');
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

  // Charger les partenaires
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
            //             // Affichage de la section "à la une"
            // Padding(
            //   padding: const EdgeInsets.all(16.0),
            //   child: Text(
            //     'Section à la une : ${featuredSectionId ?? "Aucune section sélectionnée"}',
            //     style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            //   ),
            // ),

            // FutureBuilder<List<Match>>(
            //   future: fetchDerniersMatchs(),
            //   builder: (context, snapshot) {
            //     if (snapshot.connectionState == ConnectionState.waiting) {
            //       return const Center(child: CircularProgressIndicator());
            //     } else if (snapshot.hasError) {
            //       return Text('Erreur: ${snapshot.error}');
            //     } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            //       return const Center(child: Text('Aucun match disponible.'));
            //     } else {
            //       List<Match> matches = snapshot.data!;

            //       return Column(
            //         children: matches.map((match) {
            //           return ListTile(
            //             title: Text(match.nomAdversaire),
            //             subtitle: Text('${match.dateMatch.toLocal()} - ${match.lieuMatch}'),
            //           );
            //         }).toList(),
            //       );
            //     }
            //   },
            // ),
            // FutureBuilder<Map<String, dynamic>>(
            //   future: fetchClubData(),
            //   builder: (context, snapshot) {
            //     if (snapshot.connectionState == ConnectionState.waiting) {
            //       return const Center(child: CircularProgressIndicator());
            //     } else if (snapshot.hasError) {
            //       return Text('Erreur: ${snapshot.error}');
            //     } else {
            //       final clubData = snapshot.data!;
            //       return Column(
            //         children: [
            //           Text('Présentation du Club', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            //           Image.network('https://upload.wikimedia.org/wikipedia/fr/thumb/f/ff/Logo_Paris_Saint-Germain_2024.svg/langfr-195px-Logo_Paris_Saint-Germain_2024.svg.png', height: 100),
            //           Padding(
            //             padding: const EdgeInsets.all(8.0),
            //             child: Text(clubData['presentation'] ?? 'Aucune présentation disponible', textAlign: TextAlign.center),
            //           ),
            //           Padding(
            //             padding: const EdgeInsets.all(8.0),
            //             child: Text(clubData['histoire'] ?? 'Aucune histoire disponible', textAlign: TextAlign.center),
            //           ),
            //         ],
            //       );
            //     }
            //   },
            // ),
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
                        leading: SizedBox(
                          width: 40,  // Limite la taille du leading (image)
                          child: Image.network(partenaire['logo']),
                        ),
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
