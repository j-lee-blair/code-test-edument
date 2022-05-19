import App from "../../src/App";
import { mount } from "@vue/test-utils";
import { selectors, simulateClickWithValue, UserInput } from "./helpers";

test("when string array valid and click ok, should switch to tree view", async () => {
  const wrapper = mount(App);
  await simulateClickWithValue(wrapper, UserInput.OneFolderOneFile);

  const treeComp = wrapper.find(selectors.TreeComponent);
  const inputForm = wrapper.find(selectors.InputForm);
  expect(treeComp.exists()).toBeTruthy();
  expect(inputForm.exists()).toBeFalsy();
});

test("when input array has one folder and one file, render tree structure with one subfolder and one file", async () => {
  const wrapper = mount(App);
  await simulateClickWithValue(wrapper, UserInput.OneFolderOneFile);

  const treeFolder = await wrapper.find(selectors.FolderComponentFolder);
  const treeFolderTitle = await wrapper.findAll(
    selectors.FolderComponentFolderTitle
  );
  const fileName = await wrapper.find(selectors.FileComponentFileName);

  expect(treeFolder.exists()).toBeTruthy();
  expect(treeFolderTitle.at(1).html()).toContain("dc");
  expect(fileName.html()).toContain("character_list.txt");
});

test("when input has duplicate folder and two files, render tree structure with one subfolder and two file", async () => {
  const wrapper = mount(App);
  await simulateClickWithValue(wrapper, UserInput.OneFoldersTwoFiles);

  const fileItems = await wrapper.findAll(selectors.FileComponentFileName);
  const treeFolders = await wrapper.findAll(selectors.FolderComponentFolder);
  const treeFolderTitle = await wrapper.findAll(
    selectors.FolderComponentFolderTitle
  );

  expect(fileItems.length).toBe(2);
  expect(treeFolders.length).toBe(2);
  expect(fileItems.at(0).html()).toContain("character_list.txt");
  expect(treeFolderTitle.at(1).html()).toContain("dc");
});

test("when input has two unique folders with one file each, render tree structure with two subfolders and each with one file", async () => {
  const wrapper = mount(App);
  await simulateClickWithValue(wrapper, UserInput.TwoFoldersOneFileEach);

  const fileItems = wrapper.findAll(selectors.FileComponentFileName);
  const treeFolders = wrapper.findAll(selectors.FolderComponentFolder);
  const treeFolderTitle = wrapper.findAll(selectors.FolderComponentFolderTitle);

  expect(fileItems.length).toBe(2);
  expect(treeFolders.length).toBe(3);
  expect(fileItems.at(0).html()).toContain("character_list.txt");
  expect(fileItems.at(1).html()).toContain("the-doctor.png");
  expect(treeFolderTitle.at(1).html()).toContain("dc");
  expect(treeFolderTitle.at(2).html()).toContain("baz");
});
