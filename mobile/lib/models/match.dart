import 'dart:convert';

class Matche {
  final int id_match;
  final String nom_adversaire;
  final String date_match;
  final String lieu_match;
  final String nom_section;
  final int? score_equipe;
  final int? score_adversaire;
  final String type_match;

  Matche({
    required this.id_match,
    required this.nom_adversaire,
    required this.date_match,
    required this.lieu_match,
    required this.nom_section,
    this.score_equipe,
    this.score_adversaire,
    required this.type_match,
  });

  factory Matche.fromJson(Map<String, dynamic> json) {
    return Matche(
      id_match: json['id_match'],
      nom_adversaire: json['nom_adversaire'],
      date_match: json['date_match'],
      lieu_match: json['lieu_match'],
      nom_section: json['nom_section'],
      score_equipe: json['score_equipe'],
      score_adversaire: json['score_adversaire'],
      type_match: json['type_match'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id_match': id_match,
      'nom_adversaire': nom_adversaire,
      'date_match': date_match,
      'lieu_match': lieu_match,
      'nom_section': nom_section,
      'score_equipe': score_equipe,
      'score_adversaire': score_adversaire,
      'type_match': type_match,
    };
  }

  static List<Matche> fromJsonList(String source) {
    List<dynamic> data = jsonDecode(source);
    return data.map((e) => Matche.fromJson(e)).toList();
  }
}
