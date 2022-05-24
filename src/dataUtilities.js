class Folder {
  constructor() {
    this.folders = {};
    this.files = [];
  }
}

export function CreateFolder(currentFolder, newNodeLabel) {
  let existingFolders = { ...currentFolder };
  const newFolder = new Folder();
  existingFolders.folders[newNodeLabel] = newFolder;
  return existingFolders;
}

export async function toTreeStructure(data) {
  let paths = data.map((x) => x.split("/"));

  let tree = {};
  tree["root"] = new Folder();

  paths.forEach((filePath) => {
    let currentFolder = tree.root;

    for (let i = 0; i < filePath.length - 1; i++) {
      var name = filePath[i];
      if (!currentFolder.folders[name]) {
        currentFolder.folders[name] = new Folder();
      }
      currentFolder = currentFolder.folders[name];
    }
    currentFolder.files.push(filePath[filePath.length - 1]);
    return currentFolder;
  });

  return tree.root;
}
