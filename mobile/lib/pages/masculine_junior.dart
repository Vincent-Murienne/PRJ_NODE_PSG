import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:mobile/models/match.dart';
import 'package:mobile/services/match_service.dart';

class MasculineJunior extends StatefulWidget {
  const MasculineJunior({super.key});

  @override
  _MasculineJuniorState createState() => _MasculineJuniorState();
}

class _MasculineJuniorState extends State<MasculineJunior> {
  late Future<List<Matche>> futureMatches;
  int sectionId = 1;
  List<Matche> pastMatches = [];
  List<Matche> nextMatches = [];
  String? error;

  @override
  void initState() {
    super.initState();
    futureMatches = fetchMatches();
  }

  Future<List<Matche>> fetchMatches() async {
  try {
    List<Matche> matches = await MatchService().getMatches(sectionId);

    setState(() {
      pastMatches = matches.where((m) => DateTime.parse(m.date_match).isBefore(DateTime.now())).toList();
      nextMatches = matches.where((m) => DateTime.parse(m.date_match).isAfter(DateTime.now())).toList();
    });

    return matches;
  } catch (e) {
    log('Erreur lors de la récupération des matchs: $e');
    setState(() {
      error = 'Erreur de connexion avec le serveur.';
    });
    return [];
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Masculine Juniorrrrr')),
      body: FutureBuilder(
        future: futureMatches,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError || error != null) {
            return Center(child: Text(error ?? 'Une erreur est survenue'));
          } else {
            return SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Text('Matchs précédents', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  ),
                  ...pastMatches.map((match) => ListTile(
                        title: Text('VS ${match.nom_adversaire}'),
                        subtitle: Text(
                            'Date: ${match.date_match}\nLieu: ${match.lieu_match}\nScore équipe: ${match.score_equipe ?? "N/A"}\nScore adversaire: ${match.score_adversaire ?? "N/A"}'),
                      )),
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Text('Prochains matchs', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  ),
                  ...nextMatches.map((match) => ListTile(
                        title: Text('VS ${match.nom_adversaire}'),
                        subtitle: Text('Date: ${match.date_match}\nLieu: ${match.lieu_match}'),
                      )),
                ],
              ),
            );
          }
        },
      ),
    );
  }
}
