import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    
    const initAuth = async () => {
      try {
        console.log('[Auth] Initializing authentication...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('[Auth] Error getting session:', error);
        }
        if (mounted) {
          console.log('[Auth] Session loaded:', !!session);
          setSession(session);
          setUser(session?.user ?? null);
          setIsAuthenticated(!!session);
        }
      } catch (error) {
        console.error('[Auth] Exception during auth init:', error);
        if (mounted) {
          setSession(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: unknown, session: Session | null) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  const completeSubscription = useCallback(async () => {
    console.log('[Auth] Subscription completed for user:', user?.id);
  }, [user]);

  return useMemo(
    () => ({
      session,
      user,
      loading,
      isAuthenticated,
      signUp,
      signIn,
      signOut,
      completeSubscription,
    }),
    [session, user, loading, isAuthenticated, signUp, signIn, signOut, completeSubscription]
  );
});
