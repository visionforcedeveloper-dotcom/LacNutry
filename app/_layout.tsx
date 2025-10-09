import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { trpc, trpcClient } from '@/lib/trpc';
import { RecipeProvider } from '@/contexts/RecipeContext';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { isOnboardingCompleted, isLoading } = useOnboarding();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inOnboarding = segments[0] === 'onboarding-welcome' || segments[0] === 'onboarding-quiz';

    if (!isOnboardingCompleted && !inOnboarding) {
      router.replace('/onboarding-welcome');
    } else if (isOnboardingCompleted && inOnboarding) {
      router.replace('/(tabs)');
    }
  }, [isOnboardingCompleted, isLoading, segments, router]);

  return (
    <Stack screenOptions={{ headerBackTitle: 'Voltar' }}>
      <Stack.Screen name="onboarding-welcome" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding-quiz" options={{ headerShown: false }} />
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
        <OnboardingProvider>
          <RecipeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar style="light" />
              <RootLayoutNav />
            </GestureHandlerRootView>
          </RecipeProvider>
        </OnboardingProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
