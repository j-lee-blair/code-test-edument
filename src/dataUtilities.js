class Folder {
  constructor() {
    this.folders = {};
    this.files = [];
  }
}

export function CreateFolder(currentFolder, newNodeLabel) {
  let updatedNode = { ...currentFolder };
  const newFolder = new Folder();
  updatedNode.folders[newNodeLabel] = newFolder;
  return updatedNode;
}

export function PushFile(currentFolder, newFile) {
  let updatedNode = { ...currentFolder };
  updatedNode.files.push(newFile);
  updatedNode.files.sort();
  return updatedNode;
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
