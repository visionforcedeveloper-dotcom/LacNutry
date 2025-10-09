import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import {
  User,
  Heart,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Star,
  Award,
  LogOut,
  CreditCard,
  Settings,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useRecipes } from '@/contexts/RecipeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { getUserName, resetOnboarding } = useOnboarding();
  const { favorites, recipes } = useRecipes();
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/auth');
          },
        },
      ]
    );
  };

  const handleResetQuiz = () => {
    Alert.alert(
      'Refazer Quiz',
      'Isso irá resetar suas preferências. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          onPress: () => {
            resetOnboarding();
            router.replace('/onboarding-welcome');
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Em breve', 'Funcionalidade de edição de perfil em desenvolvimento');
  };

  const handleSubscription = () => {
    Alert.alert('Assinatura Ativa', 'Você tem acesso premium até 2026');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacidade', 'Seus dados estão protegidos e criptografados');
  };

  const handleHelp = () => {
    Alert.alert('Ajuda', 'Entre em contato: suporte@lacnutry.com');
  };
  
  const menuItems = [
    {
      icon: Heart,
      title: 'Receitas Favoritas',
      subtitle: `${favorites.length} receitas salvas`,
      color: '#FC8181',
      onPress: () => {
        if (favorites.length > 0) {
          Alert.alert('Favoritos', `Você tem ${favorites.length} receitas favoritas`);
        } else {
          Alert.alert('Favoritos', 'Você ainda não tem receitas favoritas');
        }
      },
    },
    {
      icon: CreditCard,
      title: 'Assinatura',
      subtitle: 'Plano Premium Ativo',
      color: '#48BB78',
      onPress: handleSubscription,
    },
    {
      icon: Shield,
      title: 'Privacidade',
      subtitle: 'Configurações de dados',
      color: '#9F7AEA',
      onPress: handlePrivacy,
    },
    {
      icon: HelpCircle,
      title: 'Ajuda & Suporte',
      subtitle: 'Central de ajuda',
      color: '#4299E1',
      onPress: handleHelp,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.avatarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <User size={48} color={Colors.surface} strokeWidth={2} />
          </LinearGradient>

          <Text style={styles.userName}>{getUserName()}</Text>
          <Text style={styles.userEmail}>{user?.email || 'Membro desde 2025'}</Text>

          <TouchableOpacity 
            style={styles.editButton} 
            activeOpacity={0.7}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={styles.statItem}
            activeOpacity={0.7}
            onPress={() => {
              if (favorites.length > 0) {
                Alert.alert('Favoritos', `Você tem ${favorites.length} receitas favoritas`);
              } else {
                Alert.alert('Favoritos', 'Você ainda não tem receitas favoritas');
              }
            }}
          >
            <View style={[styles.statIconContainer, { backgroundColor: '#FC8181' + '20' }]}>
              <Heart size={24} color="#FC8181" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favoritas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statItem}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Receitas', `${recipes.length} receitas disponíveis`)}
          >
            <View style={[styles.statIconContainer, { backgroundColor: '#F6AD55' + '20' }]}>
              <Star size={24} color="#F6AD55" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>{recipes.length}</Text>
            <Text style={styles.statLabel}>Receitas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statItem}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Conquistas', 'Continue usando o app para desbloquear conquistas!')}
          >
            <View style={[styles.statIconContainer, { backgroundColor: '#9F7AEA' + '20' }]}>
              <Award size={24} color="#9F7AEA" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Conquistas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <View style={styles.menuContainer}>
            <View style={styles.menuItem}>
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: '#F6AD55' + '20' },
                ]}
              >
                <Bell size={24} color="#F6AD55" strokeWidth={2} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Notificações</Text>
                <Text style={styles.menuSubtitle}>
                  {notificationsEnabled ? 'Ativadas' : 'Desativadas'}
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: Colors.border, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={item.onPress}
                >
                  <View
                    style={[
                      styles.menuIcon,
                      { backgroundColor: item.color + '20' },
                    ]}
                  >
                    <IconComponent size={24} color={item.color} strokeWidth={2} />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <ChevronRight size={20} color={Colors.text.light} strokeWidth={2} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.resetButton} 
          activeOpacity={0.7}
          onPress={handleResetQuiz}
        >
          <Settings size={18} color={Colors.primary} strokeWidth={2} />
          <Text style={styles.resetText}>Refazer Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton} 
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <LogOut size={18} color={Colors.error} strokeWidth={2} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Versão 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center' as const,
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    color: Colors.text.tertiary,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  statsContainer: {
    flexDirection: 'row' as const,
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  menuContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  resetButton: {
    marginHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    marginBottom: 12,
  },
  resetText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  logoutButton: {
    marginHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.error,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.error,
  },
  version: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center' as const,
    marginBottom: 8,
  },
});
