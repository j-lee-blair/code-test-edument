export function generateTree(rawData) {
  let filePathWithFile = rawData.flatMap((string) => string.split("/"));
  return filePathWithFile.reduce(toFolderStructure, {});
}

function toFolderStructure(acc, val) {
  if (isFolder(val)) {
    //is folder
    if (!acc.folders) {
      acc.folders = [{ name: val }];
    } else {
      acc.folders.push(val);
    }
  } else {
    // is file
    if (!acc.folders[0].files) {
      acc.folders[0].files = [val];
    } else {
      acc.folders[0].files.push(val);
    }
  }
  return acc;
}

function isFolder(value) {
  return value.indexOf(".") === -1;
}
