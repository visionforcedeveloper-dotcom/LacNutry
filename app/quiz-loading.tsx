import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';

const loadingSteps = [
  'Analisando seus dados',
  'Calculando sua pontuação de saúde',
  'Calculando os macros',
  'Revisando tudo',
];

export default function QuizLoading() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    const stepDuration = 1500;
    const totalSteps = loadingSteps.length;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    Animated.timing(progress, {
      toValue: 100,
      duration: stepDuration * totalSteps,
      useNativeDriver: false,
    }).start();

    const timeout = setTimeout(() => {
      router.replace('/paywall' as any);
    }, stepDuration * totalSteps + 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.progressSection}>
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
            </View>
            <Text style={styles.progressText}>
              {Math.round((currentStep + 1) / loadingSteps.length * 100)}%
            </Text>
          </View>

          <Text style={styles.title}>Ajustando sua{'\n'}experiência</Text>

          <View style={styles.stepsContainer}>
            {loadingSteps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              const isPending = index > currentStep;

              return (
                <View key={index} style={styles.stepRow}>
                  <View
                    style={[
                      styles.stepCircle,
                      isCompleted && styles.stepCircleCompleted,
                      isCurrent && styles.stepCircleCurrent,
                      isPending && styles.stepCirclePending,
                    ]}
                  >
                    {isCompleted && <Check size={20} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                  <Text
                    style={[
                      styles.stepText,
                      isCompleted && styles.stepTextCompleted,
                      isCurrent && styles.stepTextCurrent,
                      isPending && styles.stepTextPending,
                    ]}
                  >
                    {step}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
          <View style={styles.loadingIndicator} />
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  progressSection: {
    marginBottom: 48,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 48,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 64,
    lineHeight: 44,
  },
  stepsContainer: {
    gap: 24,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleCompleted: {
    backgroundColor: '#FFFFFF',
  },
  stepCircleCurrent: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  stepCirclePending: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  stepText: {
    fontSize: 20,
    fontWeight: '700' as const,
    flex: 1,
  },
  stepTextCompleted: {
    color: 'rgba(255, 255, 255, 0.6)',
    textDecorationLine: 'line-through',
  },
  stepTextCurrent: {
    color: '#FFFFFF',
  },
  stepTextPending: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 24,
  },
  loadingIndicator: {
    width: 120,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
});
