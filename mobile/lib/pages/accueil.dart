import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

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
  final String apiUrl = 'http://localhost:8080/api';
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

  // Charger les actualités
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
            // Affichage de la section "à la une"
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                'Section à la une : ${featuredSectionId ?? "Aucune section sélectionnée"}',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),

            FutureBuilder<List<Match>>(
              future: fetchDerniersMatchs(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Text('Erreur: ${snapshot.error}');
                } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                  return const Center(child: Text('Aucun match disponible.'));
                } else {
                  List<Match> matches = snapshot.data!;

                  return Column(
                    children: matches.map((match) {
                      return ListTile(
                        title: Text(match.nomAdversaire),
                        subtitle: Text('${match.dateMatch.toLocal()} - ${match.lieuMatch}'),
                      );
                    }).toList(),
                  );
                }
              },
            ),

            // Actualités
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

            // Partenaires
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
          ],
        ),
      ),
    );
  }
}
