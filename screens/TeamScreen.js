import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TeamScreen = () => {
  const teamMembers = [
    {
      name: 'Michelle Carolina Ortega Rubio',
      role: 'Desarrolladora Fullstack',
      id: '3041230311'
    },
    {
      name: 'Joana Lizeth Salinas Ramos',
      role: 'DevOps',
      id: '3041230343'
    },
    {
      name: 'Angel Javier Hernandez Silva',
      role: 'Frontend Developer',
      id: '3041230341'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuestro Equipo</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {teamMembers.map((member, index) => (
          <View key={index} style={styles.memberCard}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
            <Text style={styles.memberId}>ID: {member.id}</Text>
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
  memberCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 3,
  },
  memberId: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default TeamScreen;