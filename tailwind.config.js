/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
  	
    extend: {
    	width: {
    		'40rem' : '40rem',
    	},
      colors : {
        // Primary
        'marine-blue': 'hsl(213, 96%, 18%)',
        'purplish-blue': 'hsl(243, 100%, 62%)',
        'pastel-blue': 'hsl(228, 100%, 84%)',
        'light-blue': 'hsl(206, 94%, 87%)',
        'strawberry-red': 'hsl(354, 84%, 57%)',

        // Neutral
        'cool-gray': 'hsl(231, 11%, 63%)',
        'light-gray': 'hsl(229, 24%, 87%)',
        'magnolia': 'hsl(217, 100%, 97%)',
        'alabaster': 'hsl(231, 100%, 99%)',
        'white': 'hsl(0, 0%, 100%)',
        'black': 'hsl(0, 0%, 0%)'
      },
    },
  },
  plugins: [
  	plugin(( { addVariant } ) => { addVariant('addon-active', '&[data-addon-status="active"]') }),
  	plugin(( { addVariant } ) => { addVariant('error', '&[data-field-status="error"]') }),
    plugin(( { addVariant } ) => { addVariant('active-indicator', '&[data-indicator-status="active"]') }),
    plugin(( { addVariant } ) => { addVariant('active', '&[data-form-sect-status="active"]') }),
    plugin(( { addVariant } ) => { addVariant('option-active', '&[data-option-status="active"]') }),
    plugin(( { addVariant } ) => { addVariant('card-active', '&[data-card-status="active"]') }),
  ],
}