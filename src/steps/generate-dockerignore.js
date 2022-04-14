const fs = require('fs')
const path = require('path')
const Template = require("../template");

const stub = `
# This file was autogenerated at {{generatedAt}}.
{{assetsToIgnore}}
`;

module.exports = (params, writeFile = true) => {
  const {
    generatedAt = new Date().toISOString(),
    assetsToIgnore = [],
  } = params;

  const template = new Template({ stub });

  const content = template.render({
    generatedAt,
    assetsToIgnore: [
      '.github',
      '.vscode',
    ].concat(assetsToIgnore).join('\n'),
  })

  if (writeFile) {
    fs.writeFileSync(path.join(process.cwd(), 'dockerfile'), content)
  }
  
  return content
}
