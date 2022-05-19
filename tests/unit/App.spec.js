import App from "../../src/App";
import { mount } from "@vue/test-utils";
import { Selectors, simulateClickWithValue, UserInput } from "./helpers";

test("when input and click ok, should switch to tree view", async () => {
  const wrapper = mount(App);
  await simulateClickWithValue(wrapper, UserInput.OneFolderOneFile);

  const treeComp = wrapper.find(Selectors.TreeComponent);
  const inputForm = wrapper.find(Selectors.InputForm);
  expect(treeComp.exists()).toBeTruthy();
  expect(inputForm.exists()).toBeFalsy();
});

test("when input has one file only, render tree structure with one file no subfolders", async () => {
  const wrapper = mount(App);
  await simulateClickWithValue(wrapper, UserInput.OneFileOnly);

  const treeFolders = wrapper.findAll(Selectors.FolderComponentFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderComponentFolderTitle);
  const fileName = wrapper.find(Selectors.FileComponentFileName);

  expect(treeFolders.length).toBe(1);
  expect(treeFolderTitle.at(0).html()).toContain("Root");
  expect(fileName.html()).toContain("character_list.txt");
});

test("when input has one folder one file, render tree structure with one subfolder one file", async () => {
  const wrapper = mount(App);
  await simulateClickWithValue(wrapper, UserInput.OneFolderOneFile);

  const treeFolder = wrapper.find(Selectors.FolderComponentFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderComponentFolderTitle);
  const fileName = wrapper.find(Selectors.FileComponentFileName);

  expect(treeFolder.exists()).toBeTruthy();
  expect(treeFolderTitle.at(1).html()).toContain("dc");
  expect(fileName.html()).toContain("character_list.txt");
});

test("when input has one folder two files, render tree structure with one subfolder two files", async () => {
  const wrapper = mount(App);
  await simulateClickWithValue(wrapper, UserInput.OneFoldersTwoFiles);

  const fileItems = wrapper.findAll(Selectors.FileComponentFileName);
  const treeFolders = wrapper.findAll(Selectors.FolderComponentFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderComponentFolderTitle);

  expect(fileItems.length).toBe(2);
  expect(treeFolders.length).toBe(2);
  expect(fileItems.at(0).html()).toContain("character_list.txt");
  expect(treeFolderTitle.at(1).html()).toContain("dc");
});

test("when input has two folders one file each, render tree structure with two subfolders one file each", async () => {
  const wrapper = mount(App);
  await simulateClickWithValue(wrapper, UserInput.TwoFoldersOneFileEach);

  const fileItems = wrapper.findAll(Selectors.FileComponentFileName);
  const treeFolders = wrapper.findAll(Selectors.FolderComponentFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderComponentFolderTitle);

  expect(fileItems.length).toBe(2);
  expect(treeFolders.length).toBe(3);
  expect(fileItems.at(0).html()).toContain("character_list.txt");
  expect(fileItems.at(1).html()).toContain("the-doctor.png");
  expect(treeFolderTitle.at(1).html()).toContain("dc");
  expect(treeFolderTitle.at(2).html()).toContain("baz");
});
