import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../config/environment.dart';
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

class ActualitesPage extends StatefulWidget {
  const ActualitesPage({super.key});

  @override
  ActualitesPageState createState() => ActualitesPageState();
}

class ActualitesPageState extends State<ActualitesPage> {
  List<Actualite> actualites = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchActualites();
  }

  Future<void> fetchActualites() async {
    try {
      final response = await http.get(Uri.parse('${Environment.apiUrl}/actualites'));
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        setState(() {
          actualites = data.map((item) => Actualite.fromJson(item)).toList();
        });
      } else {
        throw Exception('Erreur HTTP: ${response.statusCode}');
      }
    } catch (error) {
      // print("Erreur lors de la récupération des actualités: $error");
    } finally {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Actualités'),
        centerTitle: true,
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.symmetric(horizontal: 100),
              child: Column(
                children: [
                  const SizedBox(height: 30), // Ajout d’un espace sous le titre
                  Expanded(
                    child: GridView.builder(
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2, // 2 éléments par ligne
                        crossAxisSpacing: 10, // Espacement horizontal réduit
                        mainAxisSpacing: 10, // Espacement vertical réduit
                        mainAxisExtent: 220, // Hauteur réduite des cartes
                      ),
                      itemCount: actualites.length,
                      itemBuilder: (context, index) {
                        final actualite = actualites[index];
                        return Center(
                          child: Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15),
                            ),
                            elevation: 3, // Légère ombre
                            child: Padding(
                              padding: const EdgeInsets.all(10), // Réduction du padding
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  actualite.image.isNotEmpty
                                      ? ClipRRect(
                                          borderRadius: BorderRadius.circular(10),
                                          child: Image.network(
                                            actualite.image,
                                            height: 80, // Réduction de l’image
                                            width: 80,
                                            fit: BoxFit.cover,
                                          ),
                                        )
                                      : const SizedBox(width: 80, height: 80),
                                  const SizedBox(height: 8), // Moins d’espace sous l’image
                                  Text(
                                    actualite.titre,
                                    style: const TextStyle(
                                        fontSize: 16, fontWeight: FontWeight.bold),
                                    textAlign: TextAlign.center,
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    DateTime.parse(actualite.date)
                                        .toLocal()
                                        .toString(),
                                    style: const TextStyle(
                                        fontSize: 12, color: Colors.grey),
                                    textAlign: TextAlign.center,
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    actualite.resume,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
