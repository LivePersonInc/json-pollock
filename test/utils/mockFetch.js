import fs from 'fs';
import path from 'path';
import { __examplesdir } from './getExampleFiles';

// Mock fetch function to load local JSON files referenced in examples HTMLs
export const mockFetchJsonFiles = async (url) => {
  // Assuming URL is relative path like './some_file.json' from the HTML file's perspective
  const requestedPath = path.resolve(__examplesdir, url); // Resolve relative to examples dir
  try {
    // Dynamically import the JSON file content
    // Note: Node's import() might require specific flags or config for JSON depending on version
    // Using fs.readFileSync is more reliable here for JSON.
    const fileContent = fs.readFileSync(requestedPath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    return {
      ok: true,
      status: 200,
      json: () => Promise.resolve(jsonData),
      text: () => Promise.resolve(fileContent),
    };
  } catch (e) {
    console.error(`mockFetch Error: Failed to load json file ${url}`, e);
    return {
      ok: false,
      status: 404,
      json: () => {},
      text: () => Promise.reject(new Error('Not Found')),
    };
  }
};
