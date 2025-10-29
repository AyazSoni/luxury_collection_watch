/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#597D73',
        bgGreen : '#ceddd9',
        customPink: '#EAE1DF',
        customPurpleLight: '#103F69',
        customPurpleDark: '#103F69',
        card1bg: '#F6CECF',
        card2bg: '#CCEBE8',
        card3bg: '#ECECF4',
        card4bg: '#F8E6CB',
        card5bg: '#D8E4BC',
        card6bg: '#e1a9a1',
        card7bg: '#d1fce2',
        card8bg: '#fcf0d7',
        card9bg: '#D7FCEC',
        card10bg: '#F5F5F5',
        // Watch gradient colors
        watchBrown: '#8B4513',
        watchGold: '#DAA520',
        watchWhite: '#FFFFFF',
        watchCream: '#F5F5DC',
        // Add more colors if needed
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
