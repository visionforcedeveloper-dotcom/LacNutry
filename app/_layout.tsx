import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, Component } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { trpc, trpcClient } from '@/lib/trpc';
import { RecipeProvider } from '@/contexts/RecipeContext';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: 1,
      networkMode: 'offlineFirst',
    },
  },
});

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('ErrorBoundary caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Ops! Algo deu errado</Text>
          <Text style={styles.errorMessage}>
            O aplicativo encontrou um erro inesperado.
          </Text>
          <Text style={styles.errorDetails}>
            {this.state.error?.message || 'Erro desconhecido'}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

function RootLayoutNav() {
  const { isOnboardingCompleted, isLoading: onboardingLoading } = useOnboarding();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (onboardingLoading || authLoading) return;

    const inOnboarding = segments[0] === 'onboarding-welcome' || segments[0] === 'onboarding-quiz';
    const inLoading = segments[0] === 'quiz-loading';
    const inPaywall = segments[0] === 'paywall';
    const inAuth = segments[0] === 'auth';
    const inTabs = segments[0] === '(tabs)';

    if (!isOnboardingCompleted && !inOnboarding && !inLoading && !inPaywall && !inAuth) {
      router.replace('/onboarding-welcome');
    } else if (isAuthenticated && !inTabs) {
      router.replace('/(tabs)');
    }
  }, [isOnboardingCompleted, isAuthenticated, onboardingLoading, authLoading, segments, router]);

  return (
    <Stack screenOptions={{ headerBackTitle: 'Voltar' }}>
      <Stack.Screen name="onboarding-welcome" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding-quiz" options={{ headerShown: false }} />
      <Stack.Screen name="quiz-loading" options={{ headerShown: false }} />
      <Stack.Screen name="paywall" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="recipe-detail" options={{ headerShown: false, presentation: 'card' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = React.useState(false);
  
  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };
    
    prepare();
  }, []);
  
  if (!isReady) {
    return null;
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  errorDetails: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
