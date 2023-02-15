module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "821px",
      // => @media (min-width: 768px) { ... }

      lg: "1366px",
      // => @media (min-width: 1025px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serifAR: ["Cairo"],
      serifEN: ["Roboto"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ["Almarai"],
    },
    extend: {
      dropShadow: {
        "3xl": "0px 0px 20px #822eff",
      },
      colors: {
        primary: {
          black: {
            DEFAULT: "#000000",
            light: "#16181A",
          },
          gray: {
            DEFAULT: "#878787",
          },
          pink: {
            DEFAULT: "#BD11FA",
          },
          cyan: {
            DEFAULT: "#46C2FF",
            light: "#5ABAC2",
          },
          purple: {
            DEFAULT: "#822EFF",
          },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
