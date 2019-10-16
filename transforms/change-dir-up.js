const transformer = (file, api) => {
  const j = api.jscodeshift;
  const goUpDir = (path, moduleType) => {
    let x;
    switch (moduleType) {
      case "require":
        x = path.node.arguments[0].value.replace(/["]+/g, "").split("/");
        x = changeDir(x);
        return (path.node.arguments[0].value = x.join("/"));
      case "import":
        x = path.node.source.value.replace(/["]+/g, "").split("/");
        x = changeDir(x);
        return (path.node.source.value = x.join("/"));
      default:
        return path;
    }
  };

  const changeDir = dirArray => {
    if (dirArray[0] === ".") {
      dirArray[0] = "..";
    } else {
      if (dirArray[0] === "..") {
        dirArray.unshift("..");
      }
    }
    return dirArray;
  };
  let root = j(file.source);
  root
    .find(j.CallExpression, {
      callee: {
        type: "Identifier",
        name: "require"
      },
      arguments: [
        {
          type: "Literal"
        }
      ]
    })
    .forEach(p => goUpDir(p, "require"));
  root.find(j.ImportDeclaration).forEach(p => goUpDir(p, "import"));

  return root.toSource();
};

module.exports = transformer;
