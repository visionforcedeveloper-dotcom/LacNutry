import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { trpc, trpcClient } from '@/lib/trpc';
import { RecipeProvider } from '@/contexts/RecipeContext';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { isOnboardingCompleted, isLoading: onboardingLoading } = useOnboarding();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (onboardingLoading || authLoading) return;

    const inOnboarding = segments[0] === 'onboarding-welcome' || segments[0] === 'onboarding-quiz';
    const inAuth = segments[0] === 'auth';
    const inTabs = segments[0] === '(tabs)';

    if (!isOnboardingCompleted && !inOnboarding) {
      router.replace('/onboarding-welcome');
    } else if (isOnboardingCompleted && !isAuthenticated && !inAuth) {
      router.replace('/auth');
    } else if (isAuthenticated && !inTabs) {
      router.replace('/(tabs)');
    }
  }, [isOnboardingCompleted, isAuthenticated, onboardingLoading, authLoading]);

  return (
    <Stack screenOptions={{ headerBackTitle: 'Voltar' }}>
      <Stack.Screen name="onboarding-welcome" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding-quiz" options={{ headerShown: false }} />
      <Stack.Screen name="quiz-loading" options={{ headerShown: false }} />
      <Stack.Screen name="paywall" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <OnboardingProvider>
            <RecipeProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="light" />
                <RootLayoutNav />
              </GestureHandlerRootView>
            </RecipeProvider>
          </OnboardingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
