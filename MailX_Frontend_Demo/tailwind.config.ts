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
          base: 'var(--color-bg-base)',
          card: 'var(--color-bg-card)',
          elevated: 'var(--color-bg-elevated)',
          hover: 'var(--color-bg-hover)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          dim: 'var(--color-border-dim)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          dim: 'var(--color-accent-dim)',
          glow: 'var(--color-accent-glow)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
