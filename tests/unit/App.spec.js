import App from "../../src/App";
import { mount } from "@vue/test-utils";
import {
  Selectors,
  simulateClickJsonInputOkWithValue,
  UserInput,
  simulateClickConfirmNewFolderButtonWithValue,
  findElementAndClickWithIndex,
  simulateClickConfirmNewFileButtonWithValue,
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

  const treeFolders = wrapper.findAll(Selectors.FolderFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderFolderTitle);
  const fileName = wrapper.find(Selectors.FileFileName);

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

  const treeFolder = await findElementAndClickWithIndex(
    wrapper,
    Selectors.FolderFolder,
    1
  );
  const treeFolderTitle = wrapper.findAll(Selectors.FolderFolderTitle);
  const fileName = wrapper.find(Selectors.FileFileName);

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

  await findElementAndClickWithIndex(wrapper, Selectors.FolderFolder, 1);
  const fileItems = wrapper.findAll(Selectors.FileFileName);
  const treeFolders = wrapper.findAll(Selectors.FolderFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderFolderTitle);

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

  await findElementAndClickWithIndex(wrapper, Selectors.FolderFolder, 1);
  await findElementAndClickWithIndex(wrapper, Selectors.FolderFolder, 2);
  const fileItems = wrapper.findAll(Selectors.FileFileName);
  const treeFolders = wrapper.findAll(Selectors.FolderFolder);
  const treeFolderTitle = wrapper.findAll(Selectors.FolderFolderTitle);

  expect(fileItems.length).toBe(2);
  expect(treeFolders.length).toBe(3);
  expect(fileItems.at(0).html()).toContain(FILE_C_LIST);
  expect(fileItems.at(1).html()).toContain("the-doctor.png");
  expect(treeFolderTitle.at(1).html()).toContain(FOLDER_DC);
  expect(treeFolderTitle.at(2).html()).toContain("baz");
});

test("when root has one folder click add folder enter value and confirm, should render subfolder with correct label", async () => {
  const wrapper = mount(App);

  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.OneFolderOneFile,
    Selectors.InputFormInputField
  );
  await findElementAndClickWithIndex(wrapper, Selectors.FolderAdd, 0);
  await simulateClickConfirmNewFolderButtonWithValue(
    wrapper,
    validInput,
    Selectors.FolderNewFolderInput
  );
  const folders = wrapper.findAll(Selectors.FolderFolder);

  expect(folders.length).toBe(3);
  expect(folders.at(2).html()).toContain(validInput);
});

test("when root has one folder click add to subfolder enter value and confirm, should render nested subfolder with correct label", async () => {
  const wrapper = mount(App);

  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.OneFolderOneFile,
    Selectors.InputFormInputField
  );
  await findElementAndClickWithIndex(wrapper, Selectors.FolderFolder, 1);
  await findElementAndClickWithIndex(wrapper, Selectors.FolderAdd, 1);
  await simulateClickConfirmNewFolderButtonWithValue(
    wrapper,
    validInput,
    Selectors.FolderNewFolderInput
  );
  await findElementAndClickWithIndex(wrapper, Selectors.FolderFolder, 1);
  const folders = wrapper.findAll(Selectors.FolderFolder);

  expect(folders.length).toBe(3);
  expect(folders.at(2).html()).toContain(validInput);
});

test("when root has one folder click add file to subfolder enter value and confirm, should render nested subfolder with new file", async () => {
  const wrapper = mount(App);

  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.OneFolderOneFile,
    Selectors.InputFormInputField
  );
  await findElementAndClickWithIndex(wrapper, Selectors.FolderFolder, 1);
  await simulateClickConfirmNewFileButtonWithValue(
    wrapper,
    validInput,
    Selectors.FileNewFileInput
  );
  await findElementAndClickWithIndex(wrapper, Selectors.FolderFolder, 1);
  const files = wrapper.findAll(Selectors.FileFileName);

  expect(files.length).toBe(2);
  expect(files.at(0).html()).toContain(validInput);
});

test("when root one file and click remove file, should render tree with no files", async () => {
  const wrapper = mount(App);

  await simulateClickJsonInputOkWithValue(
    wrapper,
    UserInput.OneFileOnly,
    Selectors.InputFormInputField
  );

  await findElementAndClickWithIndex(wrapper, Selectors.FileFileName, 0);

  await findElementAndClickWithIndex(wrapper, Selectors.FileRemoveFile, 0);

  const files = wrapper.findAll(Selectors.FileFileName);

  expect(files.length).toBe(0);
});
