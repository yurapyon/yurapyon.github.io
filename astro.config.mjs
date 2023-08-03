import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import image from "@astrojs/image";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: "https://www.pyon.moe",
  integrations: [tailwind(), image(), mdx()]
});