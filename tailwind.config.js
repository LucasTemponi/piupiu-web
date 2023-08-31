/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
      extend: {
        colors:{
          'primary-100': '#fbfc0b',
          'primary-200': '#c8c908',
          'primary-300': '#969706',
          'secondary-100': '#0c0bfc',
          'secondary-200': '#3c3bfc',
          'secondary-300': '#5454fc',
          'tertiary-100': '#0bfbfc',
          'tertiary-300': '#08c8c9',
          'tertiary-200': '#07afb0',
          'quaternary-100': '#fc0bfb',
          'quaternary-300': '#c908c8',
          'quaternary-200': '#b007af',
          'semitransparent-dark':'rgba(0,0,0,0.65)',
          'semitransparent-light':'rgba(255,255,255,0.65)',
          'border-dark':'#2f3336',
          'border-light':'rgb(239, 243, 244)',
          'hover-dark':'rgba(255,255,255,0.03)',
          'hover-light':'rgba(0,0,0,0.03)',
          'text-light':'rgba(15,20,25,1.00)'
        },
       boxShadow: {
        'cs-dark': 'rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px',
        'cs-light':'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
       }
      },
      screens:{
        ...defaultTheme.screens,
        'ws': '900px'
      },
    },
    plugins: [],
  }