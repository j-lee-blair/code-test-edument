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

test("when input array has one item, should render folder with correct title", async () => {
  const wrapper = mount(App);
  const stringArray = `["dc"]`;
  const inputField = wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, stringArray);

  const treeFolder = wrapper.find(selectors.TreeComponentFolder);
  const treeFolderTitle = wrapper.find(selectors.TreeComponentFolderTitle);
  expect(treeFolder.exists()).toBeTruthy();
  expect(treeFolderTitle.html()).toContain("dc");
});

test("when input array has two items, render tree structure with one folder and one file", async () => {
  const wrapper = mount(App);
  const stringArray = `["dc/character_list.txt"]`;

  const inputField = wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, stringArray);

  const treeFolder = wrapper.find(selectors.TreeComponentFolder);
  const treeFolderTitle = wrapper.find(selectors.TreeComponentFolderTitle);
  const fileName = wrapper.find(selectors.TreeComponentFileName);

  expect(treeFolder.exists()).toBeTruthy();
  expect(treeFolderTitle.html()).toContain("dc");
  expect(fileName.html()).toContain("character_list.txt");
});
