import { mount } from "@vue/test-utils";

export async function simulateClickJsonInputOkWithValue(
  wrapper,
  inputString,
  selector
) {
  const element = await wrapper.find(selector);
  await setInputAndClickOk(wrapper, element, inputString);
}

export async function setInputAndClickOk(wrapper, element, value) {
  element.setValue(value);
  const button = await wrapper.find(Selectors.InputFormbutton);
  button.trigger("click");
}

export async function simulateClickConfirmNewFolderButtonWithValue(
  wrapper,
  inputString,
  selector
) {
  const element = await wrapper.find(selector);
  await setAddFolderInputAndClickOk(wrapper, element, inputString);
}

export async function setAddFolderInputAndClickOk(wrapper, element, value) {
  element.setValue(value);
  const button = await wrapper.find(Selectors.FolderComponentAddConfirm);
  button.trigger("click");
}

export async function simulateClickConfirmNewFileButtonWithValue(
  wrapper,
  inputString,
  selector
) {
  const element = await wrapper.findAll(selector).at(0);
  await setAddFileInputAndClickOk(wrapper, element, inputString);
}

export async function setAddFileInputAndClickOk(wrapper, element, value) {
  element.setValue(value);
  const button = await wrapper.find(Selectors.FileComponentAddConfirm);
  button.trigger("click");
}

export async function findAllElementsAndClickFirst(wrapper, selector) {
  const element = await wrapper.findAll(selector);
  element.trigger("click");
  return element;
}

export async function findAllElementsAndClickSecond(wrapper, selector) {
  const element = await wrapper.findAll(selector).at(1);
  element.trigger("click");
  return element;
}

export function mountWithProps(Component, options = {}) {
  return mount(Component, {
    propsData: options,
  });
}

export const Selectors = {
  InputForm: '[t-id="InputForm"]',
  InputFormInputField: '[t-id="InputForm-input-field"]',
  InputFormbutton: '[t-id="InputForm-button"]',
  InputFormError: '[t-id="InputForm-json-error"]',

  TreeComponent: '[t-id="TreeComponent"]',

  FolderComponentFolder: '[t-id="Folder-folder"]',
  FolderComponentFolderTitle: '[t-id="Folder-folder-title"]',
  FolderComponentAdd: '[t-id="Folder-folder-add"]',
  FolderComponentAddConfirm: '[t-id="InputField-inner-button-confirm-folder"]',
  FolderComponentNewFolderInput: '[t-id="InputField-inner-button-folder"]',

  FileComponentFileName: '[t-id="File-file-name"]',
  FileComponentNewFileInput: '[t-id="InputField-inner-button-file"]',
  FileComponentAddConfirm: '[t-id="InputField-inner-button-confirm-file"]',

  ErrorMsgDuplicateFolder: '[t-id="TreeNode-error-duplicate-folder"]',
  ErrorMsgDuplicateFile: '[t-id="TreeNode-error-duplicate-file"]',
};

export const UserInput = {
  TwoFoldersOneFileEach: `["dc/character_list.txt", "baz/the-doctor.png"]`,
  OneFileOnly: `["character_list.txt"]`,
  OneFoldersTwoFiles: `["dc/character_list.txt", "dc/the-doctor.png"]`,
  OneFolderOneFile: `["dc/character_list.txt"]`,
};
