import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:go_router/go_router.dart';
import '../config/environment.dart';
import 'package:expandable/expandable.dart';
import 'package:url_launcher/url_launcher.dart';


class Accueil extends StatefulWidget {
  const Accueil({super.key});

  @override
  _AccueilPageState createState() => _AccueilPageState();
}

class _AccueilPageState extends State<Accueil> {
  final String apiUrl = Environment.apiUrl;

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
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
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