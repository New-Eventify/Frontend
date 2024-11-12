/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        appNavyBlue: "#2B293D",
        appYellow: "#FFE047",
        appDarkText: "#2D2C3C",
        placeholderGray: "rgba(90, 90, 90, 0.5)",
        cardGray: "#D9D9D9",
        appDarkGrayText: "#5A5A5A",
      },
    },
  },
  plugins: [],
};
