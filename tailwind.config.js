const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const { join } = require("path");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
}

module.exports = {
  content: [join(__dirname, "src/**/*.{html,ts}")],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      colors: {
        primary: withOpacity("--moderate-blue"),
      },
      // create custom fonts here
      fontFamily: {
        mono: ["'Rubik'", ...defaultTheme.fontFamily.mono],
      },
      // create custom text colors here
      textColor: {
        fill: withOpacity("--text-fill"),
        muted: withOpacity("--text-muted"),
        inverted: withOpacity("--text-inverted"),
        danger: withOpacity("--text-danger"),
      },
      // create custom background colors here
      backgroundColor: {
        fill: withOpacity("--bg-fill"),
        elements: withOpacity("--bg-elements"),
        muted: withOpacity("--bg-muted"),
        'muted-900': withOpacity("--bg-muted-900"),
        danger: withOpacity("--bg-danger"),
      },
      borderColor: {
        danger: withOpacity("--border-danger"),
      },
      // create custom gradient color here
      gradientColorStops: {
        hue: withOpacity("--color-fill"),
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen 2xl": {
            maxWidth: "1440px",
          },
        },
      });
    }),
  ],
};
