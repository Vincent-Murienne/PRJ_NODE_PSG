import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:io';
import 'dart:convert';
import 'dart:typed_data';
import 'package:image/image.dart' as img;
import '../config/environment.dart';

class AjoutActualite extends StatefulWidget {
  @override
  _AjoutActualiteState createState() => _AjoutActualiteState();
}

class _AjoutActualiteState extends State<AjoutActualite> {
  final _formKey = GlobalKey<FormState>();
  final _titreController = TextEditingController();
  final _resumeController = TextEditingController();
  final _texteLongController = TextEditingController();

  XFile? image;
  
  Uint8List? _imageBytes;
  final ImagePicker _picker = ImagePicker();
  bool _isLoading = false;
  String? _authToken;

  @override
  void initState() {
    super.initState();
    _loadAuthToken();
  }

  Future<void> _loadAuthToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _authToken = prefs.getString('token');
    });
  }

  // Méthode de compression d'image
  Uint8List compressImage(Uint8List bytes, {int maxWidth = 800, int quality = 50}) {
    img.Image? image = img.decodeImage(bytes);
    
    if (image == null) return bytes;

    if (image.width > maxWidth) {
      double aspectRatio = image.width / image.height;
      int newHeight = (maxWidth / aspectRatio).round();
      
      image = img.copyResize(
        image, 
        width: maxWidth, 
        height: newHeight,
        interpolation: img.Interpolation.average
      );
    }

    return Uint8List.fromList(
      img.encodeJpg(image, quality: quality)
    );
  }

  // Méthode pour prendre une photo avec la caméra
  Future<void> _takePhoto() async {
    try {
        image = await _picker.pickImage(
        source: ImageSource.camera,
        preferredCameraDevice: CameraDevice.rear,
        imageQuality: 50,
      );
      
      if (image != null) {
        final bytes = await image?.readAsBytes();
        setState(() {
          _imageBytes = bytes;
        });
      }
    } catch (e) {
      _showErrorSnackBar('Erreur lors de la prise de photo');
    }
  }

  // Méthode pour sélectionner une image de la galerie
  Future<void> _pickImage() async {
    try {
        image = await _picker.pickImage(
        source: ImageSource.gallery,
        imageQuality: 50,
      );
      
      if (image != null) {
        final bytes = await image?.readAsBytes();
        setState(() {
          _imageBytes = bytes;
        });
      }
    } catch (e) {
      _showErrorSnackBar('Erreur lors de la sélection de l\'image');
    }
  }

  // Méthode pour afficher une snackbar d'erreur
  void _showErrorSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
        duration: Duration(seconds: 3),
      ),
    );
  }

  // Méthode de soumission du formulaire
  Future<void> _submitForm() async {
    if (_authToken == null) {
      _showErrorSnackBar('Vous devez être connecté pour ajouter une actualité');
      return;
    }

    if (_formKey.currentState!.validate() && image != null) {
      setState(() {
        _isLoading = true;
      });

      try {
        var request = http.MultipartRequest(
          'POST',
          Uri.parse('${Environment.apiUrl}/actualites'),
        );

        // Ajouter les champs texte
        request.fields['titre'] = _titreController.text;
        request.fields['resume'] = _resumeController.text;
        request.fields['texte_long'] = _texteLongController.text;

        // Ajouter l'image en fichier
        request.files.add(
          await http.MultipartFile.fromPath(
            'image', 
            image!.path,
          ),
        );

        // Ajouter le token d'authentification
        request.headers['Authorization'] = 'Bearer $_authToken';

        // Envoyer la requête
        var streamedResponse = await request.send();
        var response = await http.Response.fromStream(streamedResponse);

        if (response.statusCode == 201) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Actualité ajoutée avec succès')),
          );
        } else {
          _showErrorSnackBar('Erreur: ${response.body}');
        }
      } catch (e) {
        print('Erreur détaillée: $e');
        _showErrorSnackBar('Erreur: $e');
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    } else {
      _showErrorSnackBar("L'image est obligatoire !");
    }
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Ajouter une actualité")),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _titreController,
                decoration: InputDecoration(labelText: 'Titre'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer un titre';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _resumeController,
                decoration: InputDecoration(labelText: 'Résumé'),
                maxLines: 3,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer un résumé';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _texteLongController,
                decoration: InputDecoration(labelText: 'Texte complet'),
                maxLines: 5,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer le texte complet';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton.icon(
                    onPressed: _takePhoto,
                    icon: Icon(Icons.camera_alt),
                    label: Text('Prendre une photo'),
                  ),
                  ElevatedButton.icon(
                    onPressed: _pickImage,
                    icon: Icon(Icons.photo_library),
                    label: Text('Galerie'),
                  ),
                ],
              ),
              SizedBox(height: 16),
              if (_imageBytes != null) ...[
                Image.memory(
                  _imageBytes!,
                  height: 200,
                  fit: BoxFit.cover,
                ),
                SizedBox(height: 16),
              ],
              ElevatedButton(
                onPressed: _isLoading ? null : _submitForm,
                child: _isLoading
                    ? CircularProgressIndicator()
                    : Text('Ajouter l\'actualité'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _titreController.dispose();
    _resumeController.dispose();
    _texteLongController.dispose();
    super.dispose();
  }
}