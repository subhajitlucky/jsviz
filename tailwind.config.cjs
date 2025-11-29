module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          black: 'var(--bg-main)',
          zinc: 'var(--bg-surface)',
          border: 'var(--border-main)',
          lime: 'var(--accent-main)',
          blue: 'var(--accent-secondary)',
          white: 'var(--text-inverse)',
        }
      },
      boxShadow: {
        'neo': '4px 4px 0px var(--accent-main)',
      }
    },
  },
  plugins: [],
}
