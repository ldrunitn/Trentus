/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
    // colors: {
    //   'grayblackground' : '#f3f4f6',
    // }
  },
  plugins: [daisyui],
}


