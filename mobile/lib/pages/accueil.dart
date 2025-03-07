import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/environment.dart';
import 'package:expandable/expandable.dart';
import 'package:url_launcher/url_launcher.dart';

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

    @override
  void initState() {
    super.initState();
    _loadFeaturedSection();
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


  Widget _buildMatchSection(String title, List<Match> matches) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 10),
        if (matches.isEmpty)
          Text('Aucun match disponible', style: TextStyle(fontStyle: FontStyle.italic)),
        ...matches.map((match) => _buildMatchCard(match)).toList(),
      ],
    );
  }

  Widget _buildMatchCard(Match match) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('VS ${match.nomAdversaire}', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                Icon(Icons.sports_soccer, color: Colors.blueAccent),
              ],
            ),
            const SizedBox(height: 8),
            Text('Date: ${DateFormat('dd/MM/yyyy HH:mm').format(match.dateMatch)}',
                style: TextStyle(color: Colors.grey[700])),
            Text('Lieu: ${match.lieuMatch}', style: TextStyle(color: Colors.grey[700])),
            if (match.dateMatch.isBefore(DateTime.now()) &&
                match.scoreEquipe != null &&
                match.scoreAdversaire != null)
              Padding(
                padding: const EdgeInsets.only(top: 8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('${match.scoreEquipe}', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                    const SizedBox(width: 10),
                    Text('-', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                    const SizedBox(width: 10),
                    Text('${match.scoreAdversaire}', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }

  
 @override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: const Text('Accueil')),
    body: SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Section à la une : ${featuredSectionId ?? "Aucune section sélectionnée"}',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            _buildMatchSection('Matchs précédents', pastMatches),
            const SizedBox(height: 20),
            _buildMatchSection('Prochains matchs', nextMatches),
            const SizedBox(height: 30),
            FutureBuilder<Map<String, dynamic>>(
              future: fetchClubData(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Text('Erreur: \${snapshot.error}');
                } else {
                  final clubData = snapshot.data!;
                  return Column(
                    children: [
                      Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15.0),
                        ),
                        elevation: 5,
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            children: [
                              Text('Présentation du Club', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                              const SizedBox(height: 10),
                              Image.network(
                                'https://upload.wikimedia.org/wikipedia/fr/thumb/f/ff/Logo_Paris_Saint-Germain_2024.svg/langfr-195px-Logo_Paris_Saint-Germain_2024.svg.png',
                                height: 100,
                              ),
                              const SizedBox(height: 10),
                              Text(clubData['presentation'] ?? 'Aucune présentation disponible', softWrap: true),
                              const SizedBox(height: 10),
                              ExpandableText(clubData['histoire'] ?? 'Aucune histoire disponible'),
                            ],
                          ),
                        ),
                      ),
                    ],
                  );
                }
              },
            ),
 
            const SizedBox(height: 30),
            Center(
              child: Column(
                children: [
                  SectionButton('Section Masculine Junior', '/section-masculine-junior'),
                  SectionButton('Section Masculine Senior', '/section-masculine-senior'),
                  SectionButton('Section Féminine Junior', '/section-feminine-junior'),
                  SectionButton('Section Féminine Senior', '/section-feminine-senior'),
                ],
              ),
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
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 10), // Espacement entre les éléments
                      child: InkWell(
                        onTap: () async {
                          final Uri url = Uri.parse(partenaire['url']);
                          try {
                            if (await canLaunchUrl(url)) {
                              await launchUrl(url, mode: LaunchMode.externalApplication);
                            } else {
                              print('Impossible d\'ouvrir l\'URL: $url');
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text('Impossible d\'ouvrir l\'URL'))
                              );
                            }
                          } catch (e) {
                            print('Erreur lors de l\'ouverture de l\'URL: $e');
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Erreur lors de l\'ouverture de l\'URL'))
                            );
                          }
                        },
                        child: Column(
                          children: [
                            Center(  // Centrer l'image
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(10), // Coins arrondis pour l'image
                                child: Image.network(
                                  partenaire['logo'],
                                  width: 100, // Taille de l'image
                                  height: 100,
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                            const SizedBox(height: 5), // Espacement entre l'image et le texte (facultatif)
                            Text(
                              partenaire['nom'] ?? '', // Affiche le nom du partenaire
                              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                    );
                  }).toList(),
                );
              }
            },
          ),
          ],
        ),
      ),
    ),
    );
  }
}

class SectionButton extends StatefulWidget {
  final String title;
  final String route;

  const SectionButton(this.title, this.route, {super.key});

  @override
  _SectionButtonState createState() => _SectionButtonState();
}

class _SectionButtonState extends State<SectionButton> {
  bool _isClicked = false;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: _isClicked ? Colors.blueGrey : Colors.blue,
          padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
        ),
        onPressed: () {
          setState(() {
            _isClicked = !_isClicked; // Change la couleur au clic
          });
          context.go(widget.route);
        },
        child: Text(widget.title, style: const TextStyle(color: Colors.white)),
      ),
    );
  }
}

class ExpandableText extends StatelessWidget {
  final String text;

  const ExpandableText(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    return ExpandablePanel(
      header: const Text("Lire plus", style: TextStyle(fontWeight: FontWeight.bold)),
      collapsed: Text(text, softWrap: true, maxLines: 3, overflow: TextOverflow.ellipsis),
      expanded: Text(text, softWrap: true),
    );
  }
}