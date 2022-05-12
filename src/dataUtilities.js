export function generateTree(rawData) {
  let filePathWithFile = rawData.flatMap((string) => string.split("/"));
  return filePathWithFile.reduce(toFolderStructure, { root: {} });
}

function toFolderStructure(acc, val) {
  if (isFolder(val)) {
    //is folder
    if (!acc.root.folders) {
      acc.root.folders = [{ name: val }];
    } else {
      acc.root.folders.push(val);
    }
  } else {
    // is file
    if (!acc.root.folders[0].files) {
      acc.root.folders[0].files = [val];
    } else {
      acc.root.folders[0].files.push(val);
    }
  }
  return acc;
}

function isFolder(value) {
  return value.indexOf(".") === -1;
}
