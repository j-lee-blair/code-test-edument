class Folder {
  constructor() {
    this.folders = {};
    this.files = [];
  }
}

class Props {
  constructor(node, parent) {
    this.node = node;
    this.parent = parent;
  }
}

export function CreateFolder(currentFolder, newNodeLabel, parent = "Root") {
  let existingFolders = { ...currentFolder }; //"dc's" folders object

  const newFolder = new Folder();
  console.log("newNodeLabel");
  existingFolders.folders[newNodeLabel] = newFolder;
  console.log(
    "CreateFolder::currentFolder:: aft ",
    JSON.stringify(existingFolders),
    parent
  ); //100% correct here
  return new Props(existingFolders, parent);
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
