import { defineConfig } from 'rspress/config';
import { rspack } from '@rspack/core';
import { pluginPlayground } from '@rspress/plugin-playground';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path from 'path';

export default defineConfig({
  ssg: false,
  root: 'docs',
  outDir: 'public',
  title: 'JsonPollock',
  description: 'Structured Content Rendering Tool',
  icon: '/logo.png',
  logo: '/logo.svg',
  logoText: 'JsonPollock',
  themeConfig: {
    socialLinks: [
      {
        icon: 'gitlab',
        mode: 'link',
        content:
          'https://gitlab.com/l1905/conversational-cloud-engineering/communication-channels/web/json-pollock.git',
      },
    ],
  },
  globalStyles: path.join(__dirname, 'docs/styles.css'),
  plugins: [
    pluginPlayground({
      render: './Playground.jsx',
      // include: ['fs', 'path'],
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
