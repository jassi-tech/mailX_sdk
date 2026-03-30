import type { Config } from "tailwindcss";

const generateFluidScale = (max: number) => {
  const scale: Record<string, string> = {
    full: '100%',
    screen: '100vh',
    svh: '100svh',
    lvh: '100lvh',
    dvh: '100dvh',
    vw: '100vw',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
    auto: 'auto',
  };
  for (let i = 0; i <= max; i++) {
    scale[`s-${i}`] = `calc(var(--1) * ${i})`;
  }
  return scale;
};

const fmdsScale = generateFluidScale(1000);

const maxWidthScale = {
  ...fmdsScale,
  xs: 'calc(var(--1) * 320)',
  sm: 'calc(var(--1) * 384)',
  md: 'calc(var(--1) * 448)',
  lg: 'calc(var(--1) * 512)',
  xl: 'calc(var(--1) * 576)',
  '2xl': 'calc(var(--1) * 672)',
  '3xl': 'calc(var(--1) * 768)',
  '4xl': 'calc(var(--1) * 896)',
  '5xl': 'calc(var(--1) * 1024)',
  '6xl': 'calc(var(--1) * 1152)',
  '7xl': 'calc(var(--1) * 1280)',
};

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    spacing: fmdsScale,
    fontSize: fmdsScale,
    lineHeight: fmdsScale,
    letterSpacing: fmdsScale,
    borderRadius: fmdsScale,
    borderWidth: fmdsScale,
    minWidth: fmdsScale,
    maxWidth: maxWidthScale,
    minHeight: fmdsScale,
    maxHeight: fmdsScale,
    blur: fmdsScale,
    backdropBlur: fmdsScale,
    outlineOffset: fmdsScale,
    outlineWidth: fmdsScale,
    ringWidth: fmdsScale,
    ringOffsetWidth: fmdsScale,
    
    extend: {
      colors: {
        bg: {
          base: '#0a0a0e',
          card: '#12121a',
          elevated: '#1a1a26',
          hover: '#222232',
        },
        border: {
          DEFAULT: '#1e1e2d',
          dim: '#161622',
        },
        accent: {
          DEFAULT: '#6c63ff',
          dim: '#5a52e0',
          glow: 'rgba(108, 99, 255, 0.15)',
        },
        text: {
          primary: '#f8f8fc',
          secondary: '#a0a0b8',
          muted: '#646480',
        },
        success: '#10b981',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
