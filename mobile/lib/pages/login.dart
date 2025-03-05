import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/environment.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String _message = '';
  String? _emailError;
  String? _passwordError;

  Future<void> _onSubmit() async {
    setState(() {
      _message = '';
      _emailError = null;
      _passwordError = null;
    });

    // Validation locale
    if (_emailController.text.isEmpty) {
      setState(() {
        _emailError = 'Email requis';
      });
      return;
    }

    if (_passwordController.text.isEmpty) {
      setState(() {
        _passwordError = 'Mot de passe requis';
      });
      return;
    }

    if (_passwordController.text.length < 6) {
      setState(() {
        _passwordError = '6 caractères minimum';
      });
      return;
    }

    try {
      final apiURL = Environment.apiUrl;
      if (apiURL.isEmpty) {
        setState(() {
          _message = 'L\'URL de l\'API est vide.';
        });
        return;
      }

      final response = await http.post(
        Uri.parse('$apiURL/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'email': _emailController.text,
          'password': _passwordController.text,
        }),
      );
            
      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        String token = responseData['token'];

        SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', token);

        setState(() {
          _message = 'Connexion réussie.';
        });

        context.go('/'); // Retour à l'accueil après connexion
      }

      else {
        final responseData = json.decode(response.body);
        setState(() {
          _message = responseData['message'] ?? 'Erreur lors de la connexion.';
        });
      }
    } catch (error) {
      print('Erreur: $error');
      setState(() {
        _message = 'Erreur lors de la connexion.';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Connexion")),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 20, vertical: 40),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Connexion',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),
              SizedBox(height: 20),
              TextField(
                controller: _emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  errorText: _emailError, // Affichage de l'erreur
                ),
              ),
              SizedBox(height: 10),
              TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Mot de passe',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  errorText: _passwordError, // Affichage de l'erreur
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _onSubmit,
                child: Text('Se connecter'),
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 15),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              SizedBox(height: 10),
              if (_message.isNotEmpty)
                Text(
                  _message,
                  style: TextStyle(color: Colors.red, fontSize: 16),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
