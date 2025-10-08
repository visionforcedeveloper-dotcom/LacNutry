import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

export default function ProfileScreen() {
  const menuItems = [
    {
      icon: Heart,
      title: 'Receitas Favoritas',
      subtitle: '12 receitas salvas',
      color: '#FC8181',
    },
    {
      icon: Bell,
      title: 'Notificações',
      subtitle: 'Gerenciar alertas',
      color: '#F6AD55',
    },
    {
      icon: Shield,
      title: 'Privacidade',
      subtitle: 'Configurações de dados',
      color: '#9F7AEA',
    },
    {
      icon: HelpCircle,
      title: 'Ajuda & Suporte',
      subtitle: 'Central de ajuda',
      color: '#4299E1',
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

          <Text style={styles.userName}>Usuário</Text>
          <Text style={styles.userEmail}>usuario@exemplo.com</Text>

          <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: '#FC8181' + '20' }]}>
              <Heart size={24} color="#FC8181" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Favoritas</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: '#F6AD55' + '20' }]}>
              <Star size={24} color="#F6AD55" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>28</Text>
            <Text style={styles.statLabel}>Receitas</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: '#9F7AEA' + '20' }]}>
              <Award size={24} color="#9F7AEA" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Conquistas</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  activeOpacity={0.7}
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

        <View style={styles.premiumCard}>
          <LinearGradient
            colors={Colors.gradient.purple}
            style={styles.premiumGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.premiumContent}>
              <View style={styles.premiumIconContainer}>
                <Star size={32} color={Colors.surface} strokeWidth={2} fill={Colors.surface} />
              </View>
              <Text style={styles.premiumTitle}>Upgrade para Premium</Text>
              <Text style={styles.premiumDescription}>
                Acesse receitas exclusivas, planos personalizados e muito mais
              </Text>
              <TouchableOpacity style={styles.premiumButton} activeOpacity={0.8}>
                <Text style={styles.premiumButtonText}>Assinar Agora</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
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
    paddingTop: 32,
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
  premiumCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden' as const,
    marginBottom: 24,
    shadowColor: '#9F7AEA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  premiumGradient: {
    padding: 24,
  },
  premiumContent: {
    alignItems: 'center' as const,
  },
  premiumIconContainer: {
    marginBottom: 16,
  },
  premiumTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.surface,
    marginBottom: 8,
  },
  premiumDescription: {
    fontSize: 15,
    color: Colors.surface,
    textAlign: 'center' as const,
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 22,
  },
  premiumButton: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  premiumButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#9F7AEA',
  },
  logoutButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center' as const,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.error,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
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
