import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const ComponentsScreen = () => {
  const components = [
    {
      name: "ESP32",
      description: "Microcontrolador principal con WiFi y Bluetooth integrado",
      image: require('../assets/images/esp32.png')
    },
    {
      name: "Sensores IR",
      description: "Detección de línea infrarroja (TCRT5000)",
      image: require('../assets/images/ir_sensor.png')
    },
    {
      name: "Motores DC",
      description: "Motores de 5V con caja reductora para movimiento",
      image: require('../assets/images/dc_motor.png')
    },
    {
      name: "Fuente Protoboard",
      description: "Fuente de alimentación MB102 para protoboard",
      image: require('../assets/images/protoboard_power.png')
    },
    {
      name: "Puente H L298N",
      description: "Controlador de motores para dirección y velocidad",
      image: require('../assets/images/l298n.png')
    },
    {
      name: "Sensor DHT11",
      description: "Sensor de temperatura y humedad ambiental",
      image: require('../assets/images/dht11.png')
    },
    {
      name: "Sensor BMP180",
      description: "Sensor de presión atmosférica y altitud",
      image: require('../assets/images/bmp180.png')
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Componentes Utilizados</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {components.map((item, index) => (
          <View key={index} style={styles.item}>
            <Image 
              source={item.image} 
              style={styles.itemImage}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    elevation: 2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  item: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemDesc: {
    fontSize: 14,
    color: '#666',
  },
});

export default ComponentsScreen;