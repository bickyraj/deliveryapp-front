const colors = require('tailwindcss/colors')
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        primary: colors.cyan,
        'cool-gray': colors.coolGray
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
