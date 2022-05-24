import App from "../../src/App";
import { mount } from "@vue/test-utils";
import {
  Selectors,
  simulateClickJsonInputOkWithValue,
  UserInput,
  simulateClickConfirmNewFolderButtonWithValue,
  findAllElementsAndClickFirst,
} from "./helpers";

const FILE_C_LIST = "character_list.txt";
const FOLDER_DC = "dc";
const validInput = "NEW_INPUT";

test("when input valid and click ok, should switch to tree view", async () => {
  const wrapper = mount(App);
  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.OneFolderOneFile,
    Selectors.InputFormInputField
  );

  const treeComp = wrapper.find(Selectors.TreeComponent);
  const inputForm = wrapper.find(Selectors.InputForm);
  expect(treeComp.exists()).toBeTruthy();
  expect(inputForm.exists()).toBeFalsy();
});

test("when input has one file only, render tree structure with one file no subfolders", async () => {
  const wrapper = mount(App);
  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.OneFileOnly,
    Selectors.InputFormInputField
  );

  const treeFolders = wrapper.findAll(Selectors.FolderComponentFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderComponentFolderTitle);
  const fileName = wrapper.find(Selectors.FileComponentFileName);

  expect(treeFolders.length).toBe(1);
  expect(treeFolderTitle.at(0).html()).toContain("Root");
  expect(fileName.html()).toContain(FILE_C_LIST);
});

test("when input has one folder one file, render tree structure with one subfolder one file", async () => {
  const wrapper = mount(App);
  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.OneFolderOneFile,
    Selectors.InputFormInputField
  );

  const treeFolder = wrapper.find(Selectors.FolderComponentFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderComponentFolderTitle);
  const fileName = wrapper.find(Selectors.FileComponentFileName);

  expect(treeFolder.exists()).toBeTruthy();
  expect(treeFolderTitle.at(1).html()).toContain(FOLDER_DC);
  expect(fileName.html()).toContain(FILE_C_LIST);
});

test("when input has one folder two files, render tree structure with one subfolder two files", async () => {
  const wrapper = mount(App);
  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.OneFoldersTwoFiles,
    Selectors.InputFormInputField
  );

  const fileItems = wrapper.findAll(Selectors.FileComponentFileName);
  const treeFolders = wrapper.findAll(Selectors.FolderComponentFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderComponentFolderTitle);

  expect(fileItems.length).toBe(2);
  expect(treeFolders.length).toBe(2);
  expect(fileItems.at(0).html()).toContain(FILE_C_LIST);
  expect(treeFolderTitle.at(1).html()).toContain(FOLDER_DC);
});

test("when input has two folders one file each, render tree structure with two subfolders one file each", async () => {
  const wrapper = mount(App);
  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.TwoFoldersOneFileEach,
    Selectors.InputFormInputField
  );

  const fileItems = wrapper.findAll(Selectors.FileComponentFileName);
  const treeFolders = wrapper.findAll(Selectors.FolderComponentFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderComponentFolderTitle);

  expect(fileItems.length).toBe(2);
  expect(treeFolders.length).toBe(3);
  expect(fileItems.at(0).html()).toContain(FILE_C_LIST);
  expect(fileItems.at(1).html()).toContain("the-doctor.png");
  expect(treeFolderTitle.at(1).html()).toContain(FOLDER_DC);
  expect(treeFolderTitle.at(2).html()).toContain("baz");
});

it("when input has one folder click add folder and confirm, should add subfolder", async () => {
  const wrapper = mount(App);

  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.OneFolderOneFile,
    Selectors.InputFormInputField
  );
  await findAllElementsAndClickFirst(wrapper, Selectors.FolderComponentAdd);
  await simulateClickConfirmNewFolderButtonWithValue(
    wrapper,
    validInput,
    Selectors.FolderComponentNewFolderInput
  );
  const folders = wrapper.findAll(Selectors.FolderComponentFolder);

  expect(folders.length).toBe(3);
  expect(folders.at(2).html()).toContain(validInput);
});
