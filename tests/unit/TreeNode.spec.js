import TreeComponent from "../../src/components/TreeComponent/TreeComponent";
import {
  mountWithProps,
  findAllElementsAndClickFirst,
  Selectors,
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

  it("when click root folder, should collapse subfolders", async () => {
    const wrapper = mountWithProps(TreeComponent, treeData);

    await findAllElementsAndClickFirst(
      wrapper,
      Selectors.FolderComponentFolder
    );
    const folders = wrapper.findAll(Selectors.FolderComponentFolder);

    expect(folders.length).toBe(1);
  });
});
