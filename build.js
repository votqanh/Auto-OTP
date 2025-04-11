// build.js
const esbuild = require('esbuild');

Promise.all([
    esbuild.build({
        entryPoints: ['src/background.js'],
        bundle: true,
        platform: 'node', // For background script
        outfile: 'dist/background.js',
    }),
    esbuild.build({
        entryPoints: ['src/popup/index.js'],
        bundle: true,
        platform: 'browser', // For popup script
        format: 'iife', // For browser compatibility
        outfile: 'dist/popup.js',
    }),
]).then(() => {
    console.log('Build succeeded!');
}).catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
});