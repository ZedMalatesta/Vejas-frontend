import { Injectable, signal } from '@angular/core';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly user = signal<User | null>(null);

  constructor() {
    this.loadUser();

    supabase.auth.onAuthStateChange((_event, session) => {
      this.user.set(session?.user ?? null);
    });
  }

  async loadUser(): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    this.user.set(user);
  }

  signInWithGoogle(): ReturnType<typeof supabase.auth.signInWithOAuth> {
    return supabase.auth.signInWithOAuth({ provider: 'google' });
  }

  signInWithGithub(): ReturnType<typeof supabase.auth.signInWithOAuth> {
    return supabase.auth.signInWithOAuth({ provider: 'github' });
  }

  signUp(email: string, password: string): ReturnType<typeof supabase.auth.signUp> {
    return supabase.auth.signUp({ email, password });
  }

  signIn(email: string, password: string): ReturnType<typeof supabase.auth.signInWithPassword> {
    return supabase.auth.signInWithPassword({ email, password });
  }

  signOut(): ReturnType<typeof supabase.auth.signOut> {
    return supabase.auth.signOut();
  }
}
