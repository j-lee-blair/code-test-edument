//At first I had Vue components for Folders and Files etc but decided to abstract the strucutre away from the view and into the Model layer
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

//This method made me a bit uneasy as I mutate the node object directly without first creating a clone (doing this failed to trigger a view refresh for some reason!)
//But after reading the documentation on "Replacing an Array", it appears that this is how to do it when using Array.filter as this returns a new array reference.
//Quote: "Vue implements some smart heuristics to maximize DOM element reuse, so replacing an array with another array containing overlapping objects is a very efficient operation."
//https://vuejs.org/guide/essentials/list.html#array-change-detection
export function DeleteFile(currentFolder, toBeDeleted) {
  const newFileList = currentFolder.files
    .filter((file) => file !== toBeDeleted)
    .sort();
  currentFolder.files = newFileList;
  return currentFolder;
}

//Generates Tree Data Structure from file paths
//I have not worked with tree structures like this since finishing uni so this was a great refresher exercise on data mangling and recursion (see the TreeNode Component)
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
