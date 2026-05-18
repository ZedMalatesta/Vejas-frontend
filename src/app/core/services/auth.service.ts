import { Injectable, signal } from '@angular/core';
import { supabase } from '../supabase/supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<any>(null);

  constructor() {
    this.loadUser();

    supabase.auth.onAuthStateChange((event, session) => {
      this.user.set(session?.user ?? null);
    });
  }

  async loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    this.user.set(user);
  }

  signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  signInWithGithub() {
    return supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }

  signUp(email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password,
    });
  }

  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  signOut() {
    return supabase.auth.signOut();
  }
}