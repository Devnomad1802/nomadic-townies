/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brick: { DEFAULT: '#D44424', deep: '#A53217' },
        ink: '#1A1A1A',
        paper: { DEFAULT: '#F5EFE3', 2: '#EDE4D2' },
        cream: '#FAF6EC',
        sun: '#E8B547',
        leaf: '#3C5A36',
      },
      fontFamily: {
        hand: ['"Bowlby One"', 'system-ui', 'sans-serif'],
        script: ['"Caveat Brush"', 'cursive'],
        marker: ['Caveat', 'cursive'],
        narrow: ['"Archivo Narrow"', 'sans-serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'hard': '8px 8px 0 #1A1A1A',
        'hard-sm': '6px 6px 0 #1A1A1A',
        'hard-brick': '6px 6px 0 #D44424',
      },
      animation: {
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16,1,0.3,1)',
        'fade-in': 'fade-in 0.3s ease-out',
        'rise-in': 'rise-in 0.8s ease-out forwards',
      },
      keyframes: {
        'pulse-dot': { '0%,100%':{transform:'scale(1)',opacity:'1'}, '50%':{transform:'scale(1.4)',opacity:'.6'} },
        'slide-up':  { 'from':{transform:'translateY(100%)',opacity:'0'}, 'to':{transform:'translateY(0)',opacity:'1'} },
        'fade-in':   { 'from':{opacity:'0'}, 'to':{opacity:'1'} },
        'rise-in':   { 'from':{opacity:'0',transform:'translateY(16px)'}, 'to':{opacity:'1',transform:'translateY(0)'} },
      },
    },
  },
  plugins: [],
};
