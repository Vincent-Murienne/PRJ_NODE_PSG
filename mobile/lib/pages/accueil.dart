import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
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
  }

  Future<void> _loadFeaturedSection() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      featuredSectionId = prefs.getString('featured_section_id');
    });

    if (featuredSectionId != null) {
      fetchMatches();
      fetchClubData();
      fetchPartenaires();
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
      setState(() {
        clubData = json.decode(response.body);
      });
      return clubData!;
    } else {
      throw Exception('Erreur lors du chargement des informations du club');
    }
  }

  Future<List<dynamic>> fetchPartenaires() async {
    final response = await http.get(Uri.parse('$apiUrl/partenaires'));
    if (response.statusCode == 200) {
      setState(() {
        partenaires = json.decode(response.body);
      });
      return partenaires;
    } else {
      throw Exception('Erreur lors du chargement des partenaires');
    }
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
              const SizedBox(height: 20),
              _buildClubSection(),
                const SizedBox(height: 20),
              _buildPartenaires(),
            ],
          ),
        ),
      ),
    );
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

  Widget _buildClubSection() {
    if (clubData == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Présentation du Club', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        Image.network(
          'https://upload.wikimedia.org/wikipedia/fr/thumb/f/ff/Logo_Paris_Saint-Germain_2024.svg/langfr-195px-Logo_Paris_Saint-Germain_2024.svg.png',
          height: 100,
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(clubData!['presentation'] ?? 'Aucune présentation disponible', textAlign: TextAlign.center),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(clubData!['histoire'] ?? 'Aucune histoire disponible', textAlign: TextAlign.center),
        ),
      ],
    );
  }

    Widget _buildPartenaires() {
  if (partenaires.isEmpty) {
    return const Center(child: CircularProgressIndicator());
  }

  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text('Nos Partenaires', 
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),

      Column(
        children: partenaires.map((partenaire) {
          return Card(
            elevation: 3,
            margin: EdgeInsets.symmetric(vertical: 8),
            child: ListTile(
              title: Text(partenaire['nom'] ?? 'Nom inconnu'),
              subtitle: Text(partenaire['url'] ?? 'URL non disponible'),
              leading: partenaire['logo'] != null
                  ? Image.network(
                      partenaire['logo'], 
                      width: 50, 
                      height: 50, 
                      fit: BoxFit.cover)
                  : Icon(Icons.image_not_supported),
            ),
          );
        }).toList(),
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
  );
}

Widget _buildSectionButton(BuildContext context, String label, String route) {
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 10.0),
    child: ElevatedButton(
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
        textStyle: TextStyle(fontSize: 16),
      ),
      onPressed: () {
        context.go(route);
      },
      child: Text(label),
    ),
  );
}
}