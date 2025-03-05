import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:go_router/go_router.dart';
import '../config/environment.dart';

class Match {
  final String nomAdversaire;
  final DateTime dateMatch;
  final String lieuMatch;
  final int? scoreEquipe;
  final int? scoreAdversaire;

  Match({
    required this.nomAdversaire,
    required this.dateMatch,
    required this.lieuMatch,
    this.scoreEquipe,
    this.scoreAdversaire,
  });

  factory Match.fromJson(Map<String, dynamic> json) {
    return Match(
      nomAdversaire: json['nom_adversaire'],
      dateMatch: DateTime.parse(json['date_match']),
      lieuMatch: json['lieu_match'],
      scoreEquipe: json['score_equipe'],
      scoreAdversaire: json['score_adversaire'],
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
  String? featuredSectionId;

  List<Match> pastMatches = [];
  List<Match> nextMatches = [];
  bool isLoading = true;
  String? error;
  Map<String, dynamic>? clubData;
  List<dynamic> partenaires = [];

  @override
  void initState() {
    super.initState();
    _loadFeaturedSection();
    fetchClubData();
    fetchPartenaires();
  }

  Future<void> _loadFeaturedSection() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      featuredSectionId = prefs.getString('featured_section_id');
    });

    if (featuredSectionId != null) {
      fetchMatches();
    }
  }

  Future<void> fetchMatches() async {
    if (featuredSectionId == null) return;

    try {
      final response = await http.get(Uri.parse('$apiUrl/duels/$featuredSectionId/calendrier'));

      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(response.body);
        List<Match> matches = data.map((matchJson) => Match.fromJson(matchJson)).toList();

        setState(() {
          pastMatches = matches.where((m) => m.dateMatch.isBefore(DateTime.now())).toList();
          nextMatches = matches.where((m) => m.dateMatch.isAfter(DateTime.now())).toList();
          isLoading = false;
        });
      } else {
        throw Exception('Erreur lors du chargement des matchs');
      }
    } catch (e) {
      setState(() {
        error = 'Erreur de connexion avec le serveur.';
        isLoading = false;
      });
    }
  }


  Future<Map<String, dynamic>> fetchClubData() async {
    final response = await http.get(Uri.parse('$apiUrl/clubs'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erreur lors du chargement des informations du club');
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
                        // Affichage de la section "à la une"
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                'Section à la une : ${featuredSectionId ?? "Aucune section sélectionnée"}',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),

            // Matchs précédents
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Matchs précédents', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
            ...pastMatches.map((match) => ListTile(
                  title: Text('VS ${match.nomAdversaire}'),
                  subtitle: Text(
                      'Date: ${DateFormat('dd/MM/yyyy HH:mm').format(match.dateMatch)}\nLieu: ${match.lieuMatch}\nScore: ${match.scoreEquipe ?? "N/A"} - ${match.scoreAdversaire ?? "N/A"}'),
                )),

            // Prochains matchs
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Prochains matchs', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
            ...nextMatches.map((match) => ListTile(
                  title: Text('VS ${match.nomAdversaire}'),
                  subtitle: Text('Date: ${DateFormat('dd/MM/yyyy HH:mm').format(match.dateMatch)}\nLieu: ${match.lieuMatch}'),
                )),

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
