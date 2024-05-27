import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Sound from 'react-native-sound';

import { QuestionScreenRouteProp } from '@app/types';
import { CHARACTERS, QUESTIONS } from '@app/utils';
const totalTime = 15;

const Question = () => {
  const route = useRoute<QuestionScreenRouteProp>();
  const { user } = route.params;

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [validation, setValidation] = useState({
    answer: '',
    isCorrect: false,
  });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const avatar = CHARACTERS.find((character) => character.id === user.avatar);

  const restart = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setValidation({
      answer: '',
      isCorrect: false,
    });
    setTimeLeft(totalTime);
  };

  useEffect(() => {
    if (validation.answer !== '') {
      const sound = new Sound(
        validation.isCorrect ? 'correct.mp3' : 'wrong.mp3',
        Sound.MAIN_BUNDLE,
        (error) => {
          if (error) {
            return;
          }
          sound.setVolume(5);
          sound.play((success) => {
            if (success) {
              if (currentQuestionIndex <= 1) {
                restart();
              } else {
                setIsGameOver(true);
              }
            }
          });
        },
      );
    }
  }, [validation.answer, validation.isCorrect]);

  const handlePressAnswer = (choice: string) => {
    const isCorrect = QUESTIONS[currentQuestionIndex].answer === choice;
    if (isCorrect) setScore(score + 1);
    setValidation({
      isCorrect,
      answer: choice,
    });
  };

  useEffect(() => {
    if (timeLeft <= 0 && currentQuestionIndex <= 1) {
      restart();
    } else if (timeLeft === 0 && currentQuestionIndex === 2) {
      setIsGameOver(true);
    }
  }, [timeLeft, currentQuestionIndex]);

  const handlePressTryAgain = () => {
    setIsGameOver(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setValidation({
      answer: '',
      isCorrect: false,
    });
    setTimeLeft(totalTime);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={isGameOver}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                {score >= 2 ? 'Congratulations!' : 'Better Luck Next Time!'}
              </Text>
              <Text style={{ fontSize: 18 }}>Your score: {`${score}/${QUESTIONS.length}`}</Text>
            </View>
            <Pressable
              onPress={handlePressTryAgain}
              style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.content}>
        <View style={styles.user}>
          <Image source={avatar?.path} />
          <Text style={styles.name}>{user.name}</Text>
        </View>
        <View style={[styles.circle, timeLeft <= 5 && { borderColor: '#C41E3A' }]}>
          <Text style={styles.timer}>{timeLeft}</Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{QUESTIONS[currentQuestionIndex].question}</Text>
          {QUESTIONS[currentQuestionIndex].choices.map((choice) => (
            <Pressable
              disabled={validation.answer !== ''}
              key={choice}
              style={[
                styles.choiceButton,
                validation.answer !== '' &&
                  !validation.isCorrect &&
                  choice === QUESTIONS[currentQuestionIndex].answer &&
                  styles.correct,
                validation.answer !== '' &&
                  choice === validation.answer &&
                  validation.isCorrect &&
                  styles.correct,
                validation.answer !== '' &&
                  choice === validation.answer &&
                  !validation.isCorrect &&
                  styles.incorrect,
              ]}
              onPress={() => handlePressAnswer(choice)}
            >
              <Text style={styles.choiceText}>{choice}</Text>
            </Pressable>
          ))}
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
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  name: {
    fontWeight: 'bold',
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
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#3AC1BF',
    alignSelf: 'center',
    marginVertical: 10,
  },
  timer: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    paddingHorizontal: 20,
  },
  choiceButton: {
    borderWidth: 2,
    borderColor: '#3AC1BF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  choiceText: {
    fontSize: 16,
    color: '#17191a',
  },
  correct: {
    backgroundColor: '#34eb77',
    borderColor: '#34eb77',
  },
  incorrect: {
    borderColor: '#C41E3A',
    backgroundColor: '#C41E3A',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 20,
  },
  modalContent: {
    gap: 5,
    alignItems: 'center',
  },
});

export default Question;
