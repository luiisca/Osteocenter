const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      screens: {
        "mob-me": "545px",
        "blog-lg": "992px",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",

        black: colors.black,
        white: colors.white,
        gray: colors.coolGray,
        red: colors.red,
        yellow: colors.amber,
        green: colors.emerald,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.violet,
        pink: {
          ...colors.pink,
          90: "#222",
          80: "#333",
        },
        customBlue: {
          100: "#FF0000",
          200: "#F203FF",
          500: "#A24F11",
        },
        primary: {
          "tint-3": "#f1f9ff", // 100
          "tint-2": "#e1f3ff", // 200
          "tint-1": "#c9eaff",
          DEFAULT: "#74c0fc", // 400
          "shade-1": "#3f9cf5",
          "shade-2": "#3688e3", // 600
          "shade-3": "#317acc",
        },
        accent: {
          DEFAULT: "#888",
          "lightest-on-fff": "#767676",
          "lightest-on-tint-3": "#5f5f5f",
          333: "#333333",
          555: "#555555",
        },
      },
      backgroundColor: (theme) => theme("colors"),
      borderColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.gray.200", "currentColor"),
      }),
      caretColor: (theme) => theme("colors"),
      divideColor: (theme) => theme("borderColor"),
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: [
          "Lora",
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      gradientColorStops: (theme) => theme("colors"),
      placeholderColor: (theme) => theme("colors"),
      ringColor: (theme) => ({
        DEFAULT: theme("colors.blue.500", "#3b82f6"),
        ...theme("colors"),
      }),
      ringOffsetColor: (theme) => theme("colors"),
      textColor: (theme) => theme("colors"),
      fill: (theme) => theme("colors"),
      stroke: (theme) => theme("colors"),
    },
  },
  plugins: [],
};
