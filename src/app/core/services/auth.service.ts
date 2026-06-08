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

  async signUp(email: string, password: string) {
    const result = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(result);

    return result;
  }

  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:4200/auth/change-password',
    });
  }

  async updatePassword(password: string) {
    return supabase.auth.updateUser({
      password,
    });
  }

  signOut() {
    return supabase.auth.signOut();
  }
}
