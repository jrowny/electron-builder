"use strict"

const Linter = require("tslint").Linter
const path = require("path")

const configuration = {
  "extends": "tslint:latest",
  "rules": {
    "no-invalid-this": [true],
    "member-ordering": [
      "static-before-instance",
      "variables-before-functions"
    ],
    "one-line": [
      true,
      "check-open-brace",
      "check-whitespace"
    ],
    "quotemark": [
      true,
      "double",
      "avoid-escape"
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "variable-name": [
      true,
      "ban-keywords"
    ],
    "ordered-imports": false,
    "semicolon": [true, "never"],
    "trailing-comma": false,
    "object-literal-sort-keys": false,
    "no-var-requires": false,
    "no-console": false,
    "max-line-length": false,
    "eofline": false,
    "comment-format": false,
    "no-conditional-assignment": false,
    "interface-name": false,
    "member-access": false,
    "no-shadowed-variable": false,
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ],
    "no-bitwise": false,
    "jsdoc-format": false,
    "no-for-in-array": true,
  }
}
const options = {
  formatter: "stylish",
}

let hasErrors = false
for (const projectDir of require("./process").getPackages()) {
  if (projectDir.includes("electron-forge-maker-")) {
    continue
  }
  
  console.log(`Linting ${path.basename(projectDir)}`)
  const program = Linter.createProgram("tsconfig.json", projectDir)
  for (const file of Linter.getFileNames(program)) {
    const fileContents = program.getSourceFile(file).getFullText()
    const linter = new Linter(options, program)
    linter.lint(file, fileContents, configuration)
    const result = linter.getResult()
    if (result.failures.length > 0) {
      hasErrors = true
      process.stdout.write(result.output)
    }
  }
}

if (hasErrors) {
  process.exit(1)
}