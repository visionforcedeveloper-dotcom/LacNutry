import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || 'https://ggkjubgpftgaxlxivqgh.supabase.co';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdna2p1YmdwZnRnYXhseGl2cWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMDg1ODksImV4cCI6MjA3MzY4NDU4OX0.jsHsjybJ4qshC0ajkCIlNoO3eIgMprCk81oLxmDOuwg';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('EXPO_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('EXPO_PUBLIC_SUPABASE_KEY:', supabaseAnonKey ? 'Present' : 'Missing');
}

const supabaseStorage = {
  getItem: async (key: string) => {
    if (Platform.OS === 'web') {
      if (typeof localStorage === 'undefined') {
        return null;
      }
      return localStorage.getItem(key);
    }
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') {
      if (typeof localStorage === 'undefined') {
        return;
      }
      localStorage.setItem(key, value);
    } else {
      AsyncStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string) => {
    if (Platform.OS === 'web') {
      if (typeof localStorage === 'undefined') {
        return;
      }
      localStorage.removeItem(key);
    } else {
      AsyncStorage.removeItem(key);
    }
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: supabaseStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
