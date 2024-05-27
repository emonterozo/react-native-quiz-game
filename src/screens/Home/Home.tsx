import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Pressable, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CHARACTERS } from '@app/utils';
import { HomeScreenNavigationProp } from '@app/types';

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [user, setUser] = useState({
    avatar: 0,
    name: '',
  });

  const handleSelectAvatar = (id: number) => {
    setUser({
      ...user,
      avatar: id,
    });
  };

  const onChangeText = (text: string) => {
    setUser({
      ...user,
      name: text,
    });
  };

  const isInitialized = () => user.avatar !== 0 && user.name !== '';

  const handlePressStart = () => navigation.navigate('Question', { user });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {CHARACTERS.map((character) => (
            <Pressable
              key={character.id}
              style={[styles.selected, character.id === user.avatar && { borderColor: '#3AC1BF' }]}
              onPress={() => handleSelectAvatar(character.id)}
            >
              <Image source={character.path} />
            </Pressable>
          ))}
        </View>
        <View style={{ gap: 15 }}>
          <TextInput style={styles.input} placeholder="Enter name" onChangeText={onChangeText} />
          <Pressable
            onPress={handlePressStart}
            disabled={!isInitialized()}
            style={({ pressed }) => [
              styles.button,
              !isInitialized() && { backgroundColor: '#CCCCCC' },
              pressed ? styles.buttonPressed : null,
            ]}
          >
            <Text style={styles.buttonText}>Start the Quiz</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#3AC1BF',
  },
  button: {
    backgroundColor: '#3AC1BF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#1E8380',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },
  image: {
    height: 200,
    width: '50%',
  },
  selected: {
    padding: 2,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'transparent',
  },
});

export default Home;
