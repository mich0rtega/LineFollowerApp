import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Texto de bienvenida (gris con letras negras) */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bienvenido a Carrito Seguidor</Text>
      </View>

      {/* Logo grande debajo del texto */}
      <Image 
        source={require('../assets/images/logo.png')} 
        style={styles.logo}
      />

      {/* Sección de accesos rápidos */}
      <View style={styles.mainContainer}>
        <Text style={styles.quickAccessText}>Accesos rápidos</Text>
        
        {/* Botones centrados */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Mapping')}
          >
            <Text style={styles.buttonText}>Trayectoria</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Sensors')}
          >
            <Text style={styles.buttonText}>Sensores</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Components')}
          >
            <Text style={styles.buttonText}>Componentes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Team')}
          >
            <Text style={styles.buttonText}>Equipo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  welcomeContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    textAlign: 'center',
  },
  logo: {
    width: 250,  // Tamaño aumentado
    height: 250, // Tamaño aumentado
    marginBottom: 30,
    resizeMode: 'contain'
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  quickAccessText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 25,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 10,
    marginBottom: 18,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default HomeScreen;