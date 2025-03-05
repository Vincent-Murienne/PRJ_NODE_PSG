import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

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
      final response =
          await http.get(Uri.parse('http://localhost:8080/api/actualites'));

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        setState(() {
          actualites = data.map((item) => Actualite.fromJson(item)).toList();
        });
      } else {
        throw Exception('Erreur HTTP: ${response.statusCode}');
      }
    } catch (error) {
      //print("Erreur lors de la récupération des actualités: $error");
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
        centerTitle: true, // Centre le titre de l'AppBar
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: actualites.length,
              itemBuilder: (context, index) {
                final actualite = actualites[index];
                return Card(
                  margin: const EdgeInsets.all(10),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                  elevation: 4,
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center, // Centre horizontalement
                      crossAxisAlignment: CrossAxisAlignment.center, // Centre verticalement
                      children: [
                        // Image à gauche
                        actualite.image.isNotEmpty
                            ? ClipRRect(
                                borderRadius: BorderRadius.circular(10),
                                child: Image.network(
                                  actualite.image,
                                  height: 100,
                                  width: 100,
                                  fit: BoxFit.cover,
                                ),
                              )
                            : const SizedBox(width: 100, height: 100),

                        const SizedBox(width: 10), // Espacement entre image et texte

                        // Texte à droite
                        Expanded(
                          flex: 2, // Permet au texte de prendre plus d'espace
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center, // Centre le texte dans la colonne
                            crossAxisAlignment: CrossAxisAlignment.center, // Centre chaque élément
                            children: [
                              Text(
                                actualite.titre,
                                style: const TextStyle(
                                    fontSize: 18, fontWeight: FontWeight.bold),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 5),
                              Text(
                                DateTime.parse(actualite.date)
                                    .toLocal()
                                    .toString(),
                                style: const TextStyle(
                                    fontSize: 12, color: Colors.grey),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 10),
                              Text(
                                actualite.resume,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}