/* eslint-disable no-unused-vars */
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import path from 'path';
import { CheckSyntaxRspackPlugin } from '@rsbuild/plugin-check-syntax';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import ContentReplacePlugin from 'content-replace-webpack-plugin';
import packageJson from './package.json' assert { type: 'json' }; /* eslint-disable-line */

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['> 0.5%', 'last 2 versions', 'not dead'];
const version = process.env.BUILD_VERSION || packageJson.version;

/**
 * to produce
  ├── json-pollock.js
  ├── json-pollock.bundle.min.js
  ├── json-pollock.bundle.no_validation.min.js
  ├── json-pollock.global.min.js
  ├── json-pollock.global.no_validation.min.js
 */
const getFileName = (buildMode, entry, validation) => {
  const fileName = 'json-pollock',
    extension = buildMode === 'full' ? 'js' : 'min.js';
  return [
    fileName,
    ...(buildMode === 'full' ? [] : [buildMode]),
    ...(validation ? [] : ['no_validation']),
    extension,
  ].join('.');
};

export default function (env, argv) {
  const entries = argv.entry;
  const buildMode = env.BUILD_MODE || 'bundle'; // Default to 'bundle' mode
  const validation = env.VALIDATION === 'true';
  const entry = entries ? entries[0] : './src/index.js';

  return defineConfig({
    entry,
    target: ['web', 'es2015'],
    mode: 'production',
    output: {
      path: path.resolve('dist'),
      clean: false,
      chunkFormat: false,
      filename: getFileName(buildMode, entry, validation),
      library: {
        name: 'JsonPollock',
        type: buildMode === 'global' ? 'this' : 'umd',
        export: 'default',
        umdNamedDefine: buildMode !== 'global',
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            buildMode === 'global' ? rspack.CssExtractRspackPlugin.loader : null,
            buildMode === 'global'
              ? null
              : {
                  loader: 'style-loader', // @see https://github.com/webpack-contrib/style-loader?tab=readme-ov-file#injecttype
                },
            {
              loader: 'css-loader', // @see https://github.com/webpack-contrib/css-loader?tab=readme-ov-file#exporttype
              options: { sourceMap: true },
            },
            { loader: 'sass-loader' },
          ].filter(Boolean),
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: 'builtin:swc-loader',
              options: {
                // env: { targets, }, //  INFO:`env` and `jsc.target` cannot be used together
                jsc: {
                  target: 'es2015', // INFO: use direct target here to transform `class`
                  loose: true, // equivalent of https://babeljs.io/docs/assumptions
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // include css in bundle if not global, otherwise - extract
      buildMode === 'global'
        ? new rspack.CssExtractRspackPlugin({
            filename: 'json-pollock.min.css',
          })
        : null,
      // replace text
      new ContentReplacePlugin({
        rules: {
          '*.js': (content) => {
            return content.replace('@@version', version);
          },
        },
      }),
      // check if output compiled with target syntax
      new CheckSyntaxRspackPlugin({
        ecmaVersion: 2015,
        excludeOutput: [],
      }),
      // include only one polyfill
      validation
        ? new NodePolyfillPlugin({
            onlyAliases: ['process'],
          })
        : null,
      // generate analyzer html report (dist/.rsdoctor)
      buildMode === 'bundle' && validation && process.env.RSDOCTOR
        ? new RsdoctorRspackPlugin({
            mode: 'brief',
            features: ['bundle', 'treeShaking'],
            disableClientServer: true,
          })
        : null,
    ].filter(Boolean),
    optimization: {
      minimize: buildMode !== 'full',
    },
    resolve: {
      fallback: {},
    },
    stats: {
      warnings: false, // Ignore warnings during build
      assets: true,
    },
    ignoreWarnings: [/Conflicting values for 'process.env.NODE_ENV'/, /Sass @import rules/m],
  });
}
