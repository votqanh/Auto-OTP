// node src/generate-manifest.js

const fs = require('fs');
const path = require('path');

// Read the .env file
const envFilePath = path.join(__dirname, '..', '.env');
const envFileContent = fs.readFileSync(envFilePath, 'utf8');

// Extract GOOGLE_CLIENT_ID
const clientIdMatch = envFileContent.match(/GOOGLE_CLIENT_ID=(.*)/);
if (!clientIdMatch) {
  throw new Error('GOOGLE_CLIENT_ID not found in .env file');
}
const clientId = clientIdMatch[1];

// Read the original manifest.json file
const manifestFilePath = path.join(__dirname, '..', 'manifest-org.json');
const manifestContent = fs.readFileSync(manifestFilePath, 'utf8');

// Replace the placeholder with the actual GOOGLE_CLIENT_ID
const updatedManifestContent = manifestContent.replace(/GOOGLE_CLIENT_ID/g, `${clientId}`);

// Write new manifest.json
const generatedManifestFilePath = path.join(__dirname, '..', 'manifest.json');
fs.writeFileSync(generatedManifestFilePath, updatedManifestContent);

console.log('manifest-generated.json created successfully!');