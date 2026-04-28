import { defineConfig } from 'rspress/config';
import { rspack } from '@rspack/core';
import { pluginPlayground } from '@rspress/plugin-playground';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'docs',
  outDir: 'public',
  base: '/json-pollock/',
  title: 'JsonPollock',
  description: 'Structured Content Rendering Tool',
  icon: '/logo.png',
  logo: '/logo.svg',
  logoText: 'JsonPollock',
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/LivePersonInc/json-pollock',
      },
    ],
  },
  globalStyles: path.join(__dirname, 'docs/styles.css'),
  plugins: [
    pluginPlayground({
      render: './docs/playground/Playground.jsx',
    }),
  ],
  builderConfig: {
    tools: {
      rspack: async (config) => {
        const copyPlugin = new rspack.CopyRspackPlugin({
          priority: 0,
          patterns: [
            //
            { from: 'dist/*.*' },
            { from: 'examples/*.*' },
          ],
        });
        config.plugins?.push(copyPlugin);
        const polyPlugin = new NodePolyfillPlugin({
          additionalAliases: [],
          onlyAliases: ['fs', 'path', 'process', 'util'],
        });
        config.plugins?.push(polyPlugin);
        return config;
      },
    },
  },
  route: {
    exclude: ['Playground.jsx', '**/*.jsx'],
  },
});
