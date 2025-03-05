import 'dart:convert';
import 'package:mobile/models/match.dart';
import 'package:http/http.dart' as http;
import '../config/environment.dart';

class MatchService {
  final String _apiUrl = Environment.apiUrl;

  Future<List<Matche>> getMatches(int sectionId) async {
    final response = await http.get(Uri.parse('$_apiUrl/duels/$sectionId/calendrier'));

    if (response.statusCode == 200) {
      List<dynamic> matches = jsonDecode(response.body);

      return matches.map((e) {
        return Matche(
          id_match: e['id_match'],
          nom_adversaire: e['nom_adversaire'],
          date_match: e['date_match'],
          lieu_match: e['lieu_match'],
          nom_section: e['nom_section'],
          score_equipe: e['score_equipe'],
          score_adversaire: e['score_adversaire'],
          type_match: e['type_match'],
        );
      }).toList();
    }

    throw Exception("Erreur lors de la récupération des matchs");
  }
}
