/** @type {import('tailwindcss').Config} */

import fluid, { extract } from "fluid-tailwind";

import fluid, { extract, screens, fontSize } from "fluid-tailwind";

export default {
  content: { files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], extract },
  theme: {
    screens,
    fontSize,
    extend: {
      fontFamily: {
        outfit: ['"Outfit"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
      },
      colors: {
        "mavride-blue": "#0A1ED9",
        "mavride-deep-blue": "#26203B",
        "error-red": "#F32121",
        "custom-gray": "#EFEFEF",
        "button-gray": "#D3D3D3",
        "light-grey": "#8C8C8C",
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
  ],
};
