/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        greenIndia: '#138808',
        navyAshoka: '#000080'
      },
      keyframes: {
        flagWave: {
          '0%, 100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-8%)' }
        },
        pop: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' }
        },
        confetti: {
          '0%': { transform: 'translateY(-30px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(220px) rotate(180deg)', opacity: '0' }
        }
      },
      animation: {
        flagWave: 'flagWave 7s ease-in-out infinite',
        pop: 'pop 300ms ease-out forwards',
        confetti: 'confetti 1.4s linear infinite'
      }
    }
  },
  plugins: []
};
