export async function setInputAndClickOk(wrapper, element, value) {
  element.setValue(value);
  const button = await wrapper.find(selectors.InputFormbutton);
  button.trigger("click");
}

export async function simulateClickWithValue(wrapper, inputString) {
  const inputField = await wrapper.find(selectors.InputFormInputField);

  await setInputAndClickOk(wrapper, inputField, inputString);
}

export const selectors = {
  InputForm: '[t-id="InputForm"]',
  InputFormInputField: '[t-id="InputForm-input-field"]',
  InputFormbutton: '[t-id="InputForm-button"]',
  InputFormError: '[t-id="InputForm-json-error"]',
  TreeComponent: '[t-id="TreeComponent"]',
  FolderComponentFolder: '[t-id="Folder-folder"]',
  FolderComponentFolderTitle: '[t-id="Folder-folder-title"]',
  FileComponentFileName: '[t-id="File-file-name"]',
};

export const UserInput = {
  TwoFoldersOneFileEach: `["dc/character_list.txt", "baz/the-doctor.png"]`,
  OneFoldersTwoFiles: `["dc/character_list.txt", "dc/the-doctor.png"]`,
  OneFolderOneFile: `["dc/character_list.txt"]`,
};
