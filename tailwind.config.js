/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    fontSize: {
      textH1: ["60px"],
      textH2: ["50px"],
      textH3: ["40px"],
      textH4: ["32px"],
      textH5: ["28px"],
      textH6: ["24px"],
      base: ["16px"],
      textsm: ["14px"],
      textxs: ["12px"],
      textxxs: [
        "10px",
        {
          fontWeight: "500",
        },
      ],

      textxxxs: ["8px"],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: " #002d5e",
          100: "#0560b9",
        },
        secondary: {
          DEFAULT: "#EB6223",
          100: "#EB6223",
        },
        green: {
          DEFAULT: "#07AA3D",
          100: "#C7E8D2",
        },
        gray: {
          DEFAULT: "#48484A",
          100: "#D1D1D6",
          200: "#8E8E93",
        },
        pine: "#005C39",
        blue: "#0096DB",
        citrus: "#F26D21",
        background: "#F7F7F7",
      },
      fontFamily: {
        LatoBold: "LatoBold",
        LatoRegular: "LatoRegular",
        MontserratBold: " MontserratBold",
        MontserratItalicVariableFont_wght: "MontserratItalicVariableFont_wght",
        MontserratSemiBold: "MontserratSemiBold",
        MontserratVariableFont_wght: "MontserratVariableFont_wght",
        SpectralBold: "SpectralBold",
        SpectralRegular: "SpectralRegular",
        SpectralSemiBold: "SpectralSemiBold",
        GilroyLightItalic: "GilroyLightItalic",
        GilroyMedium: "GilroyMedium",
        GilroyMediumItalic: "GilroyMediumItalic",
        GilroyRegular: "GilroyRegular",
        GilroyRegularItalic: "GilroyRegularItalic",
        GilroySemiBold: "GilroySemiBold",
        GilroyUltraLight: "GilroyUltraLight",
        GilroyUltraLightItalic: "GilroyUltraLightItalic",
        YsabeauInfant: "YsabeauInfant",
        YsabeauInfantIntalic: "YsabeauInfantIntalic",
      },
    },
  },
  plugins: [],
};
