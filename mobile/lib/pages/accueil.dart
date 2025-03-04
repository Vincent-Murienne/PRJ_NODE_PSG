import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Accueil extends StatefulWidget {
  const Accueil({super.key});

  @override
  _AccueilPageState createState() => _AccueilPageState();
}

class _AccueilPageState extends State<Accueil> {
  final String apiUrl = 'http://localhost:8080/api'; // Remplace avec ton URL

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
      appBar: AppBar(title: const Text('Accueil')),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Section Actualités
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
            
            // Section Partenaires
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
                        leading: Image.network(partenaire['logo']),
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