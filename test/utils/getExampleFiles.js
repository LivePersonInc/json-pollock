import fs from 'fs-extra';
import path from 'path';

export const __rootdir = path.resolve(__dirname, '../..');
export const __examplesdir = path.resolve(__rootdir, 'examples'); // Correct path to examples directory

// Get all HTML files from the `examples` directory
export const getExampleFiles = () =>
  fs
    .readdirSync(__examplesdir)
    .filter((file) => file.endsWith('.html'))
    .map((file) => {
      const filePath = path.resolve(__examplesdir, file);
      return [file, filePath]; // Return [filename, fullPath]
    }); // Format for test.each
