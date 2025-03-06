import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../config/environment.dart';
import '../models/actualite.dart';

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
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              children: [
                SizedBox(height: 30),
                Expanded(
                  child: ListView.builder(
                    itemCount: actualites.length,
                    itemBuilder: (context, index) {
                      final actualite = actualites[index];
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 16),
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15),
                          ),
                          elevation: 3,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              actualite.image.isNotEmpty
                                  ? ClipRRect(
                                      borderRadius: const BorderRadius.only(
                                        topLeft: Radius.circular(15),
                                        topRight: Radius.circular(15),
                                      ),
                                      child: Image.network(
                                        actualite.image,
                                        width: double.infinity,
                                        height: 180, // Hauteur ajustable selon ton besoin
                                        fit: BoxFit.cover,
                                      ),
                                    )
                                  : Container(
                                      height: 180,
                                      width: double.infinity,
                                      decoration: BoxDecoration(
                                        color: Colors.grey[300],
                                        borderRadius: const BorderRadius.only(
                                          topLeft: Radius.circular(15),
                                          topRight: Radius.circular(15),
                                        ),
                                      ),
                                    ),
                              Padding(
                                padding: const EdgeInsets.all(10),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      actualite.titre,
                                      style: const TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold),
                                      textAlign: TextAlign.left,
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      DateTime.parse(actualite.date)
                                          .toLocal()
                                          .toString(),
                                      style: const TextStyle(
                                          fontSize: 12, color: Colors.grey),
                                    ),
                                    const SizedBox(height: 6),
                                    Text(
                                      actualite.resume,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
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
                ),
              ],
            ),
          ),
  );
}
}