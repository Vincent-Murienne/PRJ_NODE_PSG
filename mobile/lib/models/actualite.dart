class Actualite {
  final int idActualite;
  final String titre;
  final String date;
  final String texteLong;
  final String resume;
  final String image;

  Actualite({
    required this.idActualite,
    required this.titre,
    required this.date,
    required this.texteLong,
    required this.resume,
    required this.image,
  });

  factory Actualite.fromJson(Map<String, dynamic> json) {
    return Actualite(
      idActualite: json['id_actualite'],
      titre: json['titre'],
      date: json['date'],
      texteLong: json['texte_long'],
      resume: json['resume'],
      image: json['image'],
    );
  }
}