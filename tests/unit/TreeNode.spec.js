import TreeComponent from "../../src/components/TreeComponent/TreeComponent";
import {
  mountWithProps,
  findAllElementsAndClickFirst,
  Selectors,
  simulateClickConfirmNewFolderButtonWithValue,
} from "./helpers";

describe("TreeComponent.vue", () => {
  const treeData = {
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

  const validInput = "NEW_INPUT";
  const EMITTED = {
    files: [],
    folders: {
      NEW_INPUT: { files: [], folders: {} },
      dc: { files: ["character_list.txt"], folders: {} },
    },
  };

  it("when click root folder, should collapse subfolders", async () => {
    const wrapper = mountWithProps(TreeComponent, treeData);

    await findAllElementsAndClickFirst(
      wrapper,
      Selectors.FolderComponentFolder
    );
    const folders = wrapper.findAll(Selectors.FolderComponentFolder);

    expect(folders.length).toBe(1);
  });

  it("when click add folder and enter valid folder name, should emit folder to be added", async () => {
    const wrapper = mountWithProps(TreeComponent, treeData);

    await findAllElementsAndClickFirst(wrapper, Selectors.FolderComponentAdd);
    await simulateClickConfirmNewFolderButtonWithValue(
      wrapper,
      validInput,
      Selectors.FolderComponentNewFolderInput
    );

    expect(wrapper.emitted().childCallback[0][0]).toEqual(EMITTED);
  });
});
