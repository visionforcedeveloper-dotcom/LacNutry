import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';
import { quizQuestions } from '@/constants/quiz';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function OnboardingQuiz() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useOnboarding();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [textInput, setTextInput] = useState('');
  const [progressAnim] = useState(new Animated.Value(0));

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (question.type === 'text' && textInput.trim()) {
      setAnswers({ ...answers, [question.id]: textInput.trim() });
      setTextInput('');
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      Animated.timing(progressAnim, {
        toValue: currentQuestion + 2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      Animated.timing(progressAnim, {
        toValue: currentQuestion,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleComplete = async () => {
    const finalAnswers = question.type === 'text' && textInput.trim()
      ? { ...answers, [question.id]: textInput.trim() }
      : answers;
    
    await completeOnboarding(finalAnswers);
    
    setTimeout(() => {
      router.replace('/quiz-loading');
    }, 100);
  };

  const handleSingleChoice = (option: string) => {
    setAnswers({ ...answers, [question.id]: option });
  };

  const handleMultipleChoice = (option: string) => {
    const currentAnswers = (answers[question.id] as string[]) || [];
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    setAnswers({ ...answers, [question.id]: newAnswers });
  };

  const isAnswered = () => {
    if (question.type === 'info') {
      return true;
    }
    if (question.type === 'text') {
      return textInput.trim().length > 0 || !!answers[question.id];
    }
    if (question.type === 'multiple') {
      return ((answers[question.id] as string[]) || []).length > 0;
    }
    return !!answers[question.id];
  };

  const currentAnswer = answers[question.id];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} de {totalQuestions}
          </Text>
        </View>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.question}>{question.question}</Text>

          {question.subtitle && (
            <Text style={styles.subtitle}>{question.subtitle}</Text>
          )}

          {question.id === 1 && (
            <Image
              source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/gdfqd5waxk1w8pcaslh0v' }}
              style={styles.infoImage}
              resizeMode="contain"
            />
          )}

          {question.type === 'text' && (
            <TextInput
              style={styles.textInput}
              value={textInput || (currentAnswer as string) || ''}
              onChangeText={setTextInput}
              placeholder={question.placeholder}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              autoFocus
            />
          )}

          {question.type === 'single' && question.options && (
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => {
                const isSelected = currentAnswer === option;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.option,
                      isSelected && styles.optionSelected,
                    ]}
                    onPress={() => handleSingleChoice(option)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {question.type === 'multiple' && question.options && (
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => {
                const isSelected = ((currentAnswer as string[]) || []).includes(option);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.option,
                      isSelected && styles.optionSelected,
                    ]}
                    onPress={() => handleMultipleChoice(option)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            style={[styles.navButton, currentQuestion === 0 && styles.navButtonDisabled]}
            onPress={handleBack}
            disabled={currentQuestion === 0}
            activeOpacity={0.7}
          >
            <ChevronLeft size={32} color={currentQuestion === 0 ? 'rgba(255, 255, 255, 0.3)' : '#FFFFFF'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, !isAnswered() && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={!isAnswered()}
            activeOpacity={0.8}
          >
            <ChevronRight size={32} color={isAnswered() ? colors.primary : 'rgba(0, 0, 0, 0.3)'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '600' as const,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  question: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    marginBottom: 32,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500' as const,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: -16,
    marginBottom: 32,
    lineHeight: 26,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600' as const,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  optionSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  optionText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600' as const,
  },
  optionTextSelected: {
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  navButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  nextButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  infoImage: {
    width: '100%',
    height: 300,
    marginTop: 24,
    borderRadius: 16,
  },
});
