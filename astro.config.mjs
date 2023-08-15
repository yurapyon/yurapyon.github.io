import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

import mdx from "@astrojs/mdx";

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://www.pyon.moe",
  markdown: {
    smartypants: false,
    gfm: false
  },
  integrations: [tailwind(), image(), mdx(), react()]
});