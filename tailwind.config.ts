import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0A0A0C',
          soft: '#0E0E11',
        },
        surface: {
          DEFAULT: '#131316',
          elevated: '#18181C',
          border: 'rgba(255,255,255,0.07)',
        },
        ink: {
          DEFAULT: '#F2F2F5',
          dim: '#9797A3',
          faint: '#5C5C66',
        },
        accent: {
          indigo: '#6366F1',
          'indigo-soft': '#818CF8',
          cyan: '#22D3EE',
          amber: '#F5A623',
        },
      },
      fontFamily: {
        display: ['"General Sans"', '"Inter"', 'sans-serif'],
        body: ['"General Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #6366F1 0%, #22D3EE 100%)',
        'grad-primary-soft': 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(34,211,238,0.18) 100%)',
        'grad-radial': 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.16), transparent 60%)',
        'grad-spot': 'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.14), transparent 70%)',
        'grid-lines':
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      boxShadow: {
        glow: '0 0 40px rgba(99,102,241,0.28)',
        'glow-cyan': '0 0 40px rgba(34,211,238,0.22)',
        card: '0 4px 28px rgba(0,0,0,0.45)',
        lift: '0 20px 45px -12px rgba(0,0,0,0.55)',
      },
      animation: {
        blink: 'blink 1.1s steps(1) infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
