module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "2/7": "29%",
        "6/16": "37.5%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
