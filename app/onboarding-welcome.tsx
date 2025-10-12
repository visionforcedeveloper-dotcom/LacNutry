import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';

export default function OnboardingWelcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/eh54tlckxqf2lwdpbd90x' }}
        style={styles.backgroundImage}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
        style={styles.overlay}
      >
        <View style={[styles.content, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 48 }]}>
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
    backgroundColor: colors.primary,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  featuresList: {
    width: '100%',
    gap: 14,
    marginBottom: 32,
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
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600' as const,
    flex: 1,
  },
  button: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: colors.primary,
  },
  timeText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 18,
  },
});
