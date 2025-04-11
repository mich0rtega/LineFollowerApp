import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import RealTimeChart from '../components/RealTimeChart';
import { database } from '../firebaseConfig';
import { ref, onValue, off, remove } from 'firebase/database';

const MAX_POINTS = 200;

const MappingScreen = () => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [trajectory, setTrajectory] = useState([]);
  const [currentData, setCurrentData] = useState({
    position: { x: 0, y: 0, angle: 90 },
    sensors: { left: false, right: false, distance: 0 },
    environment: { temperature: 0, humidity: 0 },
    timestamp: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reiniciarSistema = async () => {
    Alert.alert(
      "Reiniciar Sistema",
      "¿Estás seguro que deseas borrar todos los datos y reiniciar el recorrido?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Reiniciar", 
          onPress: async () => {
            try {
              setLoading(true);
              await remove(ref(database, '/'));
              
              setTrajectory([]);
              setCurrentData({
                position: { x: 0, y: 0, angle: 90 },
                sensors: { left: false, right: false, distance: 0 },
                environment: { temperature: 0, humidity: 0 },
                timestamp: Date.now()
              });
              
              setLoading(false);
              Alert.alert("✅ Sistema reiniciado", "Todos los datos han sido borrados");
            } catch (error) {
              setLoading(false);
              Alert.alert("❌ Error", "No se pudo reiniciar el sistema: " + error.message);
            }
          } 
        }
      ]
    );
  };

  useEffect(() => {
    const dbRef = ref(database, 'lastData');
    
    const handleData = (snapshot) => {
      try {
        const data = snapshot.val();
        
        if (!data) {
          setError("No se encontraron datos en Firebase");
          setLoading(false);
          return;
        }

        const validatedData = {
          position: {
            x: data.position?.x || 0,
            y: data.position?.y || 0,
            angle: data.position?.angle || 0
          },
          sensors: {
            left: data.sensors?.left || false,
            right: data.sensors?.right || false,
            distance: data.sensors?.distance || 0
          },
          environment: {
            temperature: data.environment?.temperature || 0,
            humidity: data.environment?.humidity || 0
          },
          timestamp: data.timestamp || Date.now()
        };

        setCurrentData(validatedData);
        
        setTrajectory(prev => {
          const newTrajectory = [...prev, validatedData.position];
          return newTrajectory.length > MAX_POINTS 
            ? newTrajectory.slice(-MAX_POINTS)
            : newTrajectory;
        });

        setLoading(false);
        setError(null);
      } catch (err) {
        console.error("Error procesando datos:", err);
        setError("Error al procesar los datos");
        setLoading(false);
      }
    };

    const errorCallback = (error) => {
      console.error("Error de Firebase:", error);
      setError("Error de conexión con Firebase");
      setLoading(false);
    };

    onValue(dbRef, handleData, errorCallback);

    return () => {
      off(dbRef);
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={styles.loadingText}>Cargando datos del recorrido...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <Text style={styles.errorSubText}>
          Última actualización: {new Date(currentData.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Mapa del Recorrido</Text>
        
        {/* Video en la parte superior */}
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            style={styles.video}
            source={require('../assets/videos/carrito_seguidor.mp4')}
            resizeMode="contain"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            onPlaybackStatusUpdate={setStatus}
          />
        </View>

        {/* Información del recorrido */}
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Datos Actuales</Text>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Posición X:</Text>
            <Text style={styles.dataValue}>{currentData.position.x.toFixed(1)} cm</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Posición Y:</Text>
            <Text style={styles.dataValue}>{currentData.position.y.toFixed(1)} cm</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Ángulo:</Text>
            <Text style={styles.dataValue}>{currentData.position.angle.toFixed(1)}°</Text>
          </View>
          

          
          
          
          <Text style={styles.sectionTitle}>Última Actualización</Text>
          <Text style={styles.timestamp}>
            {new Date(currentData.timestamp).toLocaleString()}
          </Text>
        </View>

        {/* Gráfica de trayectoria */}
        <RealTimeChart 
          trajectoryData={trajectory} 
          currentPosition={currentData.position} 
        />

        {/* Botón de reinicio en la parte inferior */}
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={reiniciarSistema}
        >
          <Text style={styles.resetButtonText}>REINICIAR SISTEMA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  videoContainer: {
    height: 200,
    marginBottom: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FF00',
    marginTop: 10,
    marginBottom: 5,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  dataLabel: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  active: {
    color: '#4CAF50',
  },
  inactive: {
    color: '#F44336',
  },
  timestamp: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 5,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    color: '#FF5555',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  errorSubText: {
    color: '#FF9999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MappingScreen;