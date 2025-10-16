import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

export interface QuizAnswers {
  [questionId: number]: string | string[];
}

const ONBOARDING_KEY = '@lacnutry_onboarding_completed';
const QUIZ_ANSWERS_KEY = '@lacnutry_quiz_answers';

export const [OnboardingProvider, useOnboarding] = createContextHook(() => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    
    const loadOnboardingStatus = async () => {
      try {
        const [completed, answers] = await Promise.all([
          AsyncStorage.getItem(ONBOARDING_KEY),
          AsyncStorage.getItem(QUIZ_ANSWERS_KEY),
        ]);
        
        if (mounted) {
          setIsOnboardingCompleted(completed === 'true');
          if (answers) {
            setQuizAnswers(JSON.parse(answers));
          }
        }
      } catch (error) {
        console.error('Error loading onboarding status:', error);
        if (mounted) {
          setIsOnboardingCompleted(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadOnboardingStatus();
    
    return () => {
      mounted = false;
    };
  }, []);

  const completeOnboarding = useCallback(async (answers: QuizAnswers) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(ONBOARDING_KEY, 'true'),
        AsyncStorage.setItem(QUIZ_ANSWERS_KEY, JSON.stringify(answers)),
      ]);
      setIsOnboardingCompleted(true);
      setQuizAnswers(answers);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  }, []);

  const resetOnboarding = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(ONBOARDING_KEY),
        AsyncStorage.removeItem(QUIZ_ANSWERS_KEY),
      ]);
      setIsOnboardingCompleted(false);
      setQuizAnswers({});
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  }, []);

  const getUserName = useCallback((): string => {
    return (quizAnswers[1] as string) || 'Usuário';
  }, [quizAnswers]);

  return useMemo(() => ({
    isOnboardingCompleted,
    isLoading,
    quizAnswers,
    completeOnboarding,
    resetOnboarding,
    getUserName,
  }), [isOnboardingCompleted, isLoading, quizAnswers, completeOnboarding, resetOnboarding, getUserName]);
});
