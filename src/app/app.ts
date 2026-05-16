import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

function applyTheme(theme: 'light' | 'dark') {
  try {
    document.documentElement.setAttribute('data-theme', theme);
  } catch {
    /* ignore when DOM not available */
  }
}

function guessThemeFromTime(): 'light' | 'dark' {
  try {
    const h = new Date().getHours();
    return h >= 7 && h < 19 ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function initAutoTheme() {
  if (typeof window === 'undefined') return;

  const mqlSupported = typeof window.matchMedia === 'function';

  if (mqlSupported) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    // If the system reports a preference, use it
    if (mq.matches) {
      applyTheme('dark');
    } else if (mq.media) {
      applyTheme('light');
    } else {
      applyTheme(guessThemeFromTime());
    }

    // Keep in sync when system preference changes
    try {
      mq.addEventListener('change', (ev: MediaQueryListEvent) => {
        applyTheme(ev.matches ? 'dark' : 'light');
      });
    } catch {
      // older browsers
      try {
        // @ts-ignore
        mq.addListener((ev: any) => applyTheme(ev.matches ? 'dark' : 'light'));
      } catch {
        /* ignore */
      }
    }
  } else {
    // fallback to time-of-day
    applyTheme(guessThemeFromTime());
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('vejas-frontend');

  constructor() {
    initAutoTheme();
  }
}
