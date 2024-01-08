/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,js}", "./public/index.html"],
   theme: {
      extend: {
         backgroundColor: {
            primary: "#f5f5f5",
            secondary1: "#1266dd",
            secondary2: "#f73859",
            "overlay-30": "rgba(0,0,0,0.3)",
            "overlay-70": "rgba(0,0,0,0.7)",
         },
      },
   },
   plugins: [],
};
