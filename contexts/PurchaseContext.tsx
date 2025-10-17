import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Platform, Alert } from 'react-native';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ProductId = 'premium_acesso_monthly' | 'premium_acesso_annual';

export interface PurchaseProduct {
  productId: ProductId;
  title: string;
  description: string;
  price: string;
  priceAmountMicros: number;
  priceCurrencyCode: string;
}

interface PurchaseState {
  isPremium: boolean;
  isLoading: boolean;
  products: PurchaseProduct[];
  error: string | null;
}

const GOOGLE_PLAY_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA66qv33aIrNFLjcJe0vO6t8Jxm2Y7yQvUMTGycy8ZJKXfHwG/up7o6aOdxUJ8nd3bxl6HgpZW7pm8e4nABH6uuyMtjfYGcSM25lAEqoJOfU0WUcBe/cYU+EXeQ067cdznyXbq81I/nYzlwWhGFhboEfvSV2UySNug4SpOOw1wHsHQzYdTdiiuC56uZ5P6yCX21q5cs1kxCawJj0YuE/ZQbcMRsJ4/ly/rSHk1VaKXwiL7xPB6oW4C7L/Y8qX8EZqR+5rKcETu4fy1zAcCpOBi500F7ap9u8wx6xYjxqFMmjL379RE2jNe6RmNt7M+0tKCTMhXdj0K03lNg2gHoXDNlwIDAQAB';

const STORAGE_KEY = '@premium_status';

export const [PurchaseProvider, usePurchase] = createContextHook(() => {
  const { user } = useAuth();
  const [state, setState] = useState<PurchaseState>({
    isPremium: false,
    isLoading: true,
    products: [],
    error: null,
  });

  const mockProducts: PurchaseProduct[] = useMemo(() => [
    {
      productId: 'premium_acesso_monthly',
      title: 'Premium Mensal',
      description: 'Acesso premium por 1 mês',
      price: 'R$ 27,00',
      priceAmountMicros: 27000000,
      priceCurrencyCode: 'BRL',
    },
    {
      productId: 'premium_acesso_annual',
      title: 'Premium Anual',
      description: 'Acesso premium por 1 ano',
      price: 'R$ 97,00',
      priceAmountMicros: 97000000,
      priceCurrencyCode: 'BRL',
    },
  ], []);

  const checkPremiumStatus = useCallback(async () => {
    try {
      console.log('[Purchase] Checking premium status for user:', user?.id);
      
      if (!user) {
        setState(prev => ({ ...prev, isPremium: false, isLoading: false }));
        return;
      }

      const stored = await AsyncStorage.getItem(`${STORAGE_KEY}_${user.id}`);
      if (stored) {
        const premiumData = JSON.parse(stored);
        const isStillValid = new Date(premiumData.expiryDate) > new Date();
        
        console.log('[Purchase] Stored premium status:', { 
          isPremium: premiumData.isPremium, 
          expiryDate: premiumData.expiryDate,
          isStillValid 
        });

        if (isStillValid && premiumData.isPremium) {
          setState(prev => ({ 
            ...prev, 
            isPremium: true, 
            isLoading: false 
          }));
          return;
        }
      }

      setState(prev => ({ ...prev, isPremium: false, isLoading: false }));
    } catch (error) {
      console.error('[Purchase] Error checking premium status:', error);
      setState(prev => ({ 
        ...prev, 
        isPremium: false, 
        isLoading: false,
        error: 'Erro ao verificar status premium' 
      }));
    }
  }, [user]);

  useEffect(() => {
    console.log('[Purchase] Initializing purchase system...');
    setState(prev => ({ ...prev, products: mockProducts }));
    checkPremiumStatus();
  }, [checkPremiumStatus, mockProducts]);

  const purchaseProduct = useCallback(async (productId: ProductId) => {
    try {
      console.log('[Purchase] Starting purchase for product:', productId);
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      if (Platform.OS === 'web') {
        Alert.alert(
          'Plataforma não suportada',
          'Compras in-app não são suportadas na web. Por favor, use o app no seu dispositivo móvel.'
        );
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: 'Web não suportado' };
      }

      if (!user) {
        Alert.alert('Erro', 'Você precisa estar logado para fazer compras.');
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: 'Usuário não autenticado' };
      }

      console.log('[Purchase] Simulating purchase flow for development...');
      console.log('[Purchase] Google Play Public Key configured:', GOOGLE_PLAY_PUBLIC_KEY.substring(0, 50) + '...');

      await new Promise(resolve => setTimeout(resolve, 1500));

      const expiryDate = productId === 'premium_acesso_annual'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      const premiumData = {
        isPremium: true,
        productId,
        purchaseDate: new Date().toISOString(),
        expiryDate: expiryDate.toISOString(),
      };

      await AsyncStorage.setItem(
        `${STORAGE_KEY}_${user.id}`,
        JSON.stringify(premiumData)
      );

      console.log('[Purchase] Purchase successful! Premium activated until:', expiryDate);

      setState(prev => ({ 
        ...prev, 
        isPremium: true, 
        isLoading: false 
      }));

      Alert.alert(
        '🎉 Compra realizada com sucesso!',
        'Bem-vindo ao Premium! Todos os recursos foram desbloqueados.',
        [{ text: 'Começar', style: 'default' }]
      );

      return { success: true, error: null };
    } catch (error) {
      console.error('[Purchase] Error during purchase:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: errorMessage 
      }));

      Alert.alert(
        'Erro na compra',
        'Não foi possível completar a compra. Tente novamente mais tarde.'
      );

      return { success: false, error: errorMessage };
    }
  }, [user]);

  const restorePurchases = useCallback(async () => {
    try {
      console.log('[Purchase] Restoring purchases...');
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      await checkPremiumStatus();

      if (state.isPremium) {
        Alert.alert(
          'Compras restauradas!',
          'Seu acesso premium foi restaurado com sucesso.'
        );
      } else {
        Alert.alert(
          'Nenhuma compra encontrada',
          'Não encontramos compras anteriores para esta conta.'
        );
      }

      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('[Purchase] Error restoring purchases:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Erro ao restaurar compras' 
      }));
    }
  }, [checkPremiumStatus, state.isPremium]);

  return useMemo(
    () => ({
      isPremium: state.isPremium,
      isLoading: state.isLoading,
      products: state.products,
      error: state.error,
      purchaseProduct,
      restorePurchases,
      checkPremiumStatus,
    }),
    [state, purchaseProduct, restorePurchases, checkPremiumStatus]
  );
});
