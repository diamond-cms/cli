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
    const generatedJs = path.join(pagesDir, 'generated.js');
    console.log('making dir', pagesDir, process.env.DIAM_KEY);
    mkdirp.sync(pagesDir);
    fs.writeFileSync(generatedJs, `
export default function Diamond() {
  return (
    <h1>We have generated this!</h1>
    <h2>Key: ${process.env.DIAM_KEY}</h2>
    <p>
      ${process.env.DIAM_KEY ? `We have a compiled system!` : 'Onboarding, please give us a key!'}
    </p>
  )
}
`);
    console.log('setup', rootDir);
  })

program.parse(process.argv);
