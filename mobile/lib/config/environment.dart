import 'package:flutter_dotenv/flutter_dotenv.dart';

class Environment {
  static String get apiUrl {
    return dotenv.env['API_URL'] ?? 'http://localhost:8080/api'; // Valeur par défaut
  }
}
