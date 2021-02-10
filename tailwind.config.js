module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./shared/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "auto 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
