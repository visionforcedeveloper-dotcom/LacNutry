import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, ActivityIndicator, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, X, Sparkles, ChefHat, Camera, MessageCircle, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import colors from '@/constants/colors';
type PlanType = 'monthly' | 'annual';

export default function Paywall() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('annual');
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url;
      console.log('Deep link recebido:', url);

      if (url.includes('payment-success')) {
        setShowPayment(false);
        Alert.alert(
          'Pagamento Aprovado! 🎉',
          'Sua assinatura foi ativada com sucesso. Bem-vindo ao premium!',
          [
            {
              text: 'Continuar',
              onPress: () => router.replace('/auth'),
            },
          ]
        );
      } else if (url.includes('payment-cancel')) {
        setShowPayment(false);
        Alert.alert(
          'Pagamento Cancelado',
          'O pagamento foi cancelado. Você pode tentar novamente quando quiser.',
          [{ text: 'OK' }]
        );
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [router]);

  const plans = {
    monthly: {
      price: 27,
      period: 'mês',
      savings: null,
      pricePerMonth: 27,
      stripeUrl: 'https://buy.stripe.com/dRm14p1v85Vu6wQ2Iw97G0a',
    },
    annual: {
      price: 97,
      period: 'ano',
      savings: 'Economize R$ 227',
      pricePerMonth: 8.08,
      stripeUrl: 'https://buy.stripe.com/cNi4gBa1Ees07AUfvi97G0b',
    },
  };

  const features = [
    {
      icon: ChefHat,
      title: 'Receitas Personalizadas',
      description: 'Acesso ilimitado a receitas adaptadas para sua intolerância',
    },
    {
      icon: Camera,
      title: 'Scanner de Produtos',
      description: 'Escaneie produtos e descubra se são seguros para você',
    },
    {
      icon: MessageCircle,
      title: 'Nutricionista IA',
      description: 'Tire dúvidas e receba orientações personalizadas',
    },
    {
      icon: Sparkles,
      title: 'Gerador de Receitas',
      description: 'Crie receitas únicas com ingredientes que você tem',
    },
  ];

  const handleSubscribe = () => {
    setShowPayment(true);
    setIsLoading(true);
  };

  const handleWebViewNavigationStateChange = (navState: any) => {
    const { url } = navState;
    console.log('WebView URL:', url);

    if (url.includes('checkout.stripe.com')) {
      setIsLoading(false);
    }

    if (url.includes('/success') || url.includes('payment-success') || url.includes('checkout/success')) {
      console.log('Payment successful!');
      setShowPayment(false);
      Alert.alert(
        'Pagamento Aprovado! 🎉',
        'Sua assinatura foi ativada com sucesso. Bem-vindo ao premium!',
        [
          {
            text: 'Continuar',
            onPress: () => router.replace('/auth'),
          },
        ]
      );
    }

    if (url.includes('/cancel') || url.includes('payment-cancel')) {
      console.log('Payment cancelled');
      setShowPayment(false);
    }
  };

  const handleClosePayment = () => {
    Alert.alert(
      'Cancelar Pagamento?',
      'Você deseja cancelar o processo de pagamento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => setShowPayment(false),
        },
      ]
    );
  };

  const handleSkip = () => {
    Alert.alert(
      'Continuar sem Premium?',
      'Você terá acesso limitado aos recursos do app.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          onPress: () => {
            router.replace('/auth');
          },
        },
      ]
    );
  };

  return (
    <>
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.gradient}
      >
        <TouchableOpacity style={styles.closeButton} onPress={handleSkip} activeOpacity={0.7}>
          <X size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 120 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.badge}>
              <Sparkles size={16} color={colors.primary} />
              <Text style={styles.badgeText}>OFERTA ESPECIAL</Text>
            </View>
            <Text style={styles.title}>Desbloqueie todo{'\n'}o potencial do app</Text>
            <Text style={styles.subtitle}>
              Comece com 3 dias grátis e cancele quando quiser
            </Text>
          </View>

          <View style={styles.plansContainer}>
            <TouchableOpacity
              style={[
                styles.planCard,
                selectedPlan === 'annual' && styles.planCardSelected,
              ]}
              onPress={() => setSelectedPlan('annual')}
              activeOpacity={0.8}
            >
              {plans.annual.savings && (
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsText}>{plans.annual.savings}</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>Anual</Text>
                  <Text style={styles.planPrice}>
                    R$ {plans.annual.price}
                    <Text style={styles.planPeriod}>/{plans.annual.period}</Text>
                  </Text>
                  <Text style={styles.planPerMonth}>
                    Apenas R$ {plans.annual.pricePerMonth.toFixed(2)}/mês
                  </Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedPlan === 'annual' && styles.radioButtonSelected,
                  ]}
                >
                  {selectedPlan === 'annual' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.planCard,
                selectedPlan === 'monthly' && styles.planCardSelected,
              ]}
              onPress={() => setSelectedPlan('monthly')}
              activeOpacity={0.8}
            >
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>Mensal</Text>
                  <Text style={styles.planPrice}>
                    R$ {plans.monthly.price}
                    <Text style={styles.planPeriod}>/{plans.monthly.period}</Text>
                  </Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedPlan === 'monthly' && styles.radioButtonSelected,
                  ]}
                >
                  {selectedPlan === 'monthly' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>O que você vai ter:</Text>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <View key={index} style={styles.featureRow}>
                  <View style={styles.featureIcon}>
                    <Icon size={24} color={colors.primary} strokeWidth={2.5} />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                  <Check size={24} color="#FFFFFF" strokeWidth={3} />
                </View>
              );
            })}
          </View>

          <Text style={styles.disclaimer}>
            Após o período de teste de 3 dias, você será cobrado automaticamente.
            Cancele a qualquer momento sem custos adicionais.
          </Text>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={handleSubscribe}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F0F0F0']}
              style={styles.subscribeButtonGradient}
            >
              <Text style={styles.subscribeButtonText}>
                Começar 3 dias grátis
              </Text>
              <Text style={styles.subscribeButtonSubtext}>
                Depois R$ {plans[selectedPlan].price}/{plans[selectedPlan].period}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>

    <Modal
      visible={showPayment}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClosePayment}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalHeader, { paddingTop: insets.top + 16 }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleClosePayment}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Finalizar Pagamento</Text>
          <View style={{ width: 40 }} />
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Carregando pagamento...</Text>
          </View>
        )}

        <WebView
          source={{ uri: plans[selectedPlan].stripeUrl }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          style={styles.webview}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          sharedCookiesEnabled={true}
        />
      </View>
    </Modal>
    </>
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
  closeButton: {
    position: 'absolute',
    top: 56,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800' as const,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 36,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500' as const,
  },
  plansContainer: {
    gap: 12,
    marginBottom: 32,
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
  },
  planCardSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: '#FFFFFF',
  },
  savingsBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  savingsText: {
    fontSize: 12,
    fontWeight: '800' as const,
    color: colors.primary,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: '#FFFFFF',
  },
  planPeriod: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  planPerMonth: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600' as const,
    marginTop: 4,
  },
  radioButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FFFFFF',
  },
  radioButtonInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  featuresContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500' as const,
  },
  disclaimer: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500' as const,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: 'transparent',
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  subscribeButtonGradient: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: colors.primary,
    marginBottom: 2,
  },
  subscribeButtonSubtext: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: colors.primaryDark,
    opacity: 0.7,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
    fontWeight: '600' as const,
  },
});
