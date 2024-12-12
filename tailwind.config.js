/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require("tailwindcss/plugin")

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ctP: "#7C5DFA",
        ctLp: "#9277FF",
        ltSb: "#373B53",
        ctHg: "#888EB0",
        ctBg: "#7E88C3",
        bg: "#F8F8FB",
        ctGr: "#33D69F",
        dkBg: "#141625",
        dkSb: "#1E2139",
        dkHg: "#DFE3FA",
        dkwt: "#FFFFFF",
        ctYl: "#FF8F00",
        ctGy: "#DFE3FA"
      },
      fontFamily: {
        spartan: ['"League Spartan"', ...defaultTheme.fontFamily.sans], // 使用 defaultTheme 扩展默认字体
      },
      fontSize: {
        // Heading L
        'heading-l': ['36px', { lineHeight: '33px', letterSpacing: '-1px' }],
        // Heading M
        'heading-m': ['24px', { lineHeight: '22px', letterSpacing: '-0.75px' }],
        // Heading S
        'heading-s': ['15px', { lineHeight: '24px', letterSpacing: '-0.25px' }],
        // Heading S Variant
        'heading-s-variant': ['15px', { lineHeight: '15px', letterSpacing: '-0.25px' }],
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents}) {
      addComponents({
        ".blackList": {
          display: "flex",
          marginLeft: "32px",
          marginTop: "30px",
          marginBottom: "27px",
          marginRight: "44px",
          alignItems: "center",
        },
      });
    }),
  ],
};

