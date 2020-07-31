#!/usr/bin/env node

const { Command } = require('commander'); // include commander in git clone of commander repo
const program = new Command();
const fs = require('fs');
const path = require('path');
const util = require('util');
const mkdirp = require('mkdirp');
const pkg = require('./package.json');


program
  .version(pkg.version)
  .description(pkg.description);

program
  .command('setup [dir]', { isDefault: true })
  .action((dir = process.cwd(), opts) => {
    const rootDir = path.resolve(dir);
    const pagesDir = path.join(rootDir, '/pages');
    const packageJson = path.join(rootDir, 'package.json');
    const indexJs = path.join(pagesDir, 'index.js');
    console.log('making dir', pagesDir, process.env.DIAM_KEY);
    mkdirp.sync(pagesDir);
    console.log('writing pkg', packageJson);
    fs.writeFileSync(packageJson, `{
  "dependencies": {
    "next": "^9.5.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  },
  "scripts": {
    "dev": "next",
    "build": "yarn",
    "start": "next start"
  }
}
`);
    fs.writeFileSync(indexJs, `
export default function Diamond() {
  return (
    <>
      <h1>We have generated this!</h1>
      <h2>Key: ${process.env.DIAM_KEY}</h2>
      <p>
        ${process.env.DIAM_KEY ? `We have a compiled system!` : 'Onboarding, please give us a key!'}
      </p>
    </>
  )
}
`);
    console.log('setup', rootDir);
  })

program.parse(process.argv);
