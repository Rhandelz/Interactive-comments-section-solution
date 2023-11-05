/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      w: "white",
      vl_gray: "#EAECF1",
      l_gray: "#EAECF1",
      lg_blue: "#C3C4EF",
      g_blue: "#67727E",
      m_blue: "#5457B6",
      d_blue: "#324152",
      p_red: "#FFB8BB",
      s_red: "#ED6468",
    },
    fontFamily: {
      rubik: ["Rubik", "san-serif"],
    },
  },
  plugins: [],
};
