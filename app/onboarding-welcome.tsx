import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';

export default function OnboardingWelcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.gradient}
      >
        <View style={[styles.content, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 48 }]}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Heart size={64} color="#FFFFFF" fill="#FFFFFF" />
            </View>
            <View style={styles.sparkleIcon}>
              <Sparkles size={32} color="#FFD700" fill="#FFD700" />
            </View>
          </View>

          <Text style={styles.title}>Bem-vindo ao{'\n'}LacNutry</Text>
          
          <Text style={styles.subtitle}>
            Sua jornada para uma vida sem{'\n'}desconfortos começa aqui
          </Text>

          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.bullet} />
              <Text style={styles.featureText}>Receitas personalizadas sem lactose</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.bullet} />
              <Text style={styles.featureText}>Planejamento de refeições inteligente</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.bullet} />
              <Text style={styles.featureText}>Acompanhamento nutricional completo</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/onboarding-quiz')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>

          <Text style={styles.timeText}>
            Leva apenas 2 minutos para personalizar{'\n'}sua experiência
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    position: 'relative' as const,
    marginBottom: 24,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleIcon: {
    position: 'absolute' as const,
    top: -8,
    right: -8,
  },
  title: {
    fontSize: 42,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 26,
  },
  featuresList: {
    width: '100%',
    gap: 20,
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  featureText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600' as const,
    flex: 1,
  },
  button: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.primary,
  },
  timeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 20,
  },
});
