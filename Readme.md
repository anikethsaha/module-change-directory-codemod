# module-change-directory-codemod :rocket:
CodeMod to change the directory of your module import or require statement

## What is does ?
**Currently**
it is having only one codemod available which will change your path or directory of your `require` or `import from ` statement to one directory **up**


## Usage
1. ` $ npm install -g jscodeshift `
2. ` $ npm install module-dir-change-codemod `
3. ` $ jscodeshift -t node_modules/module-dir-change-codemod/transforms/[transforms].js [files] `


## transforms
Currently only one transform is available

- ### change-dir-up
