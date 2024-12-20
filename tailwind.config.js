/** @type {import('tailwindcss').Config} */

import fluid, { extract, screens, fontSize } from "fluid-tailwind";

export default {
  darkMode: ["class"],
  content: { files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], extract },
  theme: {
    fontSize,
    screens,
    extend: {
      fontFamily: {
        outfit: ['Outfit"', "sans-serif"],
        inter: ['Inter"', "sans-serif"],
      },
      colors: {
        "mavride-blue": "#0A1ED9",
        "mavride-deep-blue": "#26203B",
        "error-red": "#F32121",
        "custom-gray": "#EFEFEF",
        "button-gray": "#D3D3D3",
        "light-grey": "#8C8C8C",
        "grey-97": "#979797",
        danger: "#FF0000",

        customGray: "#FEFEFE",
      },
      backgroundImage: {
        profile: "url(/src/assets/profile.svg)",
        signupBg: "url(/src/assets/bg_desktop.png)",
      },
    },
  },
  plugins: [
    fluid,
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
    require("tailwindcss-animate"),
  ],
};
