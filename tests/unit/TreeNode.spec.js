import TreeComponent from "../../src/components/TreeComponent/TreeComponent";
import {
  mountWithProps,
  findElementAndClickWithIndex,
  Selectors,
  simulateClickConfirmNewFolderButtonWithValue,
  setAddFileInputAndClickOk,
} from "./helpers";

let treeData = {};

beforeEach(() => {
  treeData = {
    propsData: {
      folders: {
        dc: {
          folders: {},
          files: ["character_list.txt"],
        },
      },
      files: [],
    },
  };
});

describe("TreeComponent.vue", () => {
  const validInput = "NEW_INPUT";
  const DUPLICATE_FOLDER = "dc";
  const DUPLICATE_FILE = "character_list.txt";

  const EMITTED = {
    files: [],
    folders: {
      NEW_INPUT: { files: [], folders: {} },
      dc: { files: ["character_list.txt"], folders: {} },
    },
  };

  it("when click root folder, should collapse subfolders", async () => {
    const wrapper = mountWithProps(TreeComponent, treeData);

    await findElementAndClickWithIndex(wrapper, Selectors.FolderFolder, 0);
    const folders = wrapper.findAll(Selectors.FolderFolder);

    expect(folders.length).toBe(1);
  });

  it("when click add folder and enter valid folder name, should emit folder to be added", async () => {
    const wrapper = await mountWithProps(TreeComponent, treeData);

    await findElementAndClickWithIndex(wrapper, Selectors.FolderAdd, 0);
    await simulateClickConfirmNewFolderButtonWithValue(
      wrapper,
      validInput,
      Selectors.FolderNewFolderInput
    );

    expect(wrapper.emitted().childCallback[0][0]).toEqual(EMITTED);
  });

  it("when click add folder and enter invalid folder name, should not emit folder and show Error", async () => {
    const wrapper = await mountWithProps(TreeComponent, treeData);

    await findElementAndClickWithIndex(wrapper, Selectors.FolderAdd, 0);
    await simulateClickConfirmNewFolderButtonWithValue(
      wrapper,
      DUPLICATE_FOLDER,
      Selectors.FolderNewFolderInput
    );
    const errorMsgDuplicateFolder = wrapper.find(
      Selectors.ErrorMsgDuplicateFolder
    );

    expect(errorMsgDuplicateFolder.exists()).toBeTruthy();
    expect(wrapper.emitted().childCallback).toBeFalsy();
  });

  it("when click add file and enter invalid folder name, should not emit file show Error", async () => {
    const wrapper = await mountWithProps(TreeComponent, treeData);

    await findElementAndClickWithIndex(wrapper, Selectors.FolderFolder, 1);
    const newFileInput = await findElementAndClickWithIndex(
      wrapper,
      Selectors.FileNewFileInput,
      1
    );
    await setAddFileInputAndClickOk(wrapper, newFileInput, DUPLICATE_FILE);
    const errorMsgDuplicateFile = wrapper.find(Selectors.ErrorMsgDuplicateFile);

    expect(wrapper.emitted().childCallback).toBeFalsy();
    expect(errorMsgDuplicateFile.exists()).toBeTruthy();
  });
});
