import 'package:flutter/material.dart';

class MentionsLegales extends StatelessWidget {
  const MentionsLegales({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mentions Légales'),
        centerTitle: true,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                buildSectionTitle('Nom du Club'),
                buildParagraph('Paris Saint-Germain'),
                
                buildSectionTitle('Adresse du Siège Social'),
                buildParagraph('10 avenue de Paris, Levallois-Perret'),
                
                buildSectionTitle('Directeur de la Publication'),
                buildParagraph('Vincent Murienne'),
                
                buildSectionTitle('Contact'),
                buildParagraph('Téléphone : +33785463219'),
                buildLink('Email : psg_support@mail.com', 'mailto:psg_support@mail.com'),
                
                buildSectionTitle('Propriété Intellectuelle'),
                buildParagraph(
                  "L'ensemble des contenus, textes, images, vidéos, logos et éléments graphiques "
                  "présentés sur le site sont la propriété de Notre Association Sport ou sont utilisés "
                  "avec l'autorisation de leurs propriétaires respectifs."
                ),
                
                buildSectionTitle('Protection des Données Personnelles'),
                buildParagraph(
                  "Notre Association Sport respecte la confidentialité des informations personnelles et "
                  "s'engage à protéger les données de ses utilisateurs."
                ),
                
                buildSectionTitle('Cookies'),
                buildParagraph(
                  "Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser la fréquentation."
                ),
                
                buildSectionTitle('Responsabilité'),
                buildParagraph(
                  "Notre Association Sport s’efforce de fournir des informations exactes et mises à jour sur son site."
                ),
                
                buildSectionTitle('Loi Applicable'),
                buildParagraph(
                  "Ces mentions légales sont soumises à la législation française. Tout litige sera soumis aux tribunaux compétents français."
                ),
                
                buildParagraph('Date de Mise à Jour des Mentions Légales : 12/11/2024'),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(top: 20, bottom: 5),
      child: Text(
        title,
        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        textAlign: TextAlign.center,
      ),
    );
  }

  Widget buildParagraph(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Text(
        text,
        style: const TextStyle(fontSize: 14),
        textAlign: TextAlign.center,
      ),
    );
  }

  Widget buildLink(String text, String url) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: InkWell(
        onTap: () {},
        child: Text(
          text,
          style: const TextStyle(fontSize: 14, color: Colors.blue, decoration: TextDecoration.underline),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
