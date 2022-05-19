import App from "../../src/App";
import { mount } from "@vue/test-utils";
import { setInputAndClickOk, selectors } from "./helpers";

test("when string array valid and click ok, should switch to tree view", async () => {
  const wrapper = mount(App);
  const stringArray = `["dc/character_list.txt"]`;
  const inputField = wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, stringArray);

  const treeComp = wrapper.find(selectors.TreeComponent);
  const inputForm = wrapper.find(selectors.InputForm);
  expect(treeComp.exists()).toBeTruthy();
  expect(inputForm.exists()).toBeFalsy();
});

test("when input array has one folder and one file, render tree structure with two folders and one file", async () => {
  const wrapper = mount(App);
  const stringArray = `["dc/character_list.txt"]`;
  const inputField = await wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, stringArray);

  const treeFolder = await wrapper.find(selectors.FolderComponentFolder);
  const treeFolderTitle = await wrapper.findAll(
    selectors.FolderComponentFolderTitle
  );
  const fileName = await wrapper.find(selectors.FileComponentFileName);

  expect(treeFolder.exists()).toBeTruthy();
  expect(treeFolderTitle.at(1).html()).toContain("dc");
  expect(fileName.html()).toContain("character_list.txt");
});

test("when input has duplicate folder and two files, render tree structure with one folder and two file", async () => {
  const wrapper = mount(App);
  const stringArray = `["dc/character_list.txt", "dc/the-doctor.png"]`;
  const inputField = await wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, stringArray);
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
