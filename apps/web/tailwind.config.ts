import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // If using pages router alongside app
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Assuming a components directory
    // Or if shadcn/ui is used, it might have its own content path:
    // "./src/**/*.{ts,tsx}", // Example if components are in src
  ],
  theme: {
    extend: {
      // Add custom theme extensions here
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  plugins: [],
};
export default config;
